import { useState, useEffect } from 'react';

type ErrorType = {
  message: string;
};

type FetchDataResponse<Data> = {
  data: Data;
  setData: (arg0: Data) => void;
  loading: boolean;
  error: ErrorType | null;
};

export default function FetchData<T>(apiEndPoint: string): FetchDataResponse<T> {
  const [data, setData] = useState<T>({} as T);
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
          const err = new Error(resResult.message);
          setError(err);
          return;
        }

        setData(resResult);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
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
