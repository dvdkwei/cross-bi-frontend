import { AuthProviderValue } from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth"

export const Workspace = () => {
  const { handleLogout } = useAuth() as AuthProviderValue;
  return (
    <>
      <button onClick={() => handleLogout()}>LOGOUT</button>
    </>
  )
}