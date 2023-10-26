import { useToastContext } from '../hooks/useToastContext';
import styles from '../styles/components/NotificationSwitch.module.css';
import { ToastProviderValue } from '../types/ToastTypes';
import ico from '../assets/app-icon.png';

export const NotificationSwitch = () => {

  const { addToast } = useToastContext() as ToastProviderValue;

  const onClickNotif = () => {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      addToast({message: "This browser does not support desktop notification", timeout: 3000, style: 'toast-error'});
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Hi there!", {icon: ico, badge: ico});
      console.log(notification)
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
          // …
        }
      });
    }
  }

  return (
    <div className={styles.notificationSwitch} onClick={onClickNotif}>
      <input type="checkbox" id="switch" className={styles.switch} />
      <label htmlFor="switch"></label>
    </div>
  )
}