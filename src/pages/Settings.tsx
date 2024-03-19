import { MenuBar } from '../components/MenuBar';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkspaceContext } from '../hooks/useWorkspaceContext';
import styles from '../styles/pages/Settings.module.css';
import { AuthProviderValue } from '../types/AuthTypes';
import { WorkspaceProviderValue } from '../types/WorkspaceTypes';
import { useWorkspaces } from '../hooks/useWorkspaces';
import { useLocation } from 'react-router-dom';
import { SwipeNavigation } from '../components/SwipeNavigation';
import { Accordion, AccordionBody, AccordionHeader, AccordionList } from '@tremor/react';
import chromeSettingsIcon from '../assets/icons/three-dots.png';
import safariSettingsIcon from '../assets/icons/ios-upload.png';

const SettingsContent = () => {
  const { handleLogout } = useAuthContext() as AuthProviderValue;
  const { isLoading, currentWorkspace, switchWorkspace } = useWorkspaceContext() as WorkspaceProviderValue;
  const { workspaces, resetWorkspace } = useWorkspaces();

  const onClickLogout = () => {
    resetWorkspace();
    handleLogout();
  }

  return (
    <div className='flex flex-col w-[95%] gap-[.25rem]'>
      <div className={styles.workspaceInfo}>
        {!isLoading &&
          <select
            value={currentWorkspace?.id || '0'}
            onChange={(event) => {
              switchWorkspace(event.target.value)
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
        }
      </div>
      <AccordionList className='!text-[#003e66]'>
        <Accordion >
          <AccordionHeader className='!text-[#003e66] !font-semibold'>About</AccordionHeader>
          <AccordionBody className='!text-[#003e66]'>
            CrossBI is a prototype of the idea to combine the data visualisation aspect of Business Intelligence technology with the Progressive Web App. This is a work by David Kurniadi Weinardy for his bachelor thesis under the supervision of Prof. Dr. Stefan Sarstedt and Prof. Dr. Martin Schultz.
          </AccordionBody>
        </Accordion>
        <Accordion>
          <AccordionHeader className='!text-[#003e66] !font-semibold'>Installing from Chrome or Opera</AccordionHeader>
          <AccordionBody className='!text-[#003e66]'>
            <ol type='1' className='list-decimal mx-4'>
              <li>Open browser settings. <img src={chromeSettingsIcon} className='w-6 m-2' /></li>
              <li>Click the "Install App" option.</li>
              <li>Click OK on the installation prompt.</li>
            </ol>
          </AccordionBody>
        </Accordion>
        <Accordion>
          <AccordionHeader className='!text-[#003e66] !font-semibold'>Installing from Safari</AccordionHeader>
          <AccordionBody className='!text-[#003e66]'>
            <ol type='1' className='list-decimal mx-4'>
              <li>Open browser settings. <img src={safariSettingsIcon} className='w-6 m-2' /></li>
              <li>Click the "Add to Dock" option for desktop, or the "Add to Home Screen" for mobile.</li>
            </ol>
          </AccordionBody>
        </Accordion>
      </AccordionList>
      <button className={styles.logout} onClick={onClickLogout}>Logout</button>
    </div>
  )
}

export const Settings = () => {
  const { state } = useLocation();

  return (
    <>
      <div
        className={styles.settingsContainer}
        style={state?.transition ? { animation: `.3s ease-out ${state.transition}` } : {}}
      >
        <SwipeNavigation
          onSwipeLeftRoute={'/profile'}
        />
        <div className={styles.settings}>
          <h1>Settings</h1>
        </div>
        <SettingsContent />
      </div >
      <MenuBar menuIndex={4} />
    </>
  )
}