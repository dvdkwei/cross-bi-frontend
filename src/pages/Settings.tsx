import { MenuBar } from '../components/MenuBar';
import { AuthProviderValue } from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/pages/Settings.module.css';

export const Settings = () => {
  const { handleLogout } = useAuth() as AuthProviderValue;

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settings}>
        <h1>Settings</h1>
        <div className={styles.settingButtons}>
          <p>Dashboards</p>
          <p>How To Install</p>
          <p>About</p>
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>
      <MenuBar />
    </div>
  )
}