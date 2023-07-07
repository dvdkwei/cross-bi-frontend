import styles from '../styles/components/LoginStyle.module.css';

export function Login( {register} : {register: () => void} ) {
  return (
    <div className={`${styles.login}`}>
      <div className={`${styles.loginWrapper}`}>
        <div className={`${styles.loginInputs}`}>
          <div className={'gesture-line'}></div>
          <h1>Log into your account</h1>
          <div className={`${styles.inputs}`}>
            <div className='input'>
              <p>Email</p>
              <input type='text' />
            </div>
            <div className='input'>
              <p>Password</p>
              <input type='password' />
            </div>
            <div className={`${styles.stay}`}>
              <input type='checkbox' />
              <p>Stay logged in</p>
            </div>
          </div>
        </div>
        <div className={`${styles.actions}`}>
          <button className='light-button' onClick={() => alert('bruh')}>Login</button>
          <a onClick={() => register()}>or register</a>
        </div>
      </div>
    </div>
  )
}