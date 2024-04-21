import FormInput from './FormInput';
import ErrorMessage from './ErrorMessage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CategoryFormProps = {
  data?: string;
  apiEndpoint: string;
  fetchMethod: 'POST' | 'PUT';
};

export default function CategoryForm({ data, apiEndpoint, fetchMethod }: CategoryFormProps) {
  const [category, setCategory] = useState(data ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="form-util">
      <FormInput
        name="title"
        placeholder="Category Title"
        value={category}
        onChange={(e) => setCategory(e.target.value)}>
        <ErrorMessage error={error?.message} />
      </FormInput>
      <button disabled={loading}>Submit</button>
    </form>
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(apiEndpoint, {
        method: fetchMethod,
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: category })
      });

      const resResult = await res.json();

      if (res.status >= 400) {
        setError(new Error(resResult.message));
        return;
      }

      navigate('/categories');
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }
}
