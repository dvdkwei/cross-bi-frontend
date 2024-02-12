import { BadgeDelta, Card, Flex, Metric, Text } from "@tremor/react"
import { BigNumberProps } from "../types/DiagramTypes";
import { useAggregateData } from "../hooks/useAggregateData";
import { useNavigate } from "react-router-dom";
import { DiagramTypes } from "../enums";
import { useToastContext } from "../hooks/useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";
import { SmallDiagramLoader } from "./SmallDiagramLoader";

export const BigNumber = ({ viewId, currency }: BigNumberProps) => {
  const navigate = useNavigate()
  const { data, isLoading, title } = useAggregateData(viewId, currency);
  const { addToast } = useToastContext() as ToastProviderValue;

  const onClickTitle = () => {
    if (!navigator.onLine) {
      addToast({
        message: `It seems that you are offline. Try again later.`,
        style: 'toast-error',
        timeout: 4000,
      })
      return;
    }
    navigate(`/edit/${DiagramTypes.BIGNUMBER}/${viewId}`);
  }

  if (isLoading) return <SmallDiagramLoader />

  return (
    <Card
      id="big-number"
      className="w-[100%] max-w-[400px] flex flex-col gap-2 !p-2 border border-gray-100"
      onClick={onClickTitle}
    >
      {!data && <Text>No Data</Text>}
      {
        data &&
        <Flex>
          <div>
            <Text className="text-[#003E66] !text-[1.2rem]">{title}</Text>
            <Metric className="!text-[2rem]">{data.value}</Metric>
          </div>
          <BadgeDelta deltaType='moderateIncrease'>12.67%</BadgeDelta>
        </Flex>
      }
    </Card>
  )
}