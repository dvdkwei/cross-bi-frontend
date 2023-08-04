import styles from '../styles/components/DashboardPicker.module.css'

export const DashboardPicker = () => {

  // useDashboard

  return(
    <div className={styles.overlay}>
      <div className={styles.dashboardTitles}>
        {
          ['Sales', 'Operations', 'Servers'].map((title, index) => {
            return(
              <button key={`dt-${index}`}>
                { title }
              </button>
            );
          })
        }
      </div>
    </div>
  )
}