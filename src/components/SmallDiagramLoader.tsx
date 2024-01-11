import { Card, Metric, Text } from "@tremor/react";

export const SmallDiagramLoader = () => (
  <Card
    className="w-[100%] flex flex-col gap-2 !p-2 animate-pulse"
    decoration="top"
    decorationColor='blue'
  >
    <>
      <Text className="bg-gray-300 h-4 w-[100%] rounded"></Text>
      <Metric className="bg-gray-300 h-8 w-[100%] rounded"></Metric>
    </>
  </Card>
)