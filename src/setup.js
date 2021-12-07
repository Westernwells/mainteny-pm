import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `Bearer token`,
    source: 'app',
  },
});

export default instance;
