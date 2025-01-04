import { useAuth } from "../context/authContext";
import LoadingSpinner from "./LoadingSpinner";

function PublicRoute({ children }) {
  const { initialLoading } = useAuth();

  if (initialLoading) {
    return <LoadingSpinner />;
  }

  return children;
}

export default PublicRoute;
