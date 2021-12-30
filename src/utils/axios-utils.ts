import Axios, {Method} from 'axios';

interface RequestConfig<T = any, K = any> {
  url: string;
  method: Method;
  data?: T;
  params?: K;
}

const header = {} as any;
// header.Authorization = `Bearer c0ee5840f84143caa2f8e0efda7f1836`;
if (localStorage.token) {
  header.Authorization = `Bearer c0ee5840f84143caa2f8e0efda7f1836`;
}

export const request = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    source: 'WEB',
    ...header,
  },
});

export const paramsSerializer = (parameters: {[key: string]: any}) => {
  const items = Object.keys(parameters).map((key) => {
    const value = parameters[key];
    if (Array.isArray(value)) {
      return value.map((v) => `${key}=${v}`);
    }
    return `${key}=${value}`;
  });

  return items.flat().join('&');
};

export const axiosClient = <T = any, K = any>({
  url,
  method,
  data,
  params,
}: RequestConfig) =>
  request({
    url,
    method,
    data,
    params,
    paramsSerializer,
  });
