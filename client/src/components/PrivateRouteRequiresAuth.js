import { useAuth } from "../context/authContext";
import { useLocation, Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function PrivateRouteRequiresAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.initialLoading) {
    return <LoadingSpinner />;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
    
  }

  return children;
}

export default PrivateRouteRequiresAuth;