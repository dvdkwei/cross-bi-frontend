import styles from '../styles/components/NotificationSwitch.module.css';
import bellOff from '../assets/icons/bell-off.svg';

export const NotificationSwitch = () => {
  return (
    <div className={styles.notificationSwitch}>
      <input type="checkbox" id="switch" className={styles.switch} />
      <label htmlFor="switch">
        <img src={bellOff} />
      </label>
    </div>
  )
}