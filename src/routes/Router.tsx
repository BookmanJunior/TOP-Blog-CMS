import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root';
import Home from './Home';
import Login from './Login';
import Users from './Users';
import User from './User';
import Articles from './Articles';
import ArticleEditor from './ArticleEditor';
import NewArticle from './NewArticle';
import ProtectedRoute from '../components/ProtectedRoute';

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
              <NewArticle />
            </ProtectedRoute>
          )
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}
