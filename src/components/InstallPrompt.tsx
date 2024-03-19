import { useEffect, useState } from 'react';
import { Button, Dialog, DialogPanel, Title } from "@tremor/react";
import { useCookie } from '../hooks/useCookie';
import { useNavigate } from 'react-router-dom';

export const InstallPrompt = () => {
  const navigate = useNavigate();
  const { persistCookie, getCookieValue } = useCookie('cb_install_prompt');
  const [isInstallDialogOpen, setIsInstallDialogOpen] = useState(false);

  const onClickLater = () => {
    const expiryDate = new Date();
    const offset = expiryDate.getTimezoneOffset() * -1;
    expiryDate.setUTCMinutes(expiryDate.getUTCMinutes() + offset);
    expiryDate.setUTCHours(expiryDate.getUTCHours() + 72);
    persistCookie('dismissed', { secure: 'Secure', sameSite: 'Strict', expires: expiryDate });
    setIsInstallDialogOpen(false);
  }

  const onClickTakeMe = () => {
    onClickLater();
    navigate('/settings');
  }

  useEffect(() => {
    const actualValue = getCookieValue();
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if ((actualValue && actualValue == 'dismissed') || isStandalone) return;

    setTimeout(() => setIsInstallDialogOpen(true), 3000);
  }, [getCookieValue]);

  return (
    <Dialog open={isInstallDialogOpen} onClose={onClickLater} static={true}>
      <DialogPanel>
        <Title>Install App?</Title>
        <p>Let's see how to do it in Settings.</p>
        <div className="flex justify-end mt-2 gap-[.25rem]">
          <Button onClick={onClickLater} variant="secondary">
            Later
          </Button>
          <Button onClick={onClickTakeMe}>
            Take me!
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  )
}