import { MultiSelect, MultiSelectItem } from "@tremor/react";
import { DiagrammNativeData } from "../types/DiagrammTypes";
import styles from '../styles/components/Diagramm.module.css';

type XAxisFilterProps = {
  dataToFilter: DiagrammNativeData[],
  value: string[],
  valueKey: string,
  onValueChange: (value: string[]) => void
}

export const XAxisFilter = ({ dataToFilter, value, valueKey, onValueChange }: XAxisFilterProps) => {
  return (
    <div className='flex flex-col w-full'>
      <MultiSelect
        value={value}
        onValueChange={(val) => onValueChange(val)}
        className={styles.multiSelect}
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