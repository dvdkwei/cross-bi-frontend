import { useNavigate } from "react-router-dom";
import chevron from '../assets/icons/chevron-left.svg';
import styles from '../styles/pages/AddView.module.css';
import { SyntheticEvent, useEffect, useState } from "react";
import { DiagrammTypes } from "../enums";
import { BigNumberPreview } from "../components/BigNumberPreview";
import { useViews } from "../hooks/useViews";
import { useColumns } from "../hooks/useColumns";

const AddBigNumberPreview = ({ viewName }: { viewName: string }) => {
  const {isLoading, columns} = useColumns(viewName);
  const [title, setTitle] = useState<string>('');
  // const [valueColumn, setValueColumn] = useState<string>('');

  const onChangeTitle = (event: SyntheticEvent) => {
    setTitle((event.target as HTMLInputElement).value);
  }

  if(isLoading){
    return<></>;
  }

  return (
    <div className={styles.addPreview}>
      <select
        defaultValue={undefined}
      >
        <option value={undefined}>-- Select Column as value</option>
        {
          columns.map((column) => <option key={column} value={column}>{column}</option>)
        }
      </select>
      <select
        defaultValue={undefined}
      >
        <option value={undefined}>-- Select Aggregate Method</option>
        <option value={'sum'}>Sum</option>
        <option value={'count'}>Count</option>
        <option value={'avg'}>Average</option>
        <option value={'max'}>Maximum</option>
        <option value={'min'}>Minimum</option>
      </select>
      <div className='flex flex-col w-full'>
        <label htmlFor='title'>Title</label>
        <input type='text' defaultValue={title} id='title' onChange={onChangeTitle} />
      </div>
      <BigNumberPreview title={title} />
    </div>
  )
}

export const AddView = () => {
  const navigate = useNavigate();
  const { isLoading: isLoadingViews, views } = useViews();
  const [selectedView, setSelectedView] = useState<string>('');
  const [diagrammType, setDiagrammType] = useState<DiagrammTypes | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeSelectView = (event: SyntheticEvent) => {
    const view = (event.target as HTMLSelectElement).value;
    setSelectedView(view);
  }

  const onChangeChooseDiagramm = (event: SyntheticEvent) => {
    const pickedValue = (event.target as HTMLSelectElement).value;
    const pickedValueAsNumber = Number(pickedValue);

    if (!pickedValueAsNumber) {
      setDiagrammType(undefined);
      return;
    }

    setDiagrammType(pickedValueAsNumber as DiagrammTypes);
  }

  useEffect(() => {
    if (!isLoadingViews) {
      setIsLoading(false);
    }
  }, [isLoadingViews]);

  if(isLoading) return <></>;

  return (
    <div className={styles.addContainer}>
      <h1 className={styles.addTitle}>
        <img
          src={chevron}
          className='w-6 cursor-pointer'
          onClick={() => {
            if (window.confirm('Leave this page?')) {
              navigate(-1);
            }
          }}
        />
        Add View
      </h1>
      <div className={styles.addWrapper}>
        <select
          defaultValue={undefined}
          onChange={onChangeSelectView}
        >
          <option value=''>-- Choose View</option>
          {
            !isLoadingViews &&
            views.map((view) => {
              return (
                <option value={view} key={view}>
                  {view}
                </option>
              )
            })
          }
        </select>
        <select
          defaultValue={undefined}
          onChange={onChangeChooseDiagramm}
        >
          <option value={undefined}>-- Choose Diagramm Type</option>
          <option value={DiagrammTypes.BIGNUMBER}>Big Number</option>
          <option value={DiagrammTypes.BAR}>Bar Diagramm</option>
          <option value={DiagrammTypes.LINE}>Line Diagramm</option>
          <option value={DiagrammTypes.DONUT}>Donut Diagramm</option>
          <option value={DiagrammTypes.LIST}>List</option>
        </select>
        {
          diagrammType == DiagrammTypes.BIGNUMBER &&
          selectedView &&
          <AddBigNumberPreview viewName={selectedView} />
        }
      </div>
      {/* <MenuBar menuIndex={0} /> */}
    </div>
  )
}