import { SyntheticEvent, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/components/LoginStyle.module.css';
import { Loader } from './Loader';
import { AuthProviderValue } from '../types/AuthTypes';

export function Login({ register }: { register: () => void }) {

  const email = useRef<string>('');
  const password = useRef<string>('');
  const { isLoading, handleLogin } = useAuth() as AuthProviderValue;

  const onChangeEmail = (event: SyntheticEvent) => {
    event.preventDefault();
    email.current = (event.target as HTMLInputElement).value
  }

  const onChangePassword = (event: SyntheticEvent) => {
    event.preventDefault();
    password.current = (event.target as HTMLInputElement).value;
  }

  const onClickLogin = () => handleLogin({ email: email.current, password: password.current });

  return (
    <div className={`${styles.login}`}>
      <div className={`${styles.loginWrapper}`}>
        <div className={`${styles.loginInputs}`}>
          <div className={'gesture-line'}></div>
          <h1>Log into your account</h1>
          <div className={`${styles.inputs}`}>
            <div className='input'>
              <p>Email</p>
              <input type='text' onChange={onChangeEmail} />
            </div>
            <div className='input'>
              <p>Password</p>
              <input type='password' onChange={onChangePassword} />
            </div>
            <div className={`${styles.stay}`}>
              <input type='checkbox' />
              <p>Stay logged in</p>
            </div>
          </div>
        </div>
        <div className={`${styles.actions}`}>
          <button className='light-button' onClick={onClickLogin}>
            {isLoading ? <Loader /> : 'Login'}
          </button>
          <a onClick={() => register()}>or register</a>
        </div>
      </div>
    </div>
  )
}