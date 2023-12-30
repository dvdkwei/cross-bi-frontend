import { useEffect, useState } from 'react';
import { MenuBar } from '../components/MenuBar';
import styles from '../styles/pages/Incidents.module.css';
import { useIncidents } from '../hooks/useIncidents';
import { Loader } from '../components/Loader';
import { Callout, Color } from '@tremor/react';
import alertIcon from '../assets/icons/alert-octagon.svg';
import inProgressIcon from '../assets/icons/tool.svg';
import resolvedIcon from '../assets/icons/check.svg';
import { IncidentTypes } from '../enums';
import { NotificationSwitch } from '../components/NotificationSwitch';
import { SwipeNavigation } from '../components/SwipeNavigation';
import { useLocation } from 'react-router-dom';
import { Incident } from '../types/IncidentTypes';

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

          switch (incident.status) {
            case IncidentTypes.NEW: color = 'rose'; icon = alertIcon; break;
            case IncidentTypes.SORTED: color = 'yellow'; icon = inProgressIcon; break;
            case IncidentTypes.RESOLVED: color = 'green'; icon = resolvedIcon; break;
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

export const Incidents = () => {
  const [filterStatus, setFilterStatus] = useState<IncidentTypes | undefined>(undefined);
  const [sortedIncidents, setSortedIncidents] = useState<Incident[]>([])
  const { isLoading, incidents } = useIncidents();
  const { state } = useLocation();

  const onClickNewButton = () => {
    if (filterStatus == IncidentTypes.NEW) {
      setFilterStatus(undefined);
      return;
    }
    setFilterStatus(IncidentTypes.NEW);
  }

  const onClickSortedButton = () => {
    if (filterStatus == IncidentTypes.SORTED) {
      setFilterStatus(undefined);
      return;
    }
    setFilterStatus(IncidentTypes.SORTED);
  }

  const onClickResolvedButton = () => {
    if (filterStatus == IncidentTypes.RESOLVED) {
      setFilterStatus(undefined);
      return;
    }
    setFilterStatus(IncidentTypes.RESOLVED);
  }

  useEffect(() => {
    if (filterStatus === undefined) {
      setSortedIncidents(incidents);
      return;
    }
    setSortedIncidents(incidents.filter(incident => incident.status === filterStatus));
  }, [filterStatus, incidents]);

  useEffect(() => {
    setSortedIncidents(incidents);
  }, [incidents]);

  return (
    <>
      <div 
        className={styles.incidentsContainer}
        style={state?.transition ? { animation: `.3s ease-out ${state.transition}` } : {}}
      >
        <SwipeNavigation
          onSwipeLeftRoute={'/my-workspace'}
          onSwipeRightRoute={'/upload'}
        />
        <div className={styles.incidentsHeader}>
          <h1>Incidents</h1>
          <NotificationSwitch />
        </div>
        <div className={`flex flex-row mb-4 gap-2 w-[95%] ${styles.incidentsFilter}`}>
          <button
            onClick={onClickNewButton}
            className={filterStatus === IncidentTypes.NEW ? 'dark-button' : 'light-button'}
          >
            New
          </button>
          <button
            onClick={onClickSortedButton}
            className={filterStatus === IncidentTypes.SORTED ? 'dark-button' : 'light-button'}
          >
            Sorted
          </button>
          <button
            onClick={onClickResolvedButton}
            className={filterStatus === IncidentTypes.RESOLVED ? 'dark-button' : 'light-button'}
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
      </div>
      <MenuBar menuIndex={1} />
    </>
  )
}