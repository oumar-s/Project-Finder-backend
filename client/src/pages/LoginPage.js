import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

//import Navbar from "../components/navbar";
//import Footer from "../components/footer";

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  };

  const login = async (e) => {
    e.preventDefault();
    let { email, password } = data;

    try {
      await auth.authenticate(email, password);
      // setRedirectToReferrer(true); // used in react-router v5
      // in react-router v6 navigate changes the pages directly.
      // comment from official docs example:
      //    Send them back to the page they tried to visit when they were
      //    redirected to the login page. Use { replace: true } so we don't create
      //    another entry in the history stack for the login page.  This means that
      //    when they get to the protected page and click the back button, they
      //    won't end up back on the login page, which is also really nice for the
      //    user experience.
      navigate(from, { replace: true });
    } catch (error) {
      setError(true);
    }
  };

  let errorMessage = "";
  if (error) {
    errorMessage = (
      <div className="alert alert-danger" role="alert">
        Login Failed
      </div>
    );
  }

  return (
    <div className="">
      {/* <Navbar /> */}
      <div className="flex flex-col items-center gap-8 m-8 ">

        <div className="text-xl">
          <Link className="" to="/">Synergy</Link>
        </div>

        <h1 className="text-2xl">Sign in to Synergy</h1>

        <form className="bg-[#f6f8fa]" onSubmit={login}>
          <div className="flex flex-col w-80 p-4 border rounded-md">
            {errorMessage}
           
            <label htmlFor="email" className="">
              Email address
            </label>
            <input
              type="email"
              className="border p-3 rounded-md h-8"
              name="email"
              //placeholder="Email"
              value={data.email}
              onChange={fieldChanged("email")}
              autoFocus = "true"
            />
            

            <div className="flex justify-between mt-4">
              <label htmlFor="password" className="">
                Password
              </label>
              {/* <a href="/forgot-password" style={{ textDecoration: "none" }} className="">
                Forgot your password?
              </a> */}
            </div>
            <input
              type="password"
              className="border p-3 rounded-md h-8"
              name="password"
              //placeholder="Password"
              value={data.password}
              onChange={fieldChanged("password")}
            />
            

            <button type="submit" className="font-medium  mt-4 py-1 text-white bg-emerald-600 border rounded-md h-8">
              Sign in
            </button>
          </div>
          
        </form>

        <div className="flex w-80 justify-center gap-1 p-4 border rounded-md">
          <p>New to Synergy?</p>
          <a href="/sign-up" className="text-blue-600">Creat an account</a>
        </div>

      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default LoginPage;