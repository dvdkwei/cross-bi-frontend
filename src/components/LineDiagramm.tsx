import { Card, LineChart, MultiSelect, MultiSelectItem, Subtitle, Title, Text } from "@tremor/react"
import { useDiagrammData } from "../hooks/useDiagrammData";
import { DiagrammNativeData, LineDiagrammProps } from "../types/DiagrammTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiagrammTypes } from "../enums";
import styles from '../styles/components/Diagramm.module.css';
import { useToastContext } from "../hooks/useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";

export const LineDiagramm = ({
  subtitle,
  viewId
}: LineDiagrammProps) => {
  const navigate = useNavigate();
  const { isLoading, data, title, index, categories, slicedColors } = useDiagrammData(viewId);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<DiagrammNativeData[]>([]);
  const { addToast } = useToastContext() as ToastProviderValue;

  const onClickTitle = () => {
    if(!navigator.onLine){
      addToast({
        message: `It seems that you are offline. Try again later.`, 
        style: 'toast-error',
        timeout: 4000,
      })
      return;
    }
    navigate(`/edit/${DiagrammTypes.BIGNUMBER}/${viewId}`);
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

  return (
    <Card
      id="line-diagramm"
      className={styles.lineContainer}
      decoration="top"
      decorationColor="blue"
    >
      { isLoading && <Text className="!text-[14px]">Loading Data ...</Text> }
      {
        !isLoading && title &&
        <Title className="mb-2" onClick={onClickTitle}>
          {title}
        </Title>
      }
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {
        !isLoading && filteredCategories &&
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
      {
        !isLoading && data &&
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