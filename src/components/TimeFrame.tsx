import { useRef } from 'react';
import styles from '../styles/components/TimeFrame.module.css';

type TimeFrameProps = {
  fromDate: string, 
  toDate: string,
  fromDateHandler: (event: React.SyntheticEvent<Element, Event>) => void,
  toDateHandler: (event: React.SyntheticEvent<Element, Event>) => void
}

export const TimeFrame = ({ 
  fromDate, 
  toDate, 
  fromDateHandler, 
  toDateHandler 
}: TimeFrameProps) => {
  const fromDateInput = useRef<HTMLInputElement>(null);
  const toDateInput = useRef<HTMLInputElement>(null);

  const getMaxFromDate = (): string => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 1);
    return maxDate.toISOString().split('T')[0];
  }

  const getMaxToDate = (): string => {
    return new Date().toISOString().split('T')[0];
  }

  const onClickFromDate = () => {
    fromDateInput.current?.showPicker();
  }
  
  const onClickToDate = () => {
    toDateInput.current?.showPicker();
  }

  return (
    <div className={`${styles.dateContainer} ${styles.showDateContainer}`}>
      <div className={styles.dateMask} onClick={onClickFromDate}>
        <p>{fromDate ? fromDate : 'From Date'}</p>
        <input
          type='date'
          onChange={fromDateHandler}
          max={getMaxFromDate()}
          ref={fromDateInput}
        />
      </div>
      <div className={styles.dateMask} onClick={onClickToDate}>
        <p>{toDate ? toDate : 'To Date'}</p>
        <input type='date'
          onChange={toDateHandler}
          max={getMaxToDate()}
          ref={toDateInput}
        />
      </div>
    </div>
  )
}