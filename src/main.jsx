import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// PWA service worker ro'yxatdan o'tmoqda
import { registerSW } from 'virtual:pwa-register'
registerSW()

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
