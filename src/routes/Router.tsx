import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root';
import Home from './Home';
import Login from './Login';
import Users from './Users';
import User from './User';
import Articles from './Articles';
import ArticleEditor from './ArticleEditor';
import ProtectedRoute from '../components/ProtectedRoute';
import UserForm from '../components/UserForm';
import ArticleForm from '../components/ArticleForm';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'users',
          element: (
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          )
        },
        {
          path: 'users/:userId',
          element: (
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          )
        },
        {
          path: 'users/create',
          element: (
            <ProtectedRoute>
              <UserForm apiEndPoint="http://localhost:3000/cms/users" fetchMethod="POST" />
            </ProtectedRoute>
          )
        },
        {
          path: 'articles',
          element: (
            <ProtectedRoute>
              <Articles />
            </ProtectedRoute>
          )
        },
        {
          path: 'articles/:articleId',
          element: (
            <ProtectedRoute>
              <ArticleEditor />
            </ProtectedRoute>
          )
        },
        {
          path: 'articles/create',
          element: (
            <ProtectedRoute>
              <ArticleForm fetchMethod="POST" apiEndPoint="http://localhost:3000/cms/articles" />
            </ProtectedRoute>
          )
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}
