import styles from '../styles/components/DashboardPicker.module.css'

export const DashboardPicker = ({closePicker}: {closePicker: () => void}) => {

  return(
    <div className={styles.overlay} onClick={closePicker}>
      <select className={styles.dashboardTitles}>
        {
          ['Sales', 'Operations', 'Servers'].map((title, index) => {
            return(
              <button key={`dt-${index}`}>
                { title }
              </button>
            );
          })
        }
      </select>
    </div>
  )
}