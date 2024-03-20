import { Color } from "@tremor/react"

export type BigNumberData = {
  valueTitle: string,
  value: string,
}

export type BigNumberProps = {
  viewId: number,
  currency?: 'EUR' | 'USD',
  decorationColor?: Color,
}

export type YAxisData = {
  yAxisTitle: string,
  yAxisValue: number
}

export type BarDiagramNativeData = {
  [x: string]: string | number
}

export type BarDiagramProps = {
  subtitle?: string,
  viewId: number,
  decoration?: 'top' | 'bottom' | 'left' | 'right'
}

export type LineDiagramProps = {
  subtitle?: string,
  viewId: number,
  decoration?: 'top' | 'bottom' | 'left' | 'right'
}

export type DonutDiagramProps = {
  viewId: number,
  currency?: string,
  decoration?: 'top' | 'bottom' | 'left' | 'right'
}

export type ListDiagramProps = {
  viewId: number,
  currency?: string,
  decoration?: 'top' | 'bottom' | 'left' | 'right'
}

export type UncategorisedDiagramData = {
  title: string | undefined,
  axisData : {
    xAxisTitle: string,
    xAxisValue: string,
    yAxisTitle: string,
    yAxisValue: number | string
  }[]
}

export type CategorisedDiagramData = {
  xAxisTitle: string,
  xAxisValue: string[],
  categories: string[],
  yAxisData: [YAxisData[]],
  title: string | undefined
}

export type DiagramNativeData = {
  [x: string]: string | number
}