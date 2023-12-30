import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthScreen } from './pages/AuthScreen'
import { useEffect } from 'react'
import { RouteProtector } from './components/RouteProtector'
import { Workspace } from './pages/Workspace';
import { Settings } from './pages/Settings';
import { Incidents } from './pages/Incidents';
import { UploadData } from './pages/UploadData';
import { Profile } from './pages/Profile';
import { EditView } from './pages/EditView';
import { AddView } from './pages/AddView';

function App() {

  useEffect(() => {
    if (!matchMedia("(display-mode: browser)").matches) {
      window.moveTo(16, 16);
      window.resizeTo(500, 844);
    }
  }, []);

  return (
    <Routes>
      <Route path='/login' element={<AuthScreen />} />

      <Route element={<RouteProtector />}>
        <Route path='/' element={<Navigate to='/my-workspace' />} />
        <Route path='/*' element={<Navigate to='/my-workspace' />} />
        <Route path='/my-workspace' element={<Workspace />} />
        <Route path='/incidents' element={<Incidents />} />
        <Route path='/upload' element={<UploadData />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/edit/:diagrammType/:viewId' element={<EditView />} />
        <Route path='/add' element={<AddView />} />
      </Route>
    </Routes>
  )
}

export default App;
