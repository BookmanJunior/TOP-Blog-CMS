import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <div className="nav-wrapper">
        <ul className="nav-links">
          <li className="nav-link">
            <NavLink to={'users'}>Users</NavLink>
          </li>
          <li className="nav-link">
            <NavLink to={'articles'}>Articles</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
