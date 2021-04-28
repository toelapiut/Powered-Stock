import axios from 'axios';

export const quandl = axios.create({
  baseURL: process.env.process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Allow': 'GET, PUT, HEAD, OPTIONS'
  }
});

quandl.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['key'] = process.env.REACT_APP_API_KEY;
  return config;
});
