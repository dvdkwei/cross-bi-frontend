import { useEffect, useState } from 'react';
import appIcon from '../assets/app-icon.png';
import styles from '../styles/components/InstallPrompt.module.css'
import { useCookie } from '../hooks/useCookie';

interface BeforeInstallPromptEvent extends Event {
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;

  prompt(): Promise<void>;
}

export const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const { value, persistCookie } = useCookie('cb_install_prompt');

  const onClickClose = () => {
    const expiryDate = new Date();
    const offset = expiryDate.getTimezoneOffset() * -1;
    expiryDate.setUTCMinutes(expiryDate.getUTCMinutes() + offset);
    expiryDate.setUTCHours(expiryDate.getUTCHours() + 72);
    persistCookie('dismissed', { secure: 'Secure', sameSite: 'Strict', expires: expiryDate });
    setShowPrompt(false);
  }

  const onClickInstall = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;

    if (outcome == 'accepted') {
      persistCookie(outcome, { secure: 'Secure', sameSite: 'Strict' });
      setShowPrompt(false);
    }
    else {
      onClickClose();
    }
  }

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if ((value && value == 'dismissed') || isStandalone) return;

    const isChrome = navigator.userAgent.indexOf('Chrome') > -1;

    if (isChrome) {
      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        setInstallPrompt(event as BeforeInstallPromptEvent);
      });
    }

    setShowPrompt(true);

  }, [value]);

  if (!showPrompt) return <></>;

  return (
    <div className={styles.promptContainer}>
      <img className='w-[44px] h-[44px] rounded-md' src={appIcon} />
      <div className='flex flex-col flex-wrap break-words wrap'>
        <h2 className='font-bold text-[16px]'>Get the app on your phone</h2>
        <p className='text-[14px]'>Offline mode, notifications and more!</p>
      </div>
      <div className='flex flex-col h-[70px] text-[14px] justify-around'>
        <button
          className='font-bold'
          onClick={onClickInstall}
        >
          Install
        </button>
        <button
          className='font-bold text-rose-600'
          onClick={onClickClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}