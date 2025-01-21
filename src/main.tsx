import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initializeAuth } from './firebase'

const init = async () => {
  console.log('Starting application initialization...');
  await initializeAuth();
  console.log('Auth initialized, rendering app...');

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

init().catch(console.error);
