import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root';
import Home from './Home';
import Login from './Login';

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
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}
