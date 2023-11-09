import { Card, Title, List, ListItem, Subtitle } from "@tremor/react"
import { ListDiagrammProps } from "../types/DiagrammTypes";
import { useDiagrammData } from "../hooks/useDiagrammData";
import { useNavigate } from "react-router-dom";
import { DiagrammTypes } from "../enums";
import styles from '../styles/components/Diagramm.module.css';
import { useToastContext } from "../hooks/useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";

export const ListDiagramm = ({
  viewId,
}: ListDiagrammProps) => {
  const navigate = useNavigate();
  const { isLoading, data, xAxisTitle, yAxisTitle, title } = useDiagrammData(viewId);
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
    navigate(`/edit/${DiagrammTypes.BIGNUMBER}/${viewId}`);
  }

  return (
    <Card
      id="list-diagramm"
      className={styles.listContainer}
      decoration="top"
      decorationColor="blue"
    >
      {isLoading && <Subtitle>Loading Data ...</Subtitle>}
      {!isLoading && data.length == 0 && <Subtitle>No Data</Subtitle>}
      {
        !isLoading && data.length > 0 &&
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