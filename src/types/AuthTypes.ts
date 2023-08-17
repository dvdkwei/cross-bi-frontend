export type LoginData = {
  email: string,
  password: string
}

export type registerData = {
  email: string,
  password: string,
  username: string | null,
  company: string | null,
  forename: string | null,
  surname: string | null,
}

export type AuthProviderValue = {
  isLoading: boolean,
  isAuthenticated: boolean,
  handleLogin: (loginData: LoginData) => void,
  handleLogout: () => void
  handleRegister: (registerData: registerData) => void,
}