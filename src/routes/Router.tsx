import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root';
import Home from './Home';
import Login from './Login';
import Users from './Users';
import User from './User';
import Articles from './Articles';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'users',
          element: <Users />
        },
        {
          path: 'users/:userId',
          element: <User />
        },
        {
          path: 'articles',
          element: <Articles />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}
