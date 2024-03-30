import { Outlet, useOutletContext } from 'react-router-dom';
import Nav from '../components/Nav';
import { useState } from 'react';

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

  return (
    <>
      {user && <Nav />}
      <main>
        <Outlet
          context={{
            user,
            setUser
          }}
        />
      </main>
    </>
  );
}

export function UseUser() {
  return useOutletContext<RootContextType>();
}
