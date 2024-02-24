import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const AuthButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <Link className="hidden text-base md:inline md:order-2 border md:border-white md:rounded-md md:py-1 md:px-2" to="/login">
          Sign up
        </Link>
        <Link className="text-base px-2 py-1 border border-white rounded-md md:order-1 md:border-0" to="/login">
          Sign in
        </Link>
      </div>
    );
  }

  const logout = () => {
    auth.signout().then(() => navigate("/"));
  };

  return (
    <div>
      {/* Welcome! {auth.user.firstName}  */}
      <button className="" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default AuthButton;