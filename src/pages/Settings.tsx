import { useEffect, useState } from 'react';
import { MenuBar } from '../components/MenuBar';
import { useAuth } from '../hooks/useAuth';
import { useWorkspace } from '../hooks/useWorkspace';
import styles from '../styles/pages/Settings.module.css';
import { AuthProviderValue } from '../types/AuthTypes';
import { WorkspaceProviderValue, Workspace, WorkspaceInfoProps } from '../types/WorkspaceTypes';
import { useUser } from '../hooks/useUser';

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

export const Settings = () => {
  const { handleLogout } = useAuth() as AuthProviderValue;
  const { currentWorkspace, getWorkspaces, switchWorkspace } = useWorkspace() as WorkspaceProviderValue;
  const [workspaces, setWorkspaces] = useState<Workspace[] | undefined>(undefined);
  const user = useUser();

  const onClickChangeWorkspace = (workspaceId: string) => switchWorkspace(workspaceId);

  useEffect(() => {
    if (user) {
      getWorkspaces(user.id.toString()).then(data => {
        setWorkspaces(data);
      });
    }
  }, [getWorkspaces, user]);

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settings}>
        <h1>Settings</h1>
        <div className={styles.workspaceInfo}>
          <h2 className='text-[2.8rem] font-semibold'>Current Workspace</h2>
          {
            workspaces ?
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
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>
      <MenuBar menuIndex={4}/>
    </div >
  )
}