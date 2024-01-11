import { Subtitle, Title, Card } from "@tremor/react";

export const BigDiagramLoader = () => {
  return(
    <Card
      className="w-[100%] flex flex-col gap-2 !p-2 animate-pulse"
      decoration="top"
      decorationColor='blue'
    >
      <Title className="bg-gray-300 h-6 w-[100%] rounded"></Title>
      <Subtitle className="bg-gray-300 h-4 w-[100%] rounded"></Subtitle>
      <div className="bg-gray-300 h-16 w-[100%] rounded"></div>
    </Card>
  )
}