import { Color } from "@tremor/react"

export type BigNumberData = {
  valueTitle: string,
  value: string
}

export type BigNumberProps = {
  viewId: number,
  currency: string,
  decorationColor?: Color,
}

export type YAxisData = {
  yAxisTitle: string,
  yAxisValue: number
}

export type BarDiagrammData = {
  xAxisTitle: string,
  xAxisValue: string[],
  yAxisData: [YAxisData[]]
}

export type BarDiagrammNativeData = {
  [x: string]: string | number
}

export type BarDiagrammProps = {
  subtitle?: string,
  viewId: number,
  decoration?: 'top' | 'bottom' | 'left' | 'right'
}

export type LineDiagrammData = {
  xAxisTitle: string,
  xAxisValue: string[],
  yAxisData: [YAxisData[]]
}

export type LineDiagrammNativeData = {
  [x: string]: string | number
}

export type LineDiagrammProps = {
  subtitle?: string,
  viewId: number,
  decoration?: 'top' | 'bottom' | 'left' | 'right'
}

export type DonutDiagrammData = {
  descriptionTitle: string,
  descriptionValue: string,
  valueTitle: string,
  value: string | number,
}

export type DonutDiagrammProps = {
  title: string,
  viewId: number,
  currency?: string,
  decoration?: 'top' | 'bottom' | 'left' | 'right'
}

export type ListDiagrammData = {
  descriptionTitle: string,
  descriptionValue: string,
  valueTitle: string,
  value: string | number,
}

export type ListDiagrammProps = {
  title: string,
  viewId: number,
  currency?: string,
  decoration?: 'top' | 'bottom' | 'left' | 'right'
}