import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://v2.jokeapi.dev/joke',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `Bearer token`,
    source: 'app',
  },
});

export default instance;
