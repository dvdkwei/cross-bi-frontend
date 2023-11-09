import { Card, Title, DonutChart, Subtitle, Text } from "@tremor/react"
import { BarDiagrammNativeData, DonutDiagrammProps } from "../types/DiagrammTypes";
import { useDiagrammData } from "../hooks/useDiagrammData";
import { useNavigate } from "react-router-dom";
import { DiagrammTypes } from "../enums";
import { useEffect, useState } from "react";
import { XAxisFilter } from "./XAxisFilter";
import styles from '../styles/components/Diagramm.module.css';
import { useToastContext } from "../hooks/useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";

export const DonutDiagramm = ({
  viewId,
  currency
}: DonutDiagrammProps) => {
  const navigate = useNavigate();
  const { isLoading, data, title, index, slicedColors, xAxisTitle, yAxisTitle } = useDiagrammData(viewId);
  const [filteredData, setFilteredData] = useState<BarDiagrammNativeData[]>([]);
  const [filterValues, setFilterValues] = useState<string[]>([]);
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
    navigate(`/edit/${DiagrammTypes.DONUT}/${viewId}`);
  }

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
      { isLoading && <Text className="!text-[14px]">Loading Data ...</Text> }
      {
        !isLoading && data.length === 0 &&
        <Subtitle>No Data</Subtitle>
      }
      {
        !isLoading && data.length > 0 &&
        <>
          <Title className="mb-2" onClick={onClickTitle}>
            {title}
          </Title>
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