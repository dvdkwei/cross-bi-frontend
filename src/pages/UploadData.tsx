import { MenuBar } from '../components/MenuBar'
import uploadIcon from '../assets/icons/file-plus.svg'
import styles from '../styles/pages/UploadData.module.css'
import { SyntheticEvent, useRef, useState } from 'react'
import { useToast } from '../hooks/useToast'
import { ToastProviderValue } from '../contexts/ToastContext'

const UploadForm = ({ callback }: { callback: React.Dispatch<React.SetStateAction<File | undefined>> }) => {
  const { addToast } = useToast() as ToastProviderValue;
  
  const onChangeInputFile = (event: SyntheticEvent) => {
    const files = (event.target as HTMLInputElement).files as FileList;
    const allowedFileTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    if (files.length) {
      if(!allowedFileTypes.includes(files[0].type)){
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
      <img src={uploadIcon} loading='lazy' />
      <h2>Upload CSV/Excel File</h2>
    </form>
  )
}

export const UploadData = () => {
  const newDahsboardTitle = useRef<string>('');
  const [currentFile, setCurrentFile] = useState<File | undefined>(undefined);

  const getFileSizeInMB = (size: number) => {
    return ((size / (1024 * 1024)).toFixed(2)).toString();
  }

  const removeFile = () => setCurrentFile(undefined);

  const onChangeNewDashboardTitle = (event: SyntheticEvent) => {
    newDahsboardTitle.current = (event.target as HTMLInputElement).value;
  }

  const removeFileNamePostfix = (fileName: string) => {
    return fileName.slice(0, fileName.indexOf('.'));
  }

  return (
    <div className={styles.uploadDataContainer}>
      <div className={styles.uploadHeader}>
        <h1>Upload Data</h1>
      </div>
      <div className={styles.upload}>
        {
          currentFile ?
            <div className={styles.fileUploaded}>
              <div className={`${styles.fileInfo} flex flex-col w-full`}>
                <h2 className='text-black'>You've uploaded ✅:</h2>
                <h3>{currentFile.name}&nbsp;&nbsp;&nbsp;{getFileSizeInMB(currentFile.size)}MB</h3>
              </div>
              <div className='flex flex-col w-full'>
                <h2 className='text-[3.2rem] mt-20 font-semibold'>Dashboard Name:</h2>
                <input 
                  placeholder={'e.g. ' + removeFileNamePostfix(currentFile.name)} 
                  className={styles.dashboardName} 
                  type='text' 
                  onChange={onChangeNewDashboardTitle}
                />
              </div>
              <div className={styles.actions}>
                <button className='dark-button font-bold'>
                  Add Dashboard
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
      <MenuBar />
    </div>
  )
}