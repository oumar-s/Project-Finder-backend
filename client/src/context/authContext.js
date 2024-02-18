import React, { useState, useEffect, createContext } from "react";
import { apiSlice } from "../features/api/apiSlice";
import { useDispatch } from "react-redux";

const AuthContext = createContext();
const { Provider } = AuthContext;
//const url = 'https://project-finder-backend-production.up.railway.app';
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const dispatch = useDispatch();

  //UseEffect to check if the user is logged in.
  useEffect(() => {
    async function checkIfUserIsLoggedIn() {
      try {
        let response = await fetch('/api/auth/login', {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error("Unauthenticated");
        }

        let fetchedUser = await response.json();
        setUser(fetchedUser);
      } catch (error) {
        console.log("Error: User not logged in.")
        setUser(false);
      }
    }
    checkIfUserIsLoggedIn();

    return () => {
      // clean up function
    };
  }, []);

  //UseEffect to reset the api state when the user logs out
  useEffect(() => {
    if (user === false) {
      dispatch(apiSlice.util.resetApiState());
    }
  }, [user, dispatch]);

  const authenticate = async (email, password) => {
    let response = await fetch('/api/auth/login', {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Login Failed");
    }

    let loggedInUser = await response.json();
    setUser(loggedInUser);

    return loggedInUser;
  };

  const signout = async () => {
    let response = await fetch('/api/auth/logout', {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Logout Failed");
    }

    setUser(false);
    
    let body = await response.json();
    return body;
  };

  return (
    <Provider
      value={{
        authenticate,
        signout,
        isAuthenticated: user ? true : false,
        user,
      }}
    >
      {children}
    </Provider>
  );
};

// Our own hook for accessing the context from any functional component
function useAuth() {
  return React.useContext(AuthContext);
}

export { useAuth, AuthProvider };