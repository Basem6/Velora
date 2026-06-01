import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import '@fontsource/material-symbols-outlined';
import '@fontsource-variable/inter';
import '@fontsource-variable/rubik';
import './index.css'
import App from './App.jsx'
import ScrollToTop from './Components/ScrollTotop.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ScrollToTop/>
        <App />
    </BrowserRouter>
  </StrictMode>
  
)
