import { Card, Metric, Text } from "@tremor/react"
import { BigNumberProps } from "../types/DiagrammTypes";
import { useAggregateData } from "../hooks/useAggregateData";
import { useNavigate } from "react-router-dom";
import { DiagrammTypes } from "../enums";
import { useToastContext } from "../hooks/useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";

export const BigNumber = ({ viewId, currency, decorationColor }: BigNumberProps) => {
  const navigate = useNavigate()
  const {data, isLoading, title} = useAggregateData(viewId, currency);
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
      id="big-number"
      className="w-[100%] flex flex-col gap-2 !p-2"
      decoration="top"
      decorationColor={decorationColor ?? 'blue' }
      onClick={onClickTitle}
    >
      { isLoading && <Text className="!text-[14px]">Loading Data ...</Text> }
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