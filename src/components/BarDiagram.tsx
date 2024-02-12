import { BarChart, Card, Subtitle, Text, Title } from "@tremor/react"
import { BarDiagramProps } from "../types/DiagramTypes"
import { useEffect } from "react";
import { useDiagramData } from "../hooks/useDiagramData";
import { useNavigate } from "react-router-dom";
import { DiagramTypes } from "../enums";
import styles from '../styles/components/Diagram.module.css';
import { useToastContext } from "../hooks/useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";
import { BigDiagramLoader } from "./BigDiagramLoader";

export const BarDiagram = ({
  subtitle,
  viewId
}: BarDiagramProps) => {
  const navigate = useNavigate();
  const { isLoading, data, title, index, categories, slicedColors } = useDiagramData(viewId);
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
    navigate(`/edit/${DiagramTypes.BAR}/${viewId}`);
  }

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

  if (isLoading) return <BigDiagramLoader />

  return (
    <Card
      id="bar-diagramm"
      className={`${styles.barContainer} border-gray-100 border`}
    >
      { !data || (data.length <= 0) && <Text className="!text-[14px]">No Data</Text> }
      {
        data.length > 0 &&
        <>
          <Title 
            className="mb-2 text-[12px]"
            onClick={onClickTitle}
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