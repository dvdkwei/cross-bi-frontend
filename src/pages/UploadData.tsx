import { MenuBar } from '../components/MenuBar';
import uploadIcon from '../assets/icons/file-plus.svg';
import styles from '../styles/pages/UploadData.module.css';
import { SyntheticEvent, useState } from 'react';
import { useToastContext } from '../hooks/useToastContext';
import { ToastProviderValue } from '../types/ToastTypes';
import { SwipeNavigation } from '../components/SwipeNavigation';
import { useLocation } from 'react-router-dom';
import { useFormData } from '../hooks/useFormData';
import { Loader } from '../components/Loader';

const UploadForm = ({ callback }: { callback: React.Dispatch<React.SetStateAction<File | undefined>> }) => {
  const { addToast } = useToastContext() as ToastProviderValue;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onChangeInputFile = (event: SyntheticEvent) => {
    const files = (event.target as HTMLInputElement).files as FileList;
    const allowedFileTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    if (files.length) {
      if (!allowedFileTypes.includes(files[0].type)) {
        addToast({
          message: 'The app currently accepts csv or excel files. No file uploaded.',
          timeout: 3000,
          style: 'toast-warning'
        });
        return;
      }
      callback(files[0]);
    }
  }

  return (
    <form className={styles.uploadForm}>
      <input type='file' accept='.csv, .xlsx' onChange={onChangeInputFile} />
      <img
        src={uploadIcon}
        className={isLoading ? 'none' : 'flex'}
        onLoad={() => setIsLoading(false)}
      />
      <h2>Upload CSV/Excel File</h2>
    </form>
  )
}

export const UploadData = () => {
  const [currentFile, setCurrentFile] = useState<File | undefined>(undefined);
  const { addToast } = useToastContext() as ToastProviderValue;
  const { state } = useLocation();
  const { upload, isLoading } = useFormData();

  const getFileSizeInMB = (size: number) => {
    return ((size / (1024 * 1024)).toFixed(2)).toString();
  }

  const removeFile = () => setCurrentFile(undefined);

  const onUploadFile = async () => {
    if(!currentFile){
      addToast({
        message: 'Somethings wrong with the file 😕, please re-upload.',
        timeout: 3000,
        style: 'toast-error'
      });
      return;
    }

    await upload(currentFile);
    setCurrentFile(undefined);
  }

  return (
    <>
      <div
        className={styles.uploadDataContainer}
        style={state?.transition ? { animation: `.3s ease-out ${state.transition}` } : {}}
      >
        <SwipeNavigation
          onSwipeLeftRoute={'/incidents'}
          onSwipeRightRoute={'/profile'}
        />
        <div className={styles.uploadHeader}>
          <h1>Upload Data</h1>
        </div>
        <div className={styles.upload}>
          {
            currentFile ?
              <div className={styles.fileUploaded}>
                <div className={`${styles.fileInfo} flex flex-col w-full`}>
                  <h2>File:</h2>
                  <h3>{currentFile.name}&nbsp;&nbsp;&nbsp;{getFileSizeInMB(currentFile.size)}MB</h3>
                </div>
                <div className={styles.actions}>
                  <button className='dark-button font-bold' onClick={onUploadFile}>
                    {isLoading ? <Loader /> : 'Upload'}
                  </button>
                  <button className='light-button' onClick={removeFile}>
                    Change File
                  </button>
                </div>
              </div>
              :
              <UploadForm callback={setCurrentFile} />
          }
        </div>
      </div>
      <MenuBar menuIndex={2} />
    </>
  )
}