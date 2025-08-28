import React from 'react'
import ReactDom from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom' // 👈 Enables routing
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' // 👈 Main component of our app
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Keep track of the current route and lets us use route-based components (Route, link) */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
