import { SyntheticEvent, useState } from 'react';
import { MenuBar } from '../components/MenuBar';
import styles from '../styles/pages/Incidents.module.css';
import { TimeFrame } from '../components/TimeFrame';
import { useIncidents } from '../hooks/useIncidents';
import { Loader } from '../components/Loader';
import { Callout } from '@tremor/react';
import alertIcon from '../assets/icons/alert-octagon.svg';

const imgAlertIcon = () => {
  return <img className='w-[2.2rem] self-center mr-4' src={alertIcon} />
};

export const Incidents = () => {
  const [showDate, setShowDate] = useState(false);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const {isLoading, incidents} = useIncidents();

  const onChangeFromDate = (event: SyntheticEvent) => {
    setFromDate((event.target as HTMLInputElement).value);
  }

  const onChangeToDate = (event: SyntheticEvent) => {
    setToDate((event.target as HTMLInputElement).value);
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
      {
        isLoading ?
          <Loader />
          :
          incidents.map((incident, index) => {
            return (
              <Callout
                key={'inc-' + index}
                title={incident.title}
                color='rose'
                className='w-[90%] !rounded-xl py-6 [&>div>h4]:!text-[2.6rem]'
                icon={() => imgAlertIcon()}
              >
                {incident.description}
              </Callout>
            )
          })
      }
      { 
        showDate && 
        <TimeFrame 
          fromDate={fromDate}
          toDate={fromDate}
          fromDateHandler={onChangeFromDate}
          toDateHandler={onChangeToDate}
        /> 
      }
      <MenuBar menuIndex={1}/>
    </div>
  )
}