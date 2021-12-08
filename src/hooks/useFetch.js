import {useEffect, useState} from 'react';
import axios from '../setup';

export const useFetch = (url, method, body, params = {}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method,
      url,
      data: body,
      params,
      paramsSerializer: (parameters) => {
        const items = Object.keys(parameters).map((key) => {
          const value = parameters[key];
          if (Array.isArray(value)) {
            return value.map((v) => `${key}=${v}`);
          }
          return `${key}=${value}`;
        });

        return items.flat().join('&');
      },
    })
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {loading, data, error};
};
