import React, { useEffect, useState } from 'react';
import axios from '../setup';

export const useFetch = (url, params = {}, method, requestPayload) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method,
      url,
      data: requestPayload,
      params,
      paramsSerializer: function (params) {
        const items = Object.keys(params).map((key) => {
          const value = params[key];
          if (Array.isArray(value)) {
            return value.map((v) => `${key}=${v}`);
          } else {
            return `${key}=${value}`;
          }
        });

        return items.flat().join('&');
      },
    })
      .then(function (response) {
        setData(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, data, error };
};
