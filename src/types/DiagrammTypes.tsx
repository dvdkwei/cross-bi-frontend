import { Color } from "@tremor/react"

export type BigNumberData = {
  valueTitle: string,
  value: string,
}

export type BigNumberProps = {
  viewId: number,
  currency: 'EUR' | 'USD',
  decorationColor?: Color,
}

export type YAxisData = {
  yAxisTitle: string,
  yAxisValue: number
}

export type BarDiagrammNativeData = {
  [x: string]: string | number
}

export type BarDiagrammProps = {
  subtitle?: string,
  viewId: number,
  decoration?: 'top' | 'bottom' | 'left' | 'right'
}

export type LineDiagrammProps = {
  subtitle?: string,
  viewId: number,
  decoration?: 'top' | 'bottom' | 'left' | 'right'
}

export type DonutDiagrammProps = {
  viewId: number,
  currency?: string,
  decoration?: 'top' | 'bottom' | 'left' | 'right'
}

export type ListDiagrammProps = {
  viewId: number,
  currency?: string,
  decoration?: 'top' | 'bottom' | 'left' | 'right'
}

export type UncategorisedDiagrammData = {
  title: string | undefined,
  axisData : {
    xAxisTitle: string,
    xAxisValue: string,
    yAxisTitle: string,
    yAxisValue: number | string
  }[]
}

export type CategorisedDiagrammData = {
  xAxisTitle: string,
  xAxisValue: string[],
  categories: string[],
  yAxisData: [YAxisData[]],
  title: string | undefined
}

export type DiagrammNativeData = {
  [x: string]: string | number
}