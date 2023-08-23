import { MenuBar } from '../components/MenuBar';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkspaceContext } from '../hooks/useWorkspaceContext';
import styles from '../styles/pages/Settings.module.css';
import { AuthProviderValue } from '../types/AuthTypes';
import { WorkspaceProviderValue, WorkspaceInfoProps } from '../types/WorkspaceTypes';
import { Loader } from '../components/Loader';
import { useWorkspace } from '../hooks/useWorkspace';

const WorkspaceInfo = ({ currentWorkspace, workspaces, callback }: WorkspaceInfoProps) => {
  return (
    <select
      value={currentWorkspace?.id || '0'}
      onChange={(event) => {
        callback(event.target.value)
      }}
    >
      {
        workspaces.map((workspace, index) => {
          return (
            <option
              key={`wsp-${index}`}
              value={workspace.id}
            >
              {workspace.name}
            </option>
          )
        })
      }
    </select>
  )
}

const SettingsContent = () => {
  const { handleLogout } = useAuthContext() as AuthProviderValue;
  const { currentWorkspace, switchWorkspace } = useWorkspaceContext() as WorkspaceProviderValue;
  const { workspaces, resetWorkspace } = useWorkspace();

  const onClickChangeWorkspace = (workspaceId: string) => switchWorkspace(workspaceId);

  const onClickLogout = () => {
    resetWorkspace();
    handleLogout();
  }

  return (
    <div className='flex flex-col w-[90%] gap-20'>
      <div className={styles.workspaceInfo}>
        <h2 className='text-[2.8rem] font-semibold'>Current Workspace</h2>
        {
          currentWorkspace ?
            <WorkspaceInfo
              currentWorkspace={currentWorkspace}
              workspaces={workspaces}
              callback={onClickChangeWorkspace}
            />
            :
            <select className='!border-gray-700'></select>
        }
      </div>
      <div className={styles.settingButtons}>
        <p>How To Install</p>
        <p>About</p>
        <p onClick={onClickLogout}>Logout</p>
      </div>
    </div>
  )
}

export const Settings = () => {

  const { isLoading: isLoadingContext } = useWorkspaceContext() as WorkspaceProviderValue;
  const { isLoading } = useWorkspace();

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settings}>
        <h1>Settings</h1>
      </div>
      {(isLoadingContext || isLoading) ? <Loader /> : <SettingsContent />}
      <MenuBar menuIndex={4} />
    </div >
  )
}