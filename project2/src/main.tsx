import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initDatabase } from './lib/db';
import { useBusinessStore } from './store/businessStore';

// Initialize database and load businesses
async function init() {
  await initDatabase();
  await useBusinessStore.getState().loadBusinesses();
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

init();