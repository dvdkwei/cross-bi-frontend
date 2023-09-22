import { Card, LineChart, MultiSelect, MultiSelectItem, Subtitle, Title } from "@tremor/react"
import { useDiagrammData } from "../hooks/useDiagrammData";
import { DiagrammNativeData, LineDiagrammProps } from "../types/DiagrammTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiagrammTypes } from "../enums";
import styles from '../styles/components/Diagramm.module.css';

export const LineDiagramm = ({
  subtitle,
  viewId
}: LineDiagrammProps) => {
  const navigate = useNavigate();
  const { isLoading, data, title, index, categories, slicedColors } = useDiagrammData(viewId);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<DiagrammNativeData[]>([]);

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
    if(categories){
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
      <Title onClick={() => navigate(`/edit/${DiagrammTypes.LINE}/${viewId}`)}>
        {title}
      </Title>
      {
        subtitle &&
        <Subtitle>{subtitle}</Subtitle>
      }
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