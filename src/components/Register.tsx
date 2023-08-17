import { SyntheticEvent, useRef } from 'react';
import styles from '../styles/components/LoginStyle.module.css';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import { Loader } from './Loader';
import { AuthProviderValue } from '../types/AuthTypes';
import { ToastProviderValue } from '../types/ToastTypes';

export function Register({login} : {login: () => void}) {
  const email = useRef<string>('');
  const pass = useRef<string>('');
  const secondpass = useRef<string>('');
  const { addToast } = useToast() as ToastProviderValue;
  const { isLoading, handleRegister } = useAuth() as AuthProviderValue;

  const onChangeEmail = (event: SyntheticEvent) => {
    email.current = (event.target as HTMLInputElement).value;
  }

  const onChangePassword = (event: SyntheticEvent) => {
    pass.current = (event.target as HTMLInputElement).value;
  }

  const onChangeSecondPassword = (event: SyntheticEvent) => {
    secondpass.current = (event.target as HTMLInputElement).value;
  }

  const register = () => {
    const emailValue = email.current;
    const passValue = pass.current;
    const secondPassValue = secondpass.current;

    if(!emailValue || !passValue || !secondPassValue){
      addToast({message: 'Please fill all the required fields', timeout: 3000, style: 'toast-error'});
      return;
    }
    if(passValue != secondPassValue){
      addToast({message: 'Both Password and Repeat Password have to be same', timeout: 3000, style: 'toast-error'});
      return;
    }
    handleRegister({ 
      email: emailValue, 
      password: passValue, 
      username: null,
      company: null,
      forename: null,
      surname: null
    });
  }

  return (
    <div className={`${styles.login}`}>
      <div className={`${styles.loginWrapper}`}>
        <div className={`${styles.loginInputs}`}>
          <div className={'gesture-line'}></div>
          <h1>Join the Unimaginable!</h1>
          <div className={`${styles.inputs}`}>
            <div className='input'>
              <p>Email</p>
              <input type='text' onChange={onChangeEmail}/>
            </div>
            <div className='input'>
              <p>Password</p>
              <input type='password' onChange={onChangePassword}/>
            </div>
            <div className='input'>
              <p>Repeat Password</p>
              <input type='password' onChange={onChangeSecondPassword}/>
            </div>
          </div>
        </div>
        <div className={`${styles.actions}`}>
          <button className='light-button' onClick={register}>
            {isLoading ? <Loader /> : 'Register'}
          </button>
          <a onClick={() => login()}>or log in</a>
        </div>
      </div>
    </div>
  )
}