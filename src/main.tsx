import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ToastProvider } from './contexts/ToastContext.tsx'
import { WorkspaceProvider } from './contexts/WorkspaceContext.tsx'
import { DashboardProvider } from './contexts/DashboardContext.tsx'
import { TimeFrameProvider } from './contexts/TimeFrameContext.tsx'
import { UpdateSWProvider } from './contexts/UpdateSWContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UpdateSWProvider>
        <ToastProvider>
          <AuthProvider>
            <WorkspaceProvider>
              <DashboardProvider>
                <TimeFrameProvider>
                  <App />
                </TimeFrameProvider>
              </DashboardProvider>
            </WorkspaceProvider>
          </AuthProvider>
        </ToastProvider>
      </UpdateSWProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
