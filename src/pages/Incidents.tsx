import { SyntheticEvent, useState } from 'react';
import { MenuBar } from '../components/MenuBar';
import styles from '../styles/pages/Incidents.module.css';

export const Incidents = () => {
  const [showDate, setShowDate] = useState(false);
  const [fromDate, setFromDate] = useState<string | undefined>(undefined);
  const [toDate, setToDate] = useState<string | undefined>(undefined);

  const onChangeFromDate = (event: SyntheticEvent) => {
    setFromDate((event.target as HTMLInputElement).value);
  }

  const onChangeToDate = (event: SyntheticEvent) => {
    setToDate((event.target as HTMLInputElement).value);
  }

  const getMaxFromDate = (): string => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 1);
    return maxDate.toISOString().split('T')[0];
  }

  const getMaxToDate = (): string => {
    return new Date().toISOString().split('T')[0];
  }

  const onClickFilter = () => {
    if (fromDate || toDate) {
      return;
    }
    setShowDate(showDate => !showDate);
  }

  return (
    <div className={styles.incidentsContainer}>
      <div className={styles.incidentsHeader}>
        <h1>Incidents ⚡️</h1>
        <button
          className='dark-button w-auto h-fit text-[2.2rem] !px-10'
          onClick={onClickFilter}
        >
          Filter 〒
        </button>
      </div>
      {showDate &&
        <div className={styles.dateContainer}>
          <div className={styles.dateMask}>
            <p>{fromDate ? fromDate : 'From Date'}</p>
            <input
              type='date'
              onChange={onChangeFromDate}
              max={getMaxFromDate()}
            />
          </div>
          <div className={styles.dateMask}>
            <p>{toDate ? toDate : 'To Date'}</p>
            <input type='date'
              onChange={onChangeToDate} 
              max={getMaxToDate()} 
            />
          </div>
        </div>
      }
      <MenuBar menuIndex={1}/>
    </div>
  )
}