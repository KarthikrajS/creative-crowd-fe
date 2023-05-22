import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function GuestRoute({ path, ...props }) {
  const { currentUser } = useAuth();

  return !currentUser ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate to="/" />
  );
}

export default GuestRoute;
