import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes/Router.tsx';
import '../src/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
