export default function Login() {
  return (
    <form className="login-form" onSubmit={handleLogin}>
      <label htmlFor="login">
        Username
        <input type="text" id="username" name="username" />
      </label>
      <label htmlFor="password">
        Password
        <input type="password" name="password" id="password" />
      </label>
      <button>Login</button>
    </form>
  );

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
}
