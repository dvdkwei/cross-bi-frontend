import styles from '../styles/components/MenuBar.module.css';
import settingIcon from '../assets/icons/settings.svg';
import dashboardIcon from '../assets/icons/layout.svg';
import uploadIcon from '../assets/icons/plus.svg';
import profileIcon from '../assets/icons/user.svg';
import incidentIcon from '../assets/icons/incident.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const MenuBar = ({ menuIndex }: { menuIndex: number }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const pages = ['/my-workspace', '/incidents', '/upload', '/profile', '/settings'];
  const titles = ['Dashboard', 'Incidents', 'Upload', 'Profile', 'Settings'];
  const icons = [
    dashboardIcon,
    incidentIcon,
    uploadIcon,
    profileIcon,
    settingIcon,
  ];
  const navigate = useNavigate();

  const onClickMenuIcons = (index: number) => {
    navigate(pages[index], { replace: true });
  }

  useEffect(() => {
    const setOffline = () => setIsOnline(false);
    const setOnline = () => setIsOnline(true);

    window.addEventListener('offline', setOffline);
    window.addEventListener('online', setOnline);

    // cleanup if we unmount
    return () => {
      window.removeEventListener('offline', setOffline);
      window.removeEventListener('online', setOnline);
    }
  }, []);


  return (
    <div className={styles.menuBarContainer}>
      <div className={styles.menuBar}>
        {
          icons.map((icon, index) => {
            return (
              <div
                key={'ic-' + index}
                className={`flex flex-col h-full gap-2 justify-center items-center`}
                onClick={() => onClickMenuIcons(index)}
              >
                <img
                  src={icon}
                  className={`${menuIndex === index ? '!opacity-100' : ''}`}
                />
                <p className='text-[8px] font-semibold'>{titles[index]}</p>
              </div>
            )
          })
        }
      </div>
      {
        !isOnline &&
        <div className='text-[11px] bg-red-700 w-full flex justify-center'>
        Offline Mode
        </div>
      }
    </div>
  )
}