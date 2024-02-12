import { Card, Title, List, ListItem, Subtitle } from "@tremor/react"
import { ListDiagramProps } from "../types/DiagramTypes";
import { useDiagramData } from "../hooks/useDiagramData";
import { useNavigate } from "react-router-dom";
import { DiagramTypes } from "../enums";
import styles from '../styles/components/Diagram.module.css';
import { useToastContext } from "../hooks/useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";
import { BigDiagramLoader } from "./BigDiagramLoader";

export const ListDiagram = ({
  viewId,
}: ListDiagramProps) => {
  const navigate = useNavigate();
  const { isLoading, data, xAxisTitle, yAxisTitle, title } = useDiagramData(viewId);
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
    navigate(`/edit/${DiagramTypes.BIGNUMBER}/${viewId}`);
  }

  if (isLoading) return <BigDiagramLoader />;

  return (
    <Card
      id="list-diagramm"
      className={styles.listContainer + ' border border-gray-100'}
      decoration="top"
      decorationColor="blue"
    >
      {data.length == 0 && <Subtitle>No Data</Subtitle>}
      {data.length > 0 &&
        <>
          <Title onClick={onClickTitle}>
            {title}
          </Title>
          <List>
            {
              data.map((dt, index) => {
                return (
                  <ListItem key={title + index} className="[&>span]:!static">
                    <span>{dt[xAxisTitle]}</span>
                    <span>{dt[yAxisTitle]}</span>
                  </ListItem>
                )
              })
            }
          </List>
        </>
      }
    </Card>
  )
}