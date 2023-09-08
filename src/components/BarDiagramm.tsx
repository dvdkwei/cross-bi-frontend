import { BarChart, Card, Subtitle, Title } from "@tremor/react"
import { BarDiagrammProps } from "../types/DiagrammTypes"
import { useEffect } from "react";
import { useDiagrammData } from "../hooks/useDiagrammData";

export const BarDiagramm = ({
  subtitle,
  viewId
}: BarDiagrammProps) => {
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
      className="w-[100%] flex flex-col gap-10"
      decoration="top"
      decorationColor="blue"
    >
      {
        !isLoading && data.length &&
        <>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          <BarChart
            className="!h-[600px]"
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