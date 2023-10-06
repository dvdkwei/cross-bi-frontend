import { Card, Metric, Text } from "@tremor/react"

type BigNumberPreviewProps = {
  title: string,
}

export const BigNumberPreview = ({ title }: BigNumberPreviewProps) => {

  return (
    <Card
      id="big-number"
      className="w-[100%] flex flex-col gap-2 !p-2"
      decoration="top"
      decorationColor='blue'
    >
      <Text className="text-[#003E66] !text-[18px]">{title}</Text>
      <Metric className="!text-[32px]">Sample Value</Metric>
    </Card>
  )
}