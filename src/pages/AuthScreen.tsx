import { useState } from 'react';
import { Login } from '../components/Login';
import styles from '../styles/pages/AuthScreenStyle.module.css';
import { Register } from '../components/Register';

export function AuthScreen() {

  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setisOpenRegister] = useState(false);

  const toggleLoginRegister = () => {
    setIsOpenLogin(isOpenLogin => !isOpenLogin);
    setisOpenRegister(isOpenRegister => !isOpenRegister);
  }

  return (
    <div className={`${styles.auth}`}>
      <div className={`${styles.welcomeTextContainer}`}>
        <h1>Monitor.</h1>
        <h1>Enhance.</h1>
        <h1>Made Easy.</h1>
      </div>
      <div className={`${styles.actions}`}>
        <button className='dark-button' onClick={() => setIsOpenLogin(isOpenLogin => !isOpenLogin)}>
          Let's Go
        </button>
        {/* <a>or register</a> */}
      </div>
      {
        isOpenLogin &&
        <Login 
          register={toggleLoginRegister}
        />
      }
      {
        isOpenRegister && 
        <Register login={toggleLoginRegister} />
      }
    </div>
  )
}