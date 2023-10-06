import { MenuBar } from '../components/MenuBar';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkspaceContext } from '../hooks/useWorkspaceContext';
import styles from '../styles/pages/Settings.module.css';
import { AuthProviderValue } from '../types/AuthTypes';
import { WorkspaceProviderValue, WorkspaceInfoProps } from '../types/WorkspaceTypes';
import { useWorkspaces } from '../hooks/useWorkspaces';
import { InstallPrompt } from '../components/InstallPrompt';

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
  const { isLoading, currentWorkspace, switchWorkspace } = useWorkspaceContext() as WorkspaceProviderValue;
  const { workspaces, resetWorkspace } = useWorkspaces();

  const onClickChangeWorkspace = (workspaceId: string) => switchWorkspace(workspaceId);

  const onClickLogout = () => {
    resetWorkspace();
    handleLogout();
  }

  return (
    <div className='flex flex-col w-[95%] gap-6'>
      <div className={styles.workspaceInfo}>
        <h2 className='text-[24px] font-semibold'>Current Workspace</h2>
        {
          isLoading ?
            <select className='!border-gray-700'></select>
            :
            <WorkspaceInfo
              currentWorkspace={currentWorkspace}
              workspaces={workspaces}
              callback={onClickChangeWorkspace}
            />
        }
      </div>
      <div className={styles.settingButtons}>
        <p>About</p>
        <p onClick={onClickLogout}>Logout</p>
      </div>
    </div>
  )
}

export const Settings = () => {
  return (
    <div className={styles.settingsContainer}>
      <InstallPrompt />
      <div className={styles.settings}>
        <h1>Settings</h1>
      </div>
      <SettingsContent />
      <MenuBar menuIndex={4} />
    </div >
  )
}