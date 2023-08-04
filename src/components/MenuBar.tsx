import styles from '../styles/components/MenuBar.module.css';
import settingIcon from '../assets/icons/settings.svg';
import dashboardIcon from '../assets/icons/layout.svg';
import uploadIcon from '../assets/icons/file-plus.svg';
import profileIcon from '../assets/icons/user.svg';
import incidentIcon from '../assets/icons/incident.svg';
import { useNavigate } from 'react-router-dom';

export const MenuBar = () => {
  const pages = ['/my-workspace', '/upload-data', '/incidents', '/community', '/settings'];
  const navigate = useNavigate();

  const onClickMenuIcons = (index: number) => {
    navigate(pages[index], {replace: true});
  }

  return (
    <div className={styles.menuBarContainer}>
      <div className={styles.menuBar}>
        {
          [
            dashboardIcon,
            uploadIcon,
            incidentIcon,
            profileIcon,
            settingIcon,
          ].map((icon, index) => {
            return (
              <img 
                key={'ic-' + index} 
                src={icon} 
                className='.no-highlight' 
                onClick={() => onClickMenuIcons(index)}
              />
            )
          })
        }
      </div>
    </div>
  )
}