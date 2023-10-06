import styles from '../styles/components/NotificationSwitch.module.css';

export const NotificationSwitch = () => {
  return (
    <div className={styles.notificationSwitch}>
      <input type="checkbox" id="switch" className={styles.switch} />
      <label htmlFor="switch"></label>
    </div>
  )
}