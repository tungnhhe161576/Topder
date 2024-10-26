import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../src/assets/scss/index.scss"
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <GoogleOAuthProvider clientId="343060988584-3p4dfhskci0qeprij8gj9lnbj089idb7.apps.googleusercontent.com"> */}
        <App />
      {/* </GoogleOAuthProvider> */}
    </Provider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
