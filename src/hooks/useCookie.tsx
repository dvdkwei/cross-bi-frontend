import { useCallback, useEffect, useState } from "react";

type CookieOptions = {
  secure?: 'Secure',
  sameSite: 'None' | 'Lax' | 'Strict',
  expires?: Date
}

export function useCookie(key: string) {
  const [value, setValue] = useState<string | boolean>(false);

  const persistCookie = (cookieValue: string, options?: CookieOptions) => {
    setValue(value);
    if (!options) {
      document.cookie = `${key}=${cookieValue}; path=/;`;
      return;
    }
    const { secure, sameSite, expires } = options;

    document.cookie =
      `${key}=${cookieValue}; SameSite=${sameSite}; ${expires ? `expires=${expires.toUTCString()}; ` : ''}${secure ? `${secure}; ` : ''}path=/;`;
  }

  const removeCookie = () => {
    document.cookie = `${key}=${value}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }

  const getCookieValue = useCallback(() => {
    if(!key) return;

    return document.cookie
        .split('; ')
        .find(row => row.startsWith(`${key}=`))
        ?.split('=')[1];
  }, [key])

  useEffect(() => {
    const currentValue: string | boolean = getCookieValue() ?? false;    
    setValue(currentValue);
  }, [getCookieValue]);

  return {
    value,
    persistCookie,
    removeCookie,
    getCookieValue
  }
}