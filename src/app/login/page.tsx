"use client";

import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { login: loginFunction } = useLogin();

    const onSubmit = async () => {
        console.log(login);
        console.log(password);
        if (login && password) {
            loginFunction(login, password)
                .then((res) => {
                    console.log(res);
                    router.push("/home");
                })
                .catch((err) => {
                    alert("Invalid login or password");
                    setLogin("");
                    setPassword("");
                    console.log(err);
                });
        } else {
            alert("Please fill all fields");
        }
    };

    const redirectToRegister = () => {
        router.push("/register");
    };

    return (
        <div className="flex h-screen">
            {/* Imagen centrada a la izquierda */}
            <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
                <img
                    src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1732052037/Wz3Ls7t8NhCrxxk07Kt3ErAr-EE9nZfPvHboWpLtV5M-removebg-preview_fshgdj.png"
                    alt="Login Illustration"
                    className="max-w-[80%] max-h-[80%] object-contain"
                />
            </div>
            {/* Formulario a la derecha */}
            <div className="flex flex-col w-full md:w-1/2 items-center justify-center p-6 bg-white">
                <h1 className="text-3xl font-bold mb-6 text-black">Sign in</h1>
                <input
                    type="text"
                    placeholder="Email"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-80 border-b border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-80 border-b border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors mb-6"
                />
                <button
                    onClick={onSubmit}
                    className="w-80 py-2 bg-[#007bff] text-white rounded hover:bg-blue-600 transition-all"
                >
                    Sign in
                </button>
                <div className="mt-4">
                    <span className="text-gray-600">Don't have an account? </span>
                    <button
                        onClick={redirectToRegister}
                        className="text-[#007bff] font-semibold hover:underline ml-1"
                    >
                        Create an account
                    </button>
                </div>
            </div>
        </div>
    );
}
