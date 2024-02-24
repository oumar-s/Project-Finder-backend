import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import ErrorAlert from "../components/ErrorAlert";
import Navbar from "../components/navbar";

// sign up a user with first name, last name, email, and password and put the data into sql database with post request
function SignUpPage() {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const fieldChanged = (name) => {
		return (event) => {
			let { value } = event.target;
			setData((prevData) => ({ ...prevData, [name]: value }));
		};
	};

	const signUp = async (e) => {
		e.preventDefault();
		let { firstName, lastName, email, password } = data;

		try {
			let response = await fetch("/api/auth/signup", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password,
				}),
			});

			if (response.ok) {
				setSuccess(true);
			} else {
				setError(true);
			}
		} catch (error) {
			console.error("Server error while creating a new user", error);
			console.log("\n data: \n", data);
			setError(true);
		}
	};

	if (success) return <Navigate to="/" />;

	return (
		<>
			<Navbar />
			<div className="flex flex-col items-center gap-8 m-8">
				{error && <ErrorAlert details={"Failed to save the content"} />}
				<h1 className="text-xl">Welcome to Synergy!</h1>
				<p className="text-2xl">Sign up now to get started</p>

				<form className="bg-[#f6f8fa]" onSubmit={signUp}>
					<div className="flex flex-col w-80 p-4 border rounded-md">
						<label htmlFor="email" className="">
							First name
						</label>
						<input
							type="text"
							className="border p-3 rounded-md h-8"
							name="firstName"
							//placeholder="First Name"
							value={data.firstName}
							onChange={fieldChanged("firstName")}
							autoFocus = "true"
						/>
		
						<label htmlFor="email" className="mt-4">
							Last name
						</label>
						<input
							type="text"
							className="border p-3 rounded-md h-8"
							name="lastName"
							//placeholder="Last Name"
							value={data.lastName}
							onChange={fieldChanged("lastName")}
							
						/>

						<label htmlFor="email" className="mt-4">
							Email
						</label>
						<input
							type="email"
							className="border p-3 rounded-md h-8"
							name="email"
							//placeholder="Email"
							value={data.email}
							onChange={fieldChanged("email")}
							
						/>

						<label htmlFor="email" className="mt-4">
							Password
						</label>
						<input
							type="password"
							className="border p-3 rounded-md h-8"
							name="password"
							//placeholder="Password"
							value={data.password}
							onChange={fieldChanged("password")}
							
						/>
						<button type="submit" className="font-medium mt-4 py-1 text-white bg-emerald-600 border rounded-md h-8">
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default SignUpPage;