import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `Bearer c0ee5840f84143caa2f8e0efda7f1836`,
    source: 'app',
  },
});

export default instance;
