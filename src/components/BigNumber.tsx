import { Card, Metric, Text } from "@tremor/react"
import { BigNumberData, BigNumberProps } from "../types/DiagrammTypes";
import { useEffect, useState } from "react";
import { useToastContext } from "../hooks/useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";

export const BigNumber = ({ viewId, currency, decorationColor }: BigNumberProps) => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState<BigNumberData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToastContext() as ToastProviderValue;

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
    const roundValue = (value: number) => {
      if (!currency) {
        return (value * 1.0).toFixed(2).toString();
      }
      return value.toLocaleString('de-DE', {
        style: 'currency',
        currency: currency
      });
    };

    const fetchDonutData = async () => {
      const headers = new Headers();
      headers.append('x-api-key', API_KEY);
      headers.append('Content-Type', 'appplication/json');

      await fetch(`${BASE_API_URL}/view/aggregate/${viewId}`, {
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
  }, [API_KEY, BASE_API_URL, addToast, currency, viewId])

  return (
    <Card
      id="big-number"
      className="w-[100%] flex flex-col gap-10"
      decoration="top"
      decorationColor={decorationColor ?? 'blue' }
    >
      {!isLoading && !data && <Text>No Data</Text>}
      {
        !isLoading && data &&
        <>
          <Text className="text-[#003E66] text-5xl">{translateTitle(data.valueTitle)}</Text>
          <Metric className="text-6xl">{data.value}</Metric>
        </>
      }
    </Card>
  )
}