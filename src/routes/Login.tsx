import { useLocation, useNavigate } from 'react-router-dom';
import { UseUser } from './Root';
import ErrorMessage from '../components/ErrorMessage';
import { useState } from 'react';
import FormInput from '../components/FormInput';
import { URL } from '../helpers/getUrl';
import '../styles/Login.scss';

type LoginError = {
  message?: string;
};

export default function Login() {
  const [error, setError] = useState<LoginError | null>(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = UseUser();
  const { state } = useLocation();
  const navigate = useNavigate();
  const redirectLocation = state?.redirectTo ? state.redirectTo : '/';

  return (
    <form className="login-form form-util" onSubmit={handleLogin}>
      <div className="title">Login</div>
      <FormInput name="username" placeholder="Username" />
      <FormInput name="password" placeholder="Password" type="password" />
      <ErrorMessage error={error?.message} />
      <button disabled={loading}>Login</button>
    </form>
  );

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch(`${URL}/admin`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data))
      });

      const resResult = await res.json();

      if (res.status >= 400) {
        setError(resResult);
        return;
      }
      setUser(resResult);
      navigate(redirectLocation);
    } catch (error) {
      setError({ message: 'Network Error' });
    } finally {
      setLoading(false);
    }
  }
}
