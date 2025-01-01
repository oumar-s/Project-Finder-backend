import React, { useState, useEffect, createContext } from "react";
import { apiSlice } from "../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import LoadingSpinner from "../components/LoadingSpinner";

const AuthContext = createContext();
const { Provider } = AuthContext;
//const url = 'https://project-finder-backend-production.up.railway.app';
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
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
      } finally {
        setInitialLoading(false);
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
    setAuthLoading(true);
    setAuthError(null);
    try {
      let response = await fetch('/api/auth/login', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Error: ", response);
        throw new Error("Incorrect email or password. Please try again.");
      }

      let res = await response.json();

      let loggedInUser = res.user;
      setUser(loggedInUser);

      // Sign in to Firebase with custom token
      const firebaseToken = await res.token;
      const auth = getAuth();
      await signInWithCustomToken(auth, firebaseToken);

      //check if user logged in in firebase
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) {
        throw new Error("There was an error autheticating you credentials. Please try again.");
      }

      return loggedInUser;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
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

    // Sign out of Firebase
    const auth = getAuth();
    await auth.signOut();
    
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
        initialLoading,
        authError
      }}
    >
      {authLoading ? <LoadingSpinner /> : children}
    </Provider>
  );
};

// A hook for accessing the context from any functional component
function useAuth() {
  return React.useContext(AuthContext);
}

export { useAuth, AuthProvider };