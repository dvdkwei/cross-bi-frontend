import { MenuBar } from "../components/MenuBar";
import styles from '../styles/pages/Workspace.module.css';
import { useDashboardContext } from "../hooks/useDashboardContext";
import { DashboardProviderValue } from "../types/DashboardTypes";
import { Loader } from "../components/Loader";
import { useWorkspaces } from "../hooks/useWorkspaces";
import { useViewsOfWorkspaceAndDashboard } from "../hooks/useViewsOfWorkspaceAndDashboard";
import { DashboardContent } from "../components/DashboardContent";
import { useState } from "react";
import { TimeFrame } from "../components/TimeFrame";
import { useTimeFrameContext } from "../hooks/useTimeFrameContext";
import { TimeFrameProviderValue } from "../contexts/TimeFrameContext";
import { useLocation } from "react-router-dom";
import { SwipeNavigation } from "../components/SwipeNavigation";

const DashboardPicker = () => {
  const {
    dashboards,
    pickedDashboard,
    switchDashboard
  } = useDashboardContext() as DashboardProviderValue;

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
  const { isLoading: isLoadingWorkspace } = useWorkspaces();
  const { isLoading: isLoadingViews } = useViewsOfWorkspaceAndDashboard();
  const { isLoading: isLoadingDashboard } = useDashboardContext() as DashboardProviderValue;
  const {
    fromDate,
    toDate,
    fromDateHandler,
    toDateHandler,
    resetTimeFrame
  } = useTimeFrameContext() as TimeFrameProviderValue;
  const { state } = useLocation();
  const [showDate, setShowDate] = useState(!!fromDate || !!toDate);
  const buttonStyle = "dark-button text-[12px] !px-4 font-semibold";

  const toggleTimeFrameButton = () => {
    resetTimeFrame();
    setShowDate(showDate => !showDate);
  };

  if (isLoadingWorkspace || isLoadingViews || isLoadingDashboard) {
    return (
      <div className="flex w-full h-[100vh] items-center justify-center">
        <Loader />
        <MenuBar menuIndex={0} />
      </div>
    )
  }

  return (
    <>
      <div 
        className={styles.workspaceContainer}
        style={state?.transition ? { animation: `.3s ease-out ${state.transition}` } : {}}
      >
        <SwipeNavigation onSwipeRightRoute={'/incidents'} />
        <div className={styles.workspaceHeader + ' fixed z-50 bg-white'}>
          <DashboardPicker />
          <div className="flex gap-2 w-fit text-[18px]">
            {
              !showDate ?
                <button
                  onClick={toggleTimeFrameButton}
                  className={buttonStyle}
                >
                  Timeframe
                </button>
                :
                <>
                  <button
                    className={buttonStyle}
                    onClick={resetTimeFrame}
                  >
                    Reset
                  </button>
                  <button
                    onClick={toggleTimeFrameButton}
                    className={buttonStyle + " !bg-red-800"}
                  >
                    Cancel
                  </button>
                </>
            }
          </div>
        </div>
        <div className={styles.workspace + ' pt-[60px]'}>
          <DashboardContent />
        </div>
        {
          showDate &&
          <TimeFrame
            toDate={toDate}
            fromDate={fromDate}
            fromDateHandler={fromDateHandler}
            toDateHandler={toDateHandler}
          />
        }
      </div>
      <MenuBar menuIndex={0} />
    </>
  )
}