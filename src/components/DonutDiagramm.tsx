import { Card, Title, DonutChart, Subtitle } from "@tremor/react"
import { BarDiagrammNativeData, DonutDiagrammProps } from "../types/DiagrammTypes";
import { useDiagrammData } from "../hooks/useDiagrammData";
import { useNavigate } from "react-router-dom";
import { DiagrammTypes } from "../enums";
import { useEffect, useState } from "react";
import { XAxisFilter } from "./XAxisFilter";
import styles from '../styles/components/Diagramm.module.css';

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
      id="donut-diagramm"
      className={`flex flex-col gap-2 ${styles.donutContainer}`}
      decoration="top"
      decorationColor="blue"
    >
      <Title className="mb-2" onClick={() => navigate(`/edit/${DiagrammTypes.DONUT}/${viewId}`)}>
        {title}
      </Title>
      {
        !isLoading && data.length === 0 &&
        <Subtitle>No Data</Subtitle>
      }
      {
        !isLoading && data.length > 0 &&
        <>
          <XAxisFilter
            dataToFilter={data}
            value={filterValues}
            onValueChange={setFilterValues}
            valueKey={xAxisTitle}
          />
          <DonutChart
            className={styles.donut}
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