import { Card, LineChart, MultiSelect, MultiSelectItem, Subtitle, Title } from "@tremor/react"
import { useDiagrammData } from "../hooks/useDiagrammData";
import { DiagrammNativeData, LineDiagrammProps } from "../types/DiagrammTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiagrammTypes } from "../enums";

export const LineDiagramm = ({
  subtitle,
  viewId
}: LineDiagrammProps) => {
  const navigate = useNavigate();
  const { isLoading, data, title, index, categories, slicedColors } = useDiagrammData(viewId);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<DiagrammNativeData[]>([]);

  useEffect(() => {
    if (!isLoading && data) {
      const yAxisLabels = [
        ...document.querySelectorAll(
          "#bar-diagramm .yAxis.text-tremor-label tspan"
        )
      ];
      yAxisLabels.forEach(label => label.setAttribute('x', '60'));
      setFilteredData(data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if(categories){
      setFilteredCategories(categories);
    }
  }, [categories]);

  return (
    <Card
      id="line-diagramm"
      className="w-[100%] flex flex-col gap-10"
      decoration="top"
      decorationColor="blue"
    >
      <Title onClick={() => navigate(`/edit/${DiagrammTypes.LINE}/${viewId}`)}>
        {title}
      </Title>
      {
        subtitle &&
        <Subtitle>{subtitle}</Subtitle>
      }
      {
        !isLoading && filteredCategories &&
        <div className='flex flex-col w-full'>
          <MultiSelect
            value={filteredCategories}
            onValueChange={(val) => setFilteredCategories(val)}
            className='[&>ul]:!max-h-[400px] [&>button#headlessui-listbox-button-:r35:]:!h-[80px] [&>ul>li>span]:!static !py-4'
          >
            {
              categories.map((element, index) => {
                return (
                  <MultiSelectItem key={'ms-' + index} value={element}>
                    {element}
                  </MultiSelectItem>
                )
              })
            }
          </MultiSelect>
        </div >
      }
      {
        !isLoading && data &&
        <LineChart
          className="!h-[600px]"
          data={filteredData}
          index={index}
          categories={filteredCategories ?? categories}
          colors={slicedColors}
          showAnimation={true}
        />
      }
    </Card>
  )
}