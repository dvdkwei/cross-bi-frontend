// import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthScreen } from './pages/AuthScreen'
import { useEffect } from 'react'
import { RouteProtector } from './components/RouteProtector'
import { Workspace } from './pages/Workspace';

function App() {

  useEffect(() => {
    if (!matchMedia("(display-mode: browser)").matches) {
      window.moveTo(16, 16);
      window.resizeTo(500, 844);
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/my-workspace' />} />
      <Route path='/*' element={<Navigate to='/my-workspace' />} />
      <Route path='/login' element={<AuthScreen />} />

      <Route element={<RouteProtector />}>
        <Route path='/my-workspace' element={<Workspace />} />
      </Route>
    </Routes>
  )
}

export default App;
