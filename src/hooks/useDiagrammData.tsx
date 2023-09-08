import { useEffect, useState } from "react"
import { CategorisedDiagrammData, DiagrammNativeData, UncategorisedDiagrammData } from "../types/DiagrammTypes"
import { useToastContext } from "./useToastContext"
import { ToastProviderValue } from "../types/ToastTypes"
import { Color } from "@tremor/react"
import { useColors } from "./useColors"

export const useDiagrammData = (id : number) => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { addToast } = useToastContext() as ToastProviderValue;
  const colors: Color[] = useColors();
  const [categories, setCategories] = useState<string[]>([]);
  const [index, setIndex] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [xAxisTitle, setXaxisTitle] = useState<string>('');
  const [yAxisTitle, setYaxisTitle] = useState<string>('');
  const [data, setData] = useState<DiagrammNativeData[]>([]);
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

  const transformUncategorisedData = (rawData: UncategorisedDiagrammData) => {
    setTitle(rawData.title ?? translateTitle(rawData.axisData[0].xAxisTitle));
    setIndex(rawData.axisData[0].xAxisTitle);
    setCategories([rawData.axisData[0].yAxisTitle]);
    setXaxisTitle(rawData.axisData[0].xAxisTitle);
    setYaxisTitle(rawData.axisData[0].yAxisTitle);

    const transformedData = rawData.axisData.map(raw => {
      let yAxisValueAsNumber;

      if (!isNaN(Number(raw.yAxisValue))) {
        yAxisValueAsNumber = Number((Number(raw.yAxisValue) * 1.0).toFixed(2));
      }

      return {
        [raw.xAxisTitle]: raw.xAxisValue,
        [raw.yAxisTitle]: yAxisValueAsNumber ?? raw.yAxisValue
      }
    });

    setData(transformedData);
  }

  const transformCategorisedData = (rawData: CategorisedDiagrammData) => {
    const transformed: DiagrammNativeData[] = [];
    setTitle(rawData.title ?? translateTitle(rawData.xAxisTitle));
    setIndex(rawData.xAxisTitle);
    setCategories(rawData.categories);
    
    rawData.xAxisValue.forEach((xelem, xindex) => {
      let tempObj: DiagrammNativeData = {
        [rawData.xAxisTitle]: xelem
      };
      rawData.yAxisData[xindex].forEach((yelem) => {
        tempObj = {
          ...tempObj,
          [yelem.yAxisTitle]: Number(yelem.yAxisValue)
        }
      })
      transformed.push(tempObj);
    });

    setData(transformed);
  }

  useEffect(() => {
    const fetchData = async () => {
      const headers = new Headers();
      headers.append('x-api-key', API_KEY);
      headers.append('Content-Type', 'appplication/json');

      await fetch(`${BASE_API_URL}/view/inspect/${id}`, {
        headers,
        method: 'GET'
      })
        .then(res => res.json())
        .then(parsed => {
          if (parsed.data) {
            if (parsed.data.categories) {
              transformCategorisedData(parsed.data as CategorisedDiagrammData);
            }
            else {
              transformUncategorisedData(parsed.data as UncategorisedDiagrammData);
            }
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

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_KEY, BASE_API_URL, id]);

  useEffect(() => {
    if (data && data.length) {
      setSlicedColors(colors.slice(0, data.length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    categories,
    index,
    title,
    data,
    xAxisTitle,
    yAxisTitle,
    isLoading,
    slicedColors
  }
}