import { MenuBar } from "../components/MenuBar";
import arrowDownIcon from '../assets/icons/chevron-down.svg';
import styles from '../styles/pages/Workspace.module.css';
import { useRef, useState } from "react";
import { DashboardPicker } from "../components/DashboardPicker";

export const Workspace = () => {
  const dashboardPicker = useRef<HTMLImageElement>(null);
  const workspaceHeader = useRef<HTMLDivElement>(null);
  const [isDashboardPickerOpen, setIsDashboardPickerOpen] = useState<boolean>(false);

  const onClickDashboardPicker = () => {
    if (dashboardPicker.current && workspaceHeader.current) {
      if (!dashboardPicker.current.style.rotate) {
        dashboardPicker.current.style.rotate = '-180deg';
        dashboardPicker.current.style.color = 'white';
        workspaceHeader.current.style.backgroundColor = 'rgb(0, 62, 102)';
        workspaceHeader.current.style.color = 'white';
      } else {
        dashboardPicker.current.style.rotate = '';
        workspaceHeader.current.style.backgroundColor = 'white';
        workspaceHeader.current.style.color = 'rgb(0, 62, 102)';
      }
      setIsDashboardPickerOpen(isDashboardPickerOpen => !isDashboardPickerOpen);
    }
  }

  return (
    <div className={styles.workspaceContainer}>
      <div className={styles.workspaceHeader} ref={workspaceHeader}>
        <div className={styles.dashboardTitleWrapper} onClick={onClickDashboardPicker}>
          <h1 className={styles.dashboardTitle}>Sales</h1>
          <img src={arrowDownIcon} ref={dashboardPicker} />
        </div>
      </div>
      <div className={styles.workspace}>
        {isDashboardPickerOpen && <DashboardPicker />}

      </div>
      <MenuBar />
    </div>
  )
}