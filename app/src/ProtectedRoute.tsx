import { Navigate } from "react-router-dom";
import AuthService from "./services/auth.service";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
