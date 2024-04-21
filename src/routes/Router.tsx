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
import ErrorElement from './ErrorElements';
import Categories from './Categories';
import CategoryForm from '../components/CategoryForm';
import CategoryEditor from './CategoryEditor';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorElement />,
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
        },
        {
          path: 'categories',
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          )
        },
        {
          path: 'categories/create',
          element: (
            <ProtectedRoute>
              <CategoryForm fetchMethod="POST" apiEndpoint="http://localhost:3000/cms/categories" />
            </ProtectedRoute>
          )
        },
        {
          path: 'categories/:categoryId',
          element: (
            <ProtectedRoute>
              <CategoryEditor />
            </ProtectedRoute>
          )
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}
