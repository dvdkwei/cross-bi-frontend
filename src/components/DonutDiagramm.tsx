import { Card, Title, DonutChart, Subtitle } from "@tremor/react"
import { BarDiagrammNativeData, DonutDiagrammProps } from "../types/DiagrammTypes";
import { useDiagrammData } from "../hooks/useDiagrammData";
import { useNavigate } from "react-router-dom";
import { DiagrammTypes } from "../enums";
import { useEffect, useState } from "react";
import { MultiSelectFilter } from "./XAxisFilter";

export const DonutDiagramm = ({
  viewId,
  currency
}: DonutDiagrammProps) => {
  const navigate = useNavigate();
  const { isLoading, data, title, index, slicedColors, xAxisTitle, yAxisTitle } = useDiagrammData(viewId);
  const [filteredData, setFilteredData] = useState<BarDiagrammNativeData[]>([]);
  const [filterValues, setFilterValues] = useState<string[]>([]);

  const valueFormatter = (number: number) => {
    if (!currency) {
      return number.toLocaleString();
    }
    return number.toLocaleString('de-DE', {
      style: 'currency',
      currency: currency
    });
  }

  useEffect(() => {
    if (data && data.length) {
      setFilteredData(data);
    }
  }, [data, xAxisTitle]);

  useEffect(() => {
    if (!filterValues.length) {
      setFilteredData(data);
      return;
    }
    setFilteredData(data.filter(dt => {
      return filterValues.includes(dt[xAxisTitle].toString());
    }));
  }, [data, filterValues, xAxisTitle]);

  return (
    <Card
      id="line-diagramm"
      className="w-[100%] flex flex-col gap-10"
      decoration="top"
      decorationColor="blue"
    >
      <Title onClick={() => navigate(`/edit/${DiagrammTypes.DONUT}/${viewId}`)}>
        {title}
      </Title>
      {
        !isLoading && data.length === 0 &&
        <Subtitle>No Data</Subtitle>
      }
      {
        !isLoading && data.length > 0 &&
        <>
          <MultiSelectFilter
            dataToFilter={data}
            value={filterValues}
            onValueChange={setFilterValues}
            valueKey={xAxisTitle}
          />
          <DonutChart
            className="w-full !h-[600px] [&>div>div>svg>text]:!text-4xl mt-4 mb-4"
            data={filteredData}
            index={index}
            category={yAxisTitle}
            colors={slicedColors}
            valueFormatter={valueFormatter}
            variant="donut"
          />
        </>
      }
    </Card>
  )
}