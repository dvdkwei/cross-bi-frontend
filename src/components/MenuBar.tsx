import styles from '../styles/components/MenuBar.module.css';
import settingIcon from '../assets/icons/settings.svg';
import dashboardIcon from '../assets/icons/layout.svg';
import uploadIcon from '../assets/icons/plus.svg';
import profileIcon from '../assets/icons/user.svg';
import incidentIcon from '../assets/icons/incident.svg';
import { useNavigate } from 'react-router-dom';

export const MenuBar = ({menuIndex}: {menuIndex: number}) => {
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

  return (
    <div className={styles.menuBarContainer}>
      <div className={styles.menuBar}>
        {
          icons.map((icon, index) => {
            return (
              <div
                key={'ic-' + index}
                className={`flex flex-col w-[80px] h-full gap-4 justify-center items-center`}
                onClick={() => onClickMenuIcons(index)}
              >
                <img
                  src={icon}
                  className={`${menuIndex === index ? '!opacity-100' : ''}`}
                />
                <p className='text-[1.3rem] font-semibold'>{titles[index]}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}