import { Card, Metric, Text } from "@tremor/react"
import { BigNumberProps } from "../types/DiagrammTypes";
import { useAggregateData } from "../hooks/useAggregateData";
import { useNavigate } from "react-router-dom";
import { DiagrammTypes } from "../enums";

export const BigNumber = ({ viewId, currency, decorationColor }: BigNumberProps) => {
  const navigate = useNavigate()
  const {data, isLoading, title} = useAggregateData(viewId, currency);

  return (
    <Card
      id="big-number"
      className="w-[100%] flex flex-col gap-2 !p-2"
      decoration="top"
      decorationColor={decorationColor ?? 'blue' }
      onClick={() => navigate(`/edit/${DiagrammTypes.BIGNUMBER}/${viewId}`)}
    >
      {!isLoading && !data && <Text>No Data</Text>}
      {
        !isLoading && data &&
        <>
          <Text className="text-[#003E66] !text-[18px]">{title}</Text>
          <Metric className="!text-[32px]">{data.value}</Metric>
        </>
      }
    </Card>
  )
}