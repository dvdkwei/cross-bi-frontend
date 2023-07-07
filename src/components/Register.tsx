import styles from '../styles/components/LoginStyle.module.css';

export function Register({login} : {login: () => void}) {
  return (
    <div className={`${styles.login}`}>
      <div className={`${styles.loginWrapper}`}>
        <div className={`${styles.loginInputs}`}>
          <div className={'gesture-line'}></div>
          <h1>Join the Unimaginable!</h1>
          <div className={`${styles.inputs}`}>
            <div className='input'>
              <p>Email</p>
              <input type='text' />
            </div>
            <div className='input'>
              <p>Password</p>
              <input type='password' />
            </div>
            <div className='input'>
              <p>Repeat Password</p>
              <input type='password' />
            </div>
          </div>
        </div>
        <div className={`${styles.actions}`}>
          <button className='light-button'>Register</button>
          <a onClick={() => login()}>or log in</a>
        </div>
      </div>
    </div>
  )
}