import { BarChart, Card, Subtitle, Title } from "@tremor/react"
import { BarDiagrammProps } from "../types/DiagrammTypes"
import { useEffect } from "react";
import { useDiagrammData } from "../hooks/useDiagrammData";
import { useNavigate } from "react-router-dom";
import { DiagrammTypes } from "../enums";
import styles from '../styles/components/Diagramm.module.css';

export const BarDiagramm = ({
  subtitle,
  viewId
}: BarDiagrammProps) => {
  const navigate = useNavigate();
  const { isLoading, data, title, index, categories, slicedColors } = useDiagrammData(viewId);

  useEffect(() => {
    if(!isLoading && data){
      const yAxisLabels = [
        ...document.querySelectorAll(
          "#bar-diagramm .yAxis.text-tremor-label tspan"
        )
      ];
      yAxisLabels.forEach(label => label.setAttribute('x', '60'));
    }
  }, [isLoading, data])

  return (
    <Card
      id="bar-diagramm"
      className={styles.barContainer}
      decoration="top"
      decorationColor="blue"
    >
      {
        !isLoading && data.length &&
        <>
          <Title 
            className="mb-2 text-[12px]"
            onClick={() => navigate(`/edit/${DiagrammTypes.BAR}/${viewId}`)}
          >
            {title}
          </Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          <BarChart
            className={styles.bar}
            data={data}
            index={index}
            categories={categories}
            colors={slicedColors}
            showAnimation={false}
          />
        </>
      }
    </Card>
  )
}