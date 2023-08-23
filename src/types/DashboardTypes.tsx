export type Dashboard = {
  id: string,
  name: string,
  updated_at: Date,
  workspace_id: string
}

export type DashboardProviderValue = {
  isLoading: boolean,
  dashboards: Dashboard[],
  pickedDashboard: Dashboard | undefined,
  switchDashboard: (dashboardId: string) => void,
  fetchDashboards: () => Promise<void>
  resetDashboards: () => void
}