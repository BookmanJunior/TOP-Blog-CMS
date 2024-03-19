import { useState, useEffect } from 'react';

type ErrorType = {
  message: string;
};

type FetchDataResponse<Data> = {
  data: Data | null;
  setData: (arg0: Data | null) => void;
  loading: boolean;
  error: ErrorType | null;
};

export default function FetchData<T>(apiEndPoint: string): FetchDataResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`${apiEndPoint}`, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include'
        });

        const resResult = await res.json();

        if (res.status >= 400) {
          setError(resResult);
          return;
        }

        setData(resResult);
      } catch (error) {
        setError({ message: 'Something went wrong. Please try again' });
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [apiEndPoint]);

  return {
    data,
    setData,
    loading,
    error
  };
}
