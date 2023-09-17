import { Card, Title, List, ListItem, Subtitle } from "@tremor/react"
import { ListDiagrammProps } from "../types/DiagrammTypes";
import { useDiagrammData } from "../hooks/useDiagrammData";
import { useNavigate } from "react-router-dom";
import { DiagrammTypes } from "../enums";

export const ListDiagramm = ({
  viewId,
}: ListDiagrammProps) => {
  const navigate = useNavigate();
  const { isLoading, data, xAxisTitle, yAxisTitle, title } = useDiagrammData(viewId);

  return (
    <Card
      id="line-diagramm"
      className="w-[100%] flex flex-col gap-10"
      decoration="top"
      decorationColor="blue"
    >
      {!isLoading && data.length == 0 && <Subtitle>No Data</Subtitle>}
      {
        !isLoading && data.length > 0 &&
        <>
          <Title onClick={() => navigate(`/edit/${DiagrammTypes.LIST}/${viewId}`)}>
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