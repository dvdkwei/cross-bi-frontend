import { MenuBar } from "../components/MenuBar";
import styles from '../styles/pages/Workspace.module.css';
import { useDashboardContext } from "../hooks/useDashboardContext";
import { DashboardProviderValue } from "../types/DashboardTypes";
import { Loader } from "../components/Loader";
import { useWorkspace } from "../hooks/useWorkspace";
import { useView } from "../hooks/useView";
import { DashboardContent } from "../components/DashboardContent";

const DashboardPicker = () => {
  const { dashboards, pickedDashboard, switchDashboard } = useDashboardContext() as DashboardProviderValue;

  const onChangeSelect = (dashboardId: string) => {
    switchDashboard(dashboardId);
  }

  return (
    <select value={pickedDashboard?.id ?? ''} onChange={e => onChangeSelect(e.target.value)}>
      {
        dashboards?.length &&
        dashboards.map((dashboard, index) => {
          return (
            <option key={'dh' + index} className="px-8" value={dashboard.id}>
              {dashboard.name}
            </option>
          )
        })
      }
    </select>
  )
}

export const Workspace = () => {
  const { isLoading: isLoadingWorkspace } = useWorkspace();
  const { isLoading: isLoadingView } = useView();
  const { isLoading: isLoadingDashboard } = useDashboardContext() as DashboardProviderValue;

  return (
    <div className={styles.workspaceContainer}>
      <div className={styles.workspaceHeader}>
        <DashboardPicker />
      </div>
      <div className={styles.workspace}>
      {
        (isLoadingWorkspace || isLoadingView || isLoadingDashboard) ? 
        <Loader /> 
        : 
        <DashboardContent />
      }
      </div>
      <MenuBar menuIndex={0} />
    </div>
  )
}