import { MultiSelect, MultiSelectItem } from "@tremor/react";
import { DiagrammNativeData } from "../types/DiagrammTypes";

type MultiSelectFilterProps = {
  dataToFilter: DiagrammNativeData[],
  value: string[],
  valueKey: string,
  onValueChange: (value: string[]) => void
}

export const MultiSelectFilter = ({ dataToFilter, value, valueKey, onValueChange }: MultiSelectFilterProps) => {
  return (
    <div className='flex flex-col w-full'>
      <MultiSelect
        value={value}
        onValueChange={(val) => onValueChange(val)}
        className='[&>ul]:!max-h-[400px] [&>button#headlessui-listbox-button-:r35:]:!h-[80px] [&>ul>li>span]:!static !py-4'
      >
        {
          dataToFilter.map((element, index) => {
            return (
              <MultiSelectItem key={'ms-' + index} value={element[valueKey].toString()}>
                {element[valueKey]}
              </MultiSelectItem>
            )
          })
        }
      </MultiSelect>
    </div >
  )
}