import { Navigate } from 'react-router-dom';
import { UseUser } from '../routes/Root';

type ProtectedRoute = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRoute) {
  const { user } = UseUser();

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ redirectTo: location.pathname }} replace />
  );
}
