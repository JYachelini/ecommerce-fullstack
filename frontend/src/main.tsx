import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextProvider from './components/Context/Contex';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
);
