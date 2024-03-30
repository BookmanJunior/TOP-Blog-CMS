import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserType } from '../Types/UserType';

type rolesType = {
  role: string;
};

type errorType = {
  message: string;
};

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState<UserType>({} as UserType);
  const [roles, setRoles] = useState<rolesType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<errorType | undefined>();

  useEffect(() => {
    async function fetchUser() {
      const fetchOptions: RequestInit = {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      };
      try {
        const userRes = fetch(`http://localhost:3000/cms/users/${userId}`, fetchOptions);
        const rolesRes = fetch('http://localhost:3000/cms/roles', fetchOptions);
        const res = await Promise.all([userRes, rolesRes]);
        const [userResult, rolesResult] = await Promise.all(
          res.map((r) => {
            if (r.status >= 404) {
              throw new Error('User not found');
            }

            if (r.status >= 400) {
              throw new Error('Unauthorized');
            }

            return r.json();
          })
        );

        setUser(userResult);
        setRoles(rolesResult);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="form-util">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={user?.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <div className="radio-group">
        Select a role:
        {roles?.map((role) => (
          <label key={role.role}>
            {role.role}
            <input
              type="radio"
              name="role"
              id={role.role}
              value={role.role}
              checked={user.role === role.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            />
          </label>
        ))}
      </div>
      <p>{user?._id}</p>
      <p>{user?.createdAt}</p>
      <button>Submit Change</button>
    </form>
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/cms/users/${user._id}`, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      const resResult = await res.json();

      if (res.status >= 400) {
        console.log(resResult);
        return;
      }

      setUser(resResult);
    } catch (error) {
      console.log(error);
    }
  }
}
