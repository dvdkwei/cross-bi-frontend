import { Card, LineChart, Subtitle, Title } from "@tremor/react"
import { useDiagrammData } from "../hooks/useDiagrammData";
import { LineDiagrammProps } from "../types/DiagrammTypes";
import { useEffect } from "react";

export const LineDiagramm = ({
  subtitle,
  viewId
}: LineDiagrammProps) => {
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
  }, [isLoading, data]);

  return (
    <Card
      id="line-diagramm"
      className="w-[100%] flex flex-col gap-10"
      decoration="top"
      decorationColor="blue"
    >
      <Title>{title}</Title>
      {
        subtitle &&
        <Subtitle>{subtitle}</Subtitle>
      }
      {
        !isLoading && data &&
        <LineChart
          className="!h-[600px]"
          data={data}
          index={index}
          categories={categories}
          colors={slicedColors}
          showAnimation={true}
        />
      }
    </Card>
  )
}