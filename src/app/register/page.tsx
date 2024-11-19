"use client";

// import { Navbar } from "@/components/nav-bar/NavBar";
// import Footer from '@/components/footer/Footer';
import { useState } from "react";
import { useRegister } from '@/hooks/register/useRegister';
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
        if (uName && lName && email && password && cPassword && phone) {
            if (password === cPassword) {
                if (phone.length === 10) {
                    const phonePref = "+57 " + phone;
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
                    alert("Invalid phone number. Please enter a 10-digit number.");
                }
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
        <div className="flex flex-col bg-white w-full min-h-screen">
            <div className="font-[sans-serif] p-8 mx-auto max-w-lg text-center">
                <h2 className="text-gray-800 text-2xl font-bold mb-6">Create Your Account</h2>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 gap-5">
                        {[
                            { label: "Name", value: uName, onChange: setName, placeholder: "Enter first name" },
                            // { label: "Last Name", value: lName, onChange: setLastName, placeholder: "Enter last name" },
                            { label: "Email", value: email, onChange: setEmail, placeholder: "Enter email", type: "email" },
                            // { label: "Mobile No.", value: phone, onChange: setPhone, placeholder: "Enter mobile number", type: "number" },
                            { label: "Password", value: password, onChange: setPassword, placeholder: "Enter password", type: "password" },
                            { label: "Confirm Password", value: cPassword, onChange: setCPassword, placeholder: "Confirm password", type: "password" },
                        ].map((field, index) => (
                            <div key={index}>
                                <label className="text-gray-700 text-sm mb-1 block">{field.label}</label>
                                <input 
                                    name={field.label.toLowerCase().replace(" ", "_")} 
                                    type={field.type || "text"} 
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md focus:outline-blue-500 transition-all placeholder-gray-400" 
                                    placeholder={field.placeholder} 
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col space-y-3 items-center">
                        <button 
                            type="button" 
                            onClick={onSubmit}
                            className="w-full py-3 px-6 text-sm font-semibold tracking-wider rounded-md text-white bg-[#007bff] hover:bg-blue-600 transition-all"
                        >
                            Sign Up
                        </button>
                        <button 
                            type="button" 
                            onClick={redirectToLogin}
                            className="w-full py-3 px-6 text-sm font-semibold tracking-wider rounded-md text-blue-600 border border-blue-500 hover:bg-blue-50 transition-all"
                        >
                            Back to Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
