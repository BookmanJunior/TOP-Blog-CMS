import { Outlet } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

export default function Root() {
  return (
    <>
      <Dashboard />
      <h1>This is root</h1>
      <Outlet />
    </>
  );
}
