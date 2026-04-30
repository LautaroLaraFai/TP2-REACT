import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/pixelatedCorners.css'
import "./i18n.js"
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import Logo from './assets/Logo.svg?url'

//! NO ME BORREN ESTO, ES PARA QUE SE VEA EL LOGO EN LA PESTAÑA
const faviconLink = document.createElement('link')
faviconLink.rel = 'icon'
faviconLink.type = 'image/svg+xml'
faviconLink.href = Logo
document.head.appendChild(faviconLink)

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
