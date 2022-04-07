import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { BrowserRouter } from 'react-router-dom';

import Invoice from './container/Invoice/index'

ReactDOM.render(
  // <React.StrictMode>
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // </React.StrictMode>,

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
