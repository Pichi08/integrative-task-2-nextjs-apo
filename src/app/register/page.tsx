"use client";

import { useState } from "react";
import { useRegister } from "@/hooks/register/useRegister";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [uName, setName] = useState("");
    const [lName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [phone, setPhone] = useState("");
    const { register: registerFunction } = useRegister();

    const onSubmit = async () => {
        if (uName && email && password && cPassword) {
            if (password === cPassword) {
                    registerFunction(uName, email, password)
                        .then((res) => {
                            if (res?.email != null) {
                                alert("User registered successfully");
                                router.push("/login");
                            } else {
                                alert(res);
                            }
                        })
                        .catch((err) => {
                            alert("Incorrect parameters");
                            console.log(err);
                        });
            } else {
                setPassword("");
                setCPassword("");
                alert("Passwords don't match. Please try again.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    };

    const redirectToLogin = () => {
        router.push("/login");
    };

    return (
        <div className="flex h-screen">
            {/* Image centered on the left */}
            <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
                <img
                    src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1732052037/Wz3Ls7t8NhCrxxk07Kt3ErAr-EE9nZfPvHboWpLtV5M-removebg-preview_fshgdj.png"
                    alt="Register Illustration"
                    className="max-w-[80%] max-h-[80%] object-contain"
                />
            </div>
            {/* Form on the right */}
            <div className="flex flex-col w-full md:w-1/2 items-center justify-center p-6 bg-white">
                <h1 className="text-3xl font-bold mb-6 text-black">Create Account</h1>
                <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md">
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={uName}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-b border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors"
                        />
                        {/* <input
                            type="text"
                            placeholder="Last Name"
                            value={lName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full border-b border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors"
                        /> */}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-b border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-b border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={cPassword}
                            onChange={(e) => setCPassword(e.target.value)}
                            className="w-full border-b border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors"
                        />
                        {/* <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border-b border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors"
                        /> */}
                    </div>
                    <button
                        type="button"
                        onClick={onSubmit}
                        className="w-full mt-6 py-2 bg-[#007bff] text-white rounded hover:bg-blue-600 transition-all"
                    >
                        Sign Up
                    </button>
                    <div className="mt-4 text-center">
                        <span className="text-gray-600">Already have an account? </span>
                        <button
                            type="button"
                            onClick={redirectToLogin}
                            className="text-[#007bff] font-semibold hover:underline ml-1"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
