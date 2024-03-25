import { NavLink } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <NavLink to={'users'}>Users</NavLink>
      <NavLink to={'articles'}>Articles</NavLink>
    </div>
  );
}
