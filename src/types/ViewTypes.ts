import { DiagramTypes } from "../enums"

export type AggregateStrategies = 'sum' | 'count' | 'avg' | undefined

export type View = {
  id: number,
  name: string,
  updated_at: Date,
  dashboard_id: number,
  workspace_id: number,
  diagramm_type: DiagramTypes,
  x_axis: string,
  y_axis: string,
  title: string | undefined,
  categories: string | undefined,
  aggregate: string
}