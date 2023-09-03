import { Card, Title, List, ListItem, Subtitle } from "@tremor/react"
import { ListDiagrammData, ListDiagrammProps } from "../types/DiagrammTypes";
import { useEffect, useState } from "react";
import { useToastContext } from "../hooks/useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";

export const ListDiagramm = ({
  title,
  viewId,
}: ListDiagrammProps) => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { addToast } = useToastContext() as ToastProviderValue;
  const [data, setData] = useState<ListDiagrammData[]>([]);
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
    const fetchListData = async () => {
      const headers = new Headers();
      headers.append('x-api-key', API_KEY);
      headers.append('Content-Type', 'appplication/json');

      await fetch(`${BASE_API_URL}/view/inspect/${viewId}?categorize=false`, {
        headers,
        method: 'GET'
      })
        .then(res => res.json())
        .then(data => setData(data.data))
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

    fetchListData();
  }, [API_KEY, BASE_API_URL, addToast, viewId])

  return (
    <Card
      id="line-diagramm"
      className="w-[100%] flex flex-col gap-10"
      decoration="top"
      decorationColor="blue"

    >
      <Title>{translateTitle(title)}</Title>
      <List>
        {!isLoading && data.length == 0 && <Subtitle>No Data</Subtitle>}
        {
          !isLoading && data.length > 0 &&
          data.map((dt, index) => {
            if (!isNaN(Number(dt.value))) {
              dt.value = (Number(dt.value) * 1.0).toFixed(2);
            }
            return (
              <ListItem key={title + index} className="[&>span]:!static">
                <span>{dt.descriptionValue}</span>
                <span>{dt.value}</span>
              </ListItem>
            )
          })
        }
      </List>
    </Card>
  )
}