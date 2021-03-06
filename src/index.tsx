import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RootPage from './pages/RootPage';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <RootPage/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
