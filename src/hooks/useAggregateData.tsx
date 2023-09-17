import { BigNumberData } from "../types/DiagrammTypes";
import { useEffect, useState } from "react";
import { useToastContext } from "../hooks/useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";
import { useTimeFrameContext } from "./useTimeFrameContext";
import { TimeFrameProviderValue } from "../contexts/TimeFrameContext";

export const useAggregateData = (viewId: number, currency?: 'EUR' | 'USD') => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState<BigNumberData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState<string>('');
  const [xAxisTitle, setXaxisTitle] = useState<string>('');
  const [yAxisTitle, setYaxisTitle] = useState<string>('');
  const [aggregateStrategy, setAggregateStrategy] = useState<string>('');
  const { addToast } = useToastContext() as ToastProviderValue;
  const { fromDate, toDate } = useTimeFrameContext() as TimeFrameProviderValue;

  useEffect(() => {
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

    const roundValue = (value: number) => {
      if (!currency) {
        return (value * 1.0).toFixed(2).toString();
      }
      return value.toLocaleString('de-DE', {
        style: 'currency',
        currency: currency
      });
    };

    const fetchData = async () => {
      let fetchUrl = `${BASE_API_URL}/view/aggregate/${viewId}`;
      const headers = new Headers();
      headers.append('x-api-key', API_KEY);
      headers.append('Content-Type', 'appplication/json');

      if(fromDate && toDate){
        fetchUrl += `?from=${fromDate}&to=${toDate}`
      }

      await fetch(fetchUrl, {
        headers,
        method: 'GET'
      })
        .then(res => res.json())
        .then(parsed => {
          if (parsed.data) {
            setData({
              valueTitle: parsed.data.valueTitle,
              value: roundValue(Number(parsed.data.value))
            });

            setTitle(parsed.data.title ?? translateTitle(parsed.data.valueTitle));
            setXaxisTitle(parsed.data.x_axis);
            setYaxisTitle(parsed.data.y_axis)
            setAggregateStrategy(parsed.data.aggregate)
          }
          else {
            setData(undefined);
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

    fetchData();
  }, 
  [
    API_KEY, 
    BASE_API_URL, 
    addToast, 
    currency, 
    fromDate, 
    toDate, 
    viewId
  ]);

  return {
    data,
    title,
    isLoading,
    xAxisTitle,
    yAxisTitle,
    aggregateStrategy
  }
}