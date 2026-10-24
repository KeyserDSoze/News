import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';
import { registerPwa } from './pwa';
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
if(import.meta.env.PROD) registerPwa();
