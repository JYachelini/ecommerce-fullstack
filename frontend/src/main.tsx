import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextProvider from './components/Context/Context';
import { BrowserRouter } from 'react-router-dom';
import FetchFunctions from './components/fetchs/FetchFunctions';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <FetchFunctions>
          <App />
        </FetchFunctions>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
