import React from 'react';
import ReactDOM from 'react-dom';
import './static/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { RequestProvider } from 'react-request-hook'
import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL: 'http://192.168.3.2:8080/'
    baseURL: 'https://housework-takawagu.herokuapp.com/'
  })
axiosInstance.interceptors.request.use((config) => {
    config.headers = { Authorization:  `Bearer ${localStorage.getItem(
      "token"
    )}`} 
    return config
  })
axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
      localStorage.removeItem('token')
  }
  return Promise.reject(error);
})

ReactDOM.render(
  <RequestProvider value={axiosInstance}>
    <App />
  </RequestProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
