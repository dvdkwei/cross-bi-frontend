import { BarChart, Card, Color, Subtitle, Title } from "@tremor/react"
import { BarDiagrammData, BarDiagrammNativeData, BarDiagrammProps } from "../types/DiagrammTypes"
import { ToastProviderValue } from "../types/ToastTypes";
import { useToastContext } from "../hooks/useToastContext";
import { useColors } from "../hooks/useColors";
import { useEffect, useState } from "react";

export const BarDiagramm = ({
  subtitle,
  viewId
}: BarDiagrammProps) => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { addToast } = useToastContext() as ToastProviderValue;
  const colors: Color[] = useColors();
  const [data, setData] = useState<BarDiagrammNativeData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [index, setIndex] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [slicedColors, setSlicedColors] = useState<Color[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const translateTitle = (title: string) => {
    return title.split('_')
      .map(word => {
        if (['of', 'and', 'for'].includes(word.toLocaleLowerCase())) {
          return word
        }
        return word.charAt(0).toUpperCase() + word.substring(1, word.length)
      })
      .join(' ');
  }

  useEffect(() => {
    const fetchLineData = async () => {
      const headers = new Headers();
      headers.append('x-api-key', API_KEY);
      headers.append('Content-Type', 'appplication/json');

      await fetch(`${BASE_API_URL}/view/inspect/${viewId}?categorize=true`, {
        headers,
        method: 'GET'
      })
        .then(res => res.json())
        .then(parsed => {
          if (parsed.data) {
            const data: BarDiagrammData = parsed.data;
            const transformed: BarDiagrammNativeData[] = [];

            setTitle(data.xAxisTitle)
            setIndex(data.xAxisTitle);
            setCategories(data.yAxisData[0].map(elem => elem.yAxisTitle));

            data.xAxisValue.forEach((xelem, xindex) => {
              let tempObj: BarDiagrammNativeData = {
                [data.xAxisTitle]: xelem
              };
              data.yAxisData[xindex].forEach((yelem) => {
                tempObj = {
                  ...tempObj,
                  [yelem.yAxisTitle]: yelem.yAxisValue
                }
              })
              transformed.push(tempObj);
            });

            console.log(transformed);
            setData(transformed)
          }
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            addToast({
              message: error.message,
              style: 'toast-error',
              timeout: 4000
            })
          }
        })
        .finally(() => setIsLoading(false));
    }

    fetchLineData();
  }, [API_KEY, BASE_API_URL, addToast, viewId]);

  useEffect(() => {
    if (data.length) {
      setSlicedColors(colors.slice(0, data.length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if(!isLoading && data){
      const yAxisLabels = [
        ...document.querySelectorAll(
          "#bar-diagramm .yAxis.text-tremor-label tspan"
        )
      ];
      yAxisLabels.forEach(label => label.setAttribute('x', '60'));
      console.log('hello', yAxisLabels)
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
        !isLoading && data &&
        <>
          <Title>{translateTitle(title)}</Title>
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