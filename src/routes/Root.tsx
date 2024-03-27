import { Outlet, useOutletContext } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
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
      {user && <Dashboard />}
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export function UseUser() {
  return useOutletContext<RootContextType>();
}
