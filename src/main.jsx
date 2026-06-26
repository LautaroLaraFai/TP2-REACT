import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/pixelatedCorners.css'
import "./i18n.js"
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import Logo from './assets/Logo.svg?url'
import ScrollToTop from "./services/ScrollToTop";
import { AuthProvider } from './context/AuthContext.jsx';

// Interceptor simple
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  try {
    return await originalFetch(...args);
  } catch (error) {
    if (error.message === 'Failed to fetch' && sessionStorage.getItem('redirected') !== 'true' && !window.location.pathname.includes('/api-error')) {
      sessionStorage.setItem('redirected', 'true');
      window.location.href = '/api-error';
    }
    throw error;
  }
};

//! NO ME BORREN ESTO, ES PARA QUE SE VEA EL LOGO EN LA PESTAÑA
const faviconLink = document.createElement('link')
faviconLink.rel = 'icon'
faviconLink.type = 'image/svg+xml'
faviconLink.href = Logo
document.head.appendChild(faviconLink)


createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <BrowserRouter>
        <ScrollToTop />
        <App />
        </BrowserRouter>
    </AuthProvider>
)
