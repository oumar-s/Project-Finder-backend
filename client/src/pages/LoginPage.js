import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({ email: "", password: "" });

  const from = location.state?.from?.pathname || "/dashboard";

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
      navigate(from, { replace: true });
    } catch(error) {
      console.log("Error logging in", error);
    }
  };

  let errorMessage = "";
  if (auth.authError) {
    errorMessage = (
      <div className="alert alert-danger p-2 mb-4 text-red-600 bg-red-100 border border-red-400 rounded" role="alert">
        {auth.authError}
      </div>
    );
  }

  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen flex flex-col items-center gap-8 m-8 ">

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
              value={data.email}
              onChange={fieldChanged("email")}
              autoFocus = "true"
            />
            

            <div className="flex justify-between mt-4">
              <label htmlFor="password" className="">
                Password
              </label>
            </div>
            <input
              type="password"
              className="border p-3 rounded-md h-8"
              name="password"
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
      <Footer />
    </div>
  );
}

export default LoginPage;