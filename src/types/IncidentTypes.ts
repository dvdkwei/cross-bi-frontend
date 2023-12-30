import { IncidentTypes } from "../enums"

export type Incident = {
  id: number,
  title: string,
  timestamp: Date,
  description: string,
  department: string,
  status: IncidentTypes
}