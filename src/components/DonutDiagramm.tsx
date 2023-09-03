import { Card, Title, Color, DonutChart, Subtitle } from "@tremor/react"
import { DonutDiagrammData, DonutDiagrammProps } from "../types/DiagrammTypes";
import { useColors } from "../hooks/useColors";
import { ToastProviderValue } from "../types/ToastTypes";
import { useToastContext } from "../hooks/useToastContext";
import { useEffect, useState } from "react";

export const DonutDiagramm = ({
  title,
  viewId,
  currency
}: DonutDiagrammProps) => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { addToast } = useToastContext() as ToastProviderValue;
  const [data, setData] = useState<DonutDiagrammData[]>([]);
  const [index, setIndex] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [slicedColors, setSlicedColors] = useState<Color[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const colors: Color[] = useColors();

  const valueFormatter = (number: number) => {
    if (!currency) {
      return number.toLocaleString();
    }
    return number.toLocaleString('de-DE', {
      style: 'currency',
      currency: currency
    });
  }

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
    const fetchDonutData = async () => {
      const headers = new Headers();
      headers.append('x-api-key', API_KEY);
      headers.append('Content-Type', 'appplication/json');

      await fetch(`${BASE_API_URL}/view/inspect/${viewId}?categorize=false`, {
        headers,
        method: 'GET'
      })
        .then(res => res.json())
        .then(parsed =>{ 
          if(parsed.data.length){
            setIndex(parsed.data[0].descriptionTitle);
            setCategory(parsed.data[0].valueTitle);

            setData(parsed.data.map((element: DonutDiagrammData) => {
              return ({
                [element.descriptionTitle]: element.descriptionValue,
                [element.valueTitle]: Number(element.value)
              })
            }));
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
        .finally(() => setIsLoading(false))
    }

    fetchDonutData();
  }, [API_KEY, BASE_API_URL, addToast, viewId]);

  useEffect(() => {
    if(data.length){
      setSlicedColors(colors.slice(0, data.length));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Card
      id="line-diagramm"
      className="w-[100%] flex flex-col gap-10"
      decoration="top"
      decorationColor="blue"
    >
      <Title>{translateTitle(title)}</Title>
      {!isLoading && data.length === 0 && <Subtitle>No Data</Subtitle>}
      {!isLoading && data.length > 0 && 
        <DonutChart
          className="w-full !h-[600px] [&>div>div>svg>text]:!text-4xl mt-4 mb-4"
          data={data}
          index={index}
          category={category}
          colors={slicedColors}
          valueFormatter={valueFormatter}
          variant="donut"
        />
      }
    </Card>
  )
}