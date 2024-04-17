import { Outlet, useOutletContext } from 'react-router-dom';
import Nav from '../components/Nav';
import { useEffect, useState } from 'react';

type UserType = {
  username: string;
  role: string;
};

type RootContextType = {
  user: UserType;
  setUser: (arg0: UserType) => void;
};

export default function Root() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function autoLogin() {
      try {
        const res = await fetch('http://localhost:3000/admin/auto-login', {
          method: 'POST',
          mode: 'cors',
          credentials: 'include'
        });

        if (res.ok) {
          const resResult = await res.json();
          setUser(resResult);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    autoLogin();
  }, []);

  return (
    <>
      {user && <Nav />}
      <main>
        {!loading ? (
          <Outlet
            context={{
              user,
              setUser
            }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </>
  );
}

export function UseUser() {
  return useOutletContext<RootContextType>();
}
