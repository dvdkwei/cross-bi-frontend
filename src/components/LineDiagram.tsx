import { Card, LineChart, MultiSelect, MultiSelectItem, Subtitle, Title } from "@tremor/react"
import { useDiagramData } from "../hooks/useDiagramData";
import { DiagramNativeData, LineDiagramProps } from "../types/DiagramTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiagramTypes } from "../enums";
import styles from '../styles/components/Diagram.module.css';
import { useToastContext } from "../hooks/useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";
import { BigDiagramLoader } from "./BigDiagramLoader";

export const LineDiagram = ({
  subtitle,
  viewId
}: LineDiagramProps) => {
  const navigate = useNavigate();
  const { isLoading, data, title, index, categories, slicedColors } = useDiagramData(viewId);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<DiagramNativeData[]>([]);
  const { addToast } = useToastContext() as ToastProviderValue;

  const onClickTitle = () => {
    if (!navigator.onLine) {
      addToast({
        message: `It seems that you are offline. Try again later.`,
        style: 'toast-error',
        timeout: 4000,
      })
      return;
    }
    navigate(`/edit/${DiagramTypes.BIGNUMBER}/${viewId}`);
  }

  useEffect(() => {
    if (!isLoading && data) {
      const yAxisLabels = [
        ...document.querySelectorAll("#line-diagramm .yAxis.text-tremor-label tspan")
      ];
      yAxisLabels.forEach(label => label.setAttribute('x', '60'));
      setFilteredData(data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (categories) {
      setFilteredCategories(categories);
    }
  }, [categories]);

  if (isLoading) return <BigDiagramLoader />;

  return (
    <Card
      id="line-diagramm"
      className={`${styles.lineContainer} border-gray-100 border`}
    >
      {title &&
        <Title className="mb-2" onClick={onClickTitle}>
          {title}
        </Title>
      }
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {filteredCategories &&
        <div className='flex flex-col w-full'>
          <MultiSelect
            value={filteredCategories}
            onValueChange={(val) => setFilteredCategories(val)}
            className={styles.multiSelect}
          >
            {
              categories.map((element, index) => {
                return (
                  <MultiSelectItem key={'ms-' + index} value={element}>
                    {element}
                  </MultiSelectItem>
                )
              })
            }
          </MultiSelect>
        </div >
      }
      {data.length <= 0 && <Subtitle>No Data</Subtitle>}
      {data &&
        <LineChart
          data={filteredData}
          index={index}
          categories={filteredCategories ?? categories}
          colors={slicedColors}
          showAnimation={true}
          className={styles.line}
        />
      }
    </Card>
  )
}