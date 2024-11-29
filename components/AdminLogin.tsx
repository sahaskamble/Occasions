'use client';

import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await fetch("http://localhost:3000/api/admin/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					Email: email,
					Password: password,
					Type: "admin"
				}),
			});

			const data = await response.json();

			if (response.ok) {
				// Successful login
				router.push("/admin/dashboard");
			} else {
				// Handle error
				setError(data.message || "Login failed");
			}
		} catch (err) {
			setError("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full h-dvh bg-slate-100 flex justify-center items-center px-6">
			<form
				onSubmit={handleSubmit}
				className="w-full lg:w-[500px] h-auto p-8 bg-white flex flex-col items-center justify-between gap-4 rounded-lg shadow-gray-400 shadow-lg"
			>
				<div className="w-full flex flex-col items-center justify-center">
					<Image
						src={"/occasions.png"}
						alt="occasions image"
						width={80}
						height={80}
						className="rounded-full shadow-gray-300 shadow-md"
					/>
					<div className="text-xl font-bold">Occasions</div>
					<hr className="border-2 w-1/2 border-gray-300" />
				</div>
				<div>
					<h3 className="text-xl font-bold">Log In to your Admin Panel</h3>
				</div>
				{error && (
					<div className="w-full text-red-500 text-center font-medium">
						{error}
					</div>
				)}
				<div className="w-full py-2">
					<fieldset className="w-full border-2 border-black p-1 px-2 rounded-md mb-2">
						<legend className="text-sm font-bold">Email</legend>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							required
							className="w-full focus:border-none focus:outline-none text-xl bg-transparent p-1.5"
						/>
					</fieldset>
					<fieldset className="w-full border-2 border-black p-1 px-2 rounded-md flex items-center">
						<legend className="text-sm font-bold">Password</legend>
						<div className="w-full inline-flex justify-between items-center">
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="w-full focus:border-none focus:outline-none text-xl bg-transparent p-1.5"
							/>
							{showPassword ? (
								<FaEye
									size={20}
									color="#000"
									className="m-1 cursor-pointer"
									onClick={() => setShowPassword(false)}
								/>
							) : (
								<FaEyeSlash
									size={20}
									color="#000"
									className="m-1 cursor-pointer"
									onClick={() => setShowPassword(true)}
								/>
							)}
						</div>
					</fieldset>
				</div>
				<button
					type="submit"
					disabled={loading}
					className="w-full px-4 py-3 mt-2 bg-[--primary-color] active:bg-purple-400 text-white font-bold text-lg rounded-md shadow-gray-600 shadow-md border border-[--primary-color] disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? "Logging in..." : "Login"}
				</button>
				<div>
					<p className="font-bold hover:underline underline-offset-4">Forgot Password? <span className="text-[--primary-color] ml-1 cursor-pointer">click here</span></p>
				</div>
			</form>
		</div>
	)
}
