import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {AudioProvider} from './audioPlayer';
import './style.css';
import { registerPwa } from './pwa';
createRoot(document.getElementById('root')!).render(<React.StrictMode><AudioProvider><App /></AudioProvider></React.StrictMode>);
if(import.meta.env.PROD) registerPwa();
