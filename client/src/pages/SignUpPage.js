import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

import ErrorAlert from "../components/ErrorAlert";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function SignUpPage() {
	const auth = useAuth();
	const navigate = useNavigate();
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (auth.isAuthenticated) {
			navigate("/dashboard");
		}
	}, [auth.isAuthenticated, navigate]);

	const fieldChanged = (name) => {
		return (event) => {
			let { value } = event.target;
			setData((prevData) => ({ ...prevData, [name]: value }));
		};
	};

	const signUp = async (e) => {
		e.preventDefault();
		setIsLoading(true);
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
				await auth.authenticate(email, password);
			} else {
				setError(true);
			}
		} catch (error) {
			console.error("Server error while creating a new user", error);
			setError(true);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Navbar />
			<div className="min-h-screen flex flex-col items-center gap-8 m-8">
				{error && <ErrorAlert details={"Please fill in all required fields correctly and try again"} />}
				<h1 className="text-xl">Welcome to Synergy!</h1>
				<p className="text-2xl">Sign up now to get started</p>

				<form className="bg-[#f6f8fa]" onSubmit={signUp}>
					<div className="flex flex-col w-80 p-4 border rounded-md">
						<label htmlFor="firstName" className="">
							First name *
						</label>
						<input
							type="text"
							className="border p-3 rounded-md h-8"
							name="firstName"
							value={data.firstName}
							onChange={fieldChanged("firstName")}
							autoFocus="true"
							required
						/>
		
						<label htmlFor="lastName" className="mt-4">
							Last name *
						</label>
						<input
							type="text"
							className="border p-3 rounded-md h-8"
							name="lastName"
							value={data.lastName}
							onChange={fieldChanged("lastName")}
							required
						/>

						<label htmlFor="email" className="mt-4">
							Email *
						</label>
						<input
							type="email"
							className="border p-3 rounded-md h-8"
							name="email"
							value={data.email}
							onChange={fieldChanged("email")}
							required
						/>

						<label htmlFor="password" className="mt-4">
							Password *
						</label>
						<input
							type="password"
							className="border p-3 rounded-md h-8"
							name="password"
							value={data.password}
							onChange={fieldChanged("password")}
							required
						/>
						<button 
							type="submit" 
							disabled={isLoading}
							className="font-medium mt-4 py-1 text-white bg-emerald-600 border rounded-md h-8 disabled:bg-emerald-400"
						>
							{isLoading ? "Signing up..." : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
			<Footer />
		</>
	);
}

export default SignUpPage;