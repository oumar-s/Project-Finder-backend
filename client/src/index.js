import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

//Redux
import { Provider } from 'react-redux';
import store from './app/store';
console.log('Current NODE_ENV:', process.env.NODE_ENV);
// Disable console in production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.debug = () => {};
  // Keep console.error for critical errors
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <App />

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
