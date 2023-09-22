import { SyntheticEvent, useEffect, useState } from 'react';
import { MenuBar } from '../components/MenuBar';
import styles from '../styles/pages/Incidents.module.css';
import { TimeFrame } from '../components/TimeFrame';
import { Incident, useIncidents } from '../hooks/useIncidents';
import { Loader } from '../components/Loader';
import { Callout, Color } from '@tremor/react';
import alertIcon from '../assets/icons/alert-octagon.svg';
import inProgressIcon from '../assets/icons/tool.svg';
import resolvedIcon from '../assets/icons/check.svg';
import { IncidentStatuses } from '../enums';

const imgAlertIcon = (stringIcon: string) => {
  return <img className='w-[18px] self-center mr-4' src={stringIcon} />
};

const MappedIncidents = ({ incidents }: { incidents: Incident[] }) => {
  return (
    <>
      {
        incidents.map((incident, index) => {
          let color: Color;
          let icon: string;

          switch(incident.status){
            case IncidentStatuses.NEW: color = 'rose'; icon = alertIcon; break;
            case IncidentStatuses.SORTED: color = 'yellow'; icon = inProgressIcon; break;
            case IncidentStatuses.RESOLVED: color = 'green'; icon = resolvedIcon; break;
            default: color = 'rose'; icon = alertIcon;
          }

          return (
            <Callout
              key={'inc-' + index}
              title={incident.title}
              color={color}
              className={`w-[95%] !rounded-xl py-2 [&>div>h4]:!text-[18px] ${styles.cards}`}
              icon={() => imgAlertIcon(icon)}
            >
              {incident.timestamp.toString()}<br />
              {incident.description}
            </Callout>
          )
        })
      }
    </>
  )
}

export const Incidents = ({ incidents }: {incidents: Incident[]}) => {
  const [showDate, setShowDate] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<IncidentStatuses | undefined>(undefined);
  const [sortedIncidents, setSortedIncidents] = useState<Incident[]>([])
  const { isLoading } = useIncidents();

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

  const onClickNewButton = () => {
    if(filterStatus == IncidentStatuses.NEW){
      setFilterStatus(undefined);
      return;
    }
    setFilterStatus(IncidentStatuses.NEW);
  }

  const onClickSortedButton = () => {
    if(filterStatus == IncidentStatuses.SORTED){
      setFilterStatus(undefined);
      return;
    }
    setFilterStatus(IncidentStatuses.SORTED);
  }

  const onClickResolvedButton = () => {
    if(filterStatus == IncidentStatuses.RESOLVED){
      setFilterStatus(undefined);
      return;
    }
    setFilterStatus(IncidentStatuses.RESOLVED);
  }

  useEffect(() => {
    if(filterStatus === undefined){
      setSortedIncidents(incidents);
      return;
    }
    setSortedIncidents(incidents.filter(incident => incident.status === filterStatus));
  }, [filterStatus, incidents]);

  useEffect(() => {
    setSortedIncidents(incidents);
  }, [incidents])

  return (
    <div className={styles.incidentsContainer}>
      <div className={styles.incidentsHeader}>
        <h1>Incidents ⚡️</h1>
        <button
          className='dark-button w-auto h-auto text-[16px] !px-10'
          onClick={onClickFilter}
        >
          Filter 〒
        </button>
      </div>
      <div className={`flex flex-row mb-4 gap-2 w-[95%] ${styles.incidentsFilter}`}>
        <button 
          onClick={onClickNewButton}
          className={filterStatus === IncidentStatuses.NEW ? 'dark-button' : 'light-button'}
        >
          New
        </button>
        <button 
          onClick={onClickSortedButton}
          className={filterStatus === IncidentStatuses.SORTED ? 'dark-button' : 'light-button'}
        >
          Sorted
        </button>
        <button 
          onClick={onClickResolvedButton}
          className={filterStatus === IncidentStatuses.RESOLVED ? 'dark-button' : 'light-button'}
        >
          Resolved
        </button>
      </div>
      {
        isLoading ?
          <Loader />
          :
          <MappedIncidents incidents={sortedIncidents} />
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
      <MenuBar menuIndex={1} />
    </div>
  )
}