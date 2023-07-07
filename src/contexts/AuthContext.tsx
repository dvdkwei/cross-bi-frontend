import { ReactElement, createContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }: { children: ReactElement}){
  const [token, setToken] = useState(null);

  // const handleLogin = () => undefined;

  // const handleLogout = () => undefined;

  return (
    <AuthContext.Provider value={token}>
      {children}
    </AuthContext.Provider>
  )
}