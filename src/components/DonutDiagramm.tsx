import { Card, Title, DonutChart, Subtitle } from "@tremor/react"
import { DonutDiagrammProps } from "../types/DiagrammTypes";
import { useDiagrammData } from "../hooks/useDiagrammData";

export const DonutDiagramm = ({
  viewId,
  currency
}: DonutDiagrammProps) => {
  const { isLoading, data, title, index, slicedColors, yAxisTitle } = useDiagrammData(viewId);

  const valueFormatter = (number: number) => {
    if (!currency) {
      return number.toLocaleString();
    }
    return number.toLocaleString('de-DE', {
      style: 'currency',
      currency: currency
    });
  }

  return (
    <Card
      id="line-diagramm"
      className="w-[100%] flex flex-col gap-10"
      decoration="top"
      decorationColor="blue"
    >
      <Title>{title}</Title>
      {!isLoading && data.length === 0 && <Subtitle>No Data</Subtitle>}
      {!isLoading && data.length > 0 && 
        <DonutChart
          className="w-full !h-[600px] [&>div>div>svg>text]:!text-4xl mt-4 mb-4"
          data={data}
          index={index}
          category={yAxisTitle}
          colors={slicedColors}
          valueFormatter={valueFormatter}
          variant="donut"
        />
      }
    </Card>
  )
}