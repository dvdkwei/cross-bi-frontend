// import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AuthScreen } from './pages/AuthScreen'
import { useEffect } from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthScreen />
  }
])

function App() {

  useEffect(() => {
    if(!matchMedia("(display-mode: browser)").matches){
      window.moveTo(16, 16);
      window.resizeTo(500, 844);
    }
  }, [])

  return (
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App;
