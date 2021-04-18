import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* Error/Message display components - START */
import ErrorBoundary from './ErrorBoundary';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
/* Error/Message display components - END */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

/* Config for react-alert component provider - START */
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};
/* Config for react-alert component provider - END */


ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
