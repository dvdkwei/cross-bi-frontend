import { Card, Title, List, ListItem, Subtitle } from "@tremor/react"
import { ListDiagrammProps } from "../types/DiagrammTypes";
import { useDiagrammData } from "../hooks/useDiagrammData";

export const ListDiagramm = ({
  viewId,
}: ListDiagrammProps) => {
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
          <Title>{title}</Title>
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