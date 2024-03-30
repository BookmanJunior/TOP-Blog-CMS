import { useLocation, useNavigate } from 'react-router-dom';
import { UseUser } from './Root';
import '../styles/Login.scss';

export default function Login() {
  const { setUser } = UseUser();
  const { state } = useLocation();
  const navigate = useNavigate();
  const redirectLocation = state?.redirectTo ? state.redirectTo : '/';

  return (
    <form className="login-form form-util" onSubmit={handleLogin}>
      <div className="title">Login</div>
      <input type="text" id="username" name="username" placeholder="username" />
      <input type="password" name="password" id="password" placeholder="password" />
      <button>Login</button>
    </form>
  );

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch('http://localhost:3000/cms/login', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data))
      });

      const resResult = await res.json();

      if (res.status >= 400) {
        console.log(resResult);
        return;
      }
      setUser(resResult);
      navigate(redirectLocation);
    } catch (error) {
      console.log(error);
    }
  }
}
