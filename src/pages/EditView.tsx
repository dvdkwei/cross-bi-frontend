import { MenuBar } from '../components/MenuBar';
import { DiagrammTypes } from '../enums';
import styles from '../styles/pages/EditView.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDiagrammData } from '../hooks/useDiagrammData';
import { Loader } from '../components/Loader';
import { useAggregateData } from '../hooks/useAggregateData';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useView } from '../hooks/useView';
import chevron from '../assets/icons/chevron-left.svg';
import { useToastContext } from '../hooks/useToastContext';
import { ToastProviderValue } from '../types/ToastTypes';
import { ButtonLoader } from '../components/ButtonLoader';
import { useDashboardContext } from '../hooks/useDashboardContext';
import { DashboardProviderValue } from '../types/DashboardTypes';
import { BigNumber } from '../components/BigNumber';
import { BarDiagramm } from '../components/BarDiagramm';
import { LineDiagramm } from '../components/LineDiagramm';
import { ListDiagramm } from '../components/ListDiagramm';
import { DonutDiagramm } from '../components/DonutDiagramm';
import { MapChart } from '../components/MapChart';

type EditFormProps = {
  diagrammType: DiagrammTypes,
  viewId: number,
}

export const EditPreview = ({ diagrammType, viewId }: EditFormProps) => {
  return (
    <div className='w-[90%] mt-4 mb-2'>
      {
        (() => {
          switch (diagrammType) {
            case DiagrammTypes.BIGNUMBER: return <BigNumber viewId={viewId} currency='EUR' />
            case DiagrammTypes.BAR: return <BarDiagramm viewId={viewId} />
            case DiagrammTypes.LINE: return <LineDiagramm viewId={viewId} />
            case DiagrammTypes.LIST: return <ListDiagramm viewId={viewId} />
            case DiagrammTypes.DONUT: return <DonutDiagramm viewId={viewId} />
            case DiagrammTypes.MAP: return <MapChart viewId={viewId} />
            default: return <></>
          }
        })()
      }
    </div>
  )
}

const EditForm = ({ diagrammType, viewId }: EditFormProps) => {
  const { isLoading: isLoadingDiagrammData, title } = useDiagrammData(viewId);
  const { view, updateView } = useView(viewId);
  const { isLoading: isLoadingDashboard, pickedDashboard, dashboards } = useDashboardContext() as DashboardProviderValue;
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDashboardId, setNewDashboardId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { addToast } = useToastContext() as ToastProviderValue;
  const navigate = useNavigate();

  const onChangeTitle = (event: SyntheticEvent) => {
    setNewTitle((event.target as HTMLInputElement).value);
  }

  const onChangeDashboard = (event: SyntheticEvent) => {
    setNewDashboardId((event.target as HTMLInputElement).value);
  }

  const onClickSaveSettings = () => {
    if (!newTitle) {
      addToast({
        message: 'Title can not be empty',
        style: 'toast-warning',
        timeout: 4000
      });
      return;
    }
    if (view) {
      setIsLoading(true);
      updateView({
        id: viewId,
        name: view.name,
        updated_at: new Date(),
        dashboard_id: Number(newDashboardId),
        workspace_id: view.workspace_id,
        diagramm_type: view.diagramm_type,
        x_axis: view.x_axis,
        y_axis: view.y_axis,
        title: newTitle,
        categories: view.categories,
        aggregate: view.aggregate
      })
        .then(() => navigate(-1))
        .finally(() => setIsLoading(false));
    }
  }

  useEffect(() => {
    if (title) {
      setNewTitle(title);
    }
  }, [title]);

  useEffect(() => {
    if (pickedDashboard) {
      setNewDashboardId(pickedDashboard.id);
    }
  }, [pickedDashboard]);

  useEffect(() => {
    if (!isLoadingDiagrammData && !isLoadingDashboard) {
      setIsLoading(false);
    }
  }, [isLoadingDashboard, isLoadingDiagrammData])

  if (isLoadingDiagrammData || isLoadingDashboard) {
    return (
      <div className='flex h-[100vh] items-center'>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <form className={styles.editForm}>
        <div className='flex flex-col w-full'>
          <label htmlFor='title'>Title</label>
          <input type='text' defaultValue={title} id='title' onChange={onChangeTitle} />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <label htmlFor='dashboard'>Dashboard</label>
          <select
            defaultValue={newDashboardId}
            id='dashboard'
            onChange={onChangeDashboard}
          >
            {
              dashboards.length > 0 &&
              dashboards.map((dashboard, index) => {
                return (
                  <option key={'db-' + index} value={dashboard.id}>
                    {dashboard.name}
                  </option>
                )
              })
            }
          </select>
        </div>
      </form>
      <EditPreview
        diagrammType={diagrammType}
        viewId={viewId}
      />
      <div className='flex flex-col w-[90%] gap-2 mt-4'>
        <button className={styles.saveButton} onClick={onClickSaveSettings}>
          {isLoading ? <ButtonLoader /> : 'Save Settings'}
        </button>
        <button className={styles.deleteButton}>Delete</button>
      </div>
    </>
  )
}

const EditAggregateForm = ({ diagrammType, viewId }: EditFormProps) => {
  const { title, isLoading: isLoadingDiagrammData, aggregateStrategy } = useAggregateData(viewId);
  const { view, updateView } = useView(viewId);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newAggregateStrategy, setNewAggregateStrategy] = useState<string>('');
  const [newDashboardId, setNewDashboardId] = useState<string>('');
  const { isLoading: isLoadingDashboard, pickedDashboard, dashboards } = useDashboardContext() as DashboardProviderValue;
  const { addToast } = useToastContext() as ToastProviderValue;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const onChangeTitle = (event: SyntheticEvent) => {
    setNewTitle((event.target as HTMLInputElement).value);
  }

  const onChangeAggregateStrategy = (event: SyntheticEvent) => {
    setNewAggregateStrategy((event.target as HTMLSelectElement).value);
  }

  const onChangeDashboard = (event: SyntheticEvent) => {
    setNewDashboardId((event.target as HTMLInputElement).value);
  }

  const onClickSaveSettings = () => {
    if (!newTitle) {
      addToast({
        message: 'Title can not be empty',
        style: 'toast-warning',
        timeout: 4000
      });
      return;
    }
    if (view) {
      setIsLoading(true)
      updateView({
        id: viewId,
        name: view.name,
        updated_at: new Date(),
        dashboard_id: Number(newDashboardId),
        workspace_id: view.workspace_id,
        diagramm_type: view.diagramm_type,
        x_axis: view.x_axis,
        y_axis: view.y_axis,
        title: newTitle,
        categories: view.categories,
        aggregate: newAggregateStrategy
      })
        .then(() => navigate(-1))
        .finally(() => setIsLoading(false));
    }
  }

  useEffect(() => {
    if (aggregateStrategy) {
      setNewAggregateStrategy(aggregateStrategy)
    }
  }, [aggregateStrategy]);

  useEffect(() => {
    if (title) {
      setNewTitle(title);
    }
  }, [title]);

  useEffect(() => {
    if (pickedDashboard) {
      setNewDashboardId(pickedDashboard.id);
    }
  }, [pickedDashboard]);

  useEffect(() => {
    if (!isLoadingDiagrammData && !isLoadingDashboard) {
      setIsLoading(false);
    }
  }, [isLoadingDashboard, isLoadingDiagrammData])

  if (isLoadingDiagrammData || isLoadingDashboard) {
    return (
      <div className='flex h-[100vh] items-center'>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <form className={styles.editForm}>
        <div className='flex flex-col w-full gap-2'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            defaultValue={title}
            id='title'
            onChange={onChangeTitle}
          />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <label htmlFor='dashboard'>Dashboard</label>
          <select
            defaultValue={newDashboardId}
            id='dashboard'
            onChange={onChangeDashboard}
          >
            {
              dashboards.length > 0 &&
              dashboards.map((dashboard, index) => {
                return (
                  <option key={'db-' + index} value={dashboard.id}>
                    {dashboard.name}
                  </option>
                )
              })
            }
          </select>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <label htmlFor='aggregate'>Aggregate Method</label>
          <select
            defaultValue={aggregateStrategy}
            id='aggregate'
            onChange={onChangeAggregateStrategy}
          >
            <option value={'sum'}>Sum</option>
            <option value={'count'}>Count</option>
            <option value={'avg'}>Average</option>
            <option value={'max'}>Maximum</option>
            <option value={'min'}>Minimum</option>
          </select>
        </div>
      </form>
      <EditPreview
        diagrammType={diagrammType}
        viewId={viewId}
      />
      <div className='flex flex-col w-[90%] gap-2 mt-4'>
        <button className={styles.saveButton} onClick={onClickSaveSettings}>
          {isLoading ? <ButtonLoader /> : 'Save Settings'}
        </button>
        <button className={styles.deleteButton}>Delete</button>
      </div>
    </>
  )
}

export const EditView = () => {
  const { diagrammType, viewId } = useParams();
  const navigate = useNavigate();

  return (
    <div className={styles.editContainer}>
      <h1 className={styles.editTitle}>
        <img src={chevron} className='w-6 cursor-pointer' onClick={() => navigate(-1)} />
        View Settings
      </h1>
      <div className='flex flex-col w-full overflow-auto items-center min-h-[100vh] mt-[52px]'>
        {
          Number(diagrammType) === DiagrammTypes.BIGNUMBER ?
            <EditAggregateForm
              diagrammType={Number(diagrammType)}
              viewId={Number(viewId)}
            />
            :
            <EditForm
              diagrammType={Number(diagrammType)}
              viewId={Number(viewId)}
            />
        }
      </div>
      <MenuBar menuIndex={0} />
    </div>
  )
}