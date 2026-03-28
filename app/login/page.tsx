"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [tab, setTab] = useState<"email" | "phone">("email");
    const [form, setForm] = useState({ identifier: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Invalid credentials.");
            } else {
                router.push("/");
                router.refresh();
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left panel — brand */}
            <div
                className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12"
                style={{
                    background: "linear-gradient(135deg, #0B1B2B 0%, #0d2a45 50%, #1a3a5c 100%)",
                }}
            >
                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                {/* Glow blobs */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#2196F3]/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-blue-400/10 rounded-full blur-[60px]" />

                <div className="relative">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-[#2196F3] to-[#0077B6] rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-white font-bold text-xl">Estabizz Fintech</span>
                    </Link>
                </div>

                <div className="relative space-y-6">
                    <div>
                        <p className="text-[#2196F3] text-sm font-semibold tracking-wider uppercase mb-3">Trusted by 1000+ businesses</p>
                        <h2 className="text-4xl font-bold text-white leading-tight">
                            India&apos;s #1 Fintech<br />Compliance Platform
                        </h2>
                        <p className="text-gray-400 mt-4 text-base leading-relaxed">
                            Expert regulatory guidance for RBI, SEBI, IFSCA and IRDAI licenses — end-to-end.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {["RBI Licensed", "SEBI Registered", "IFSCA Compliant"].map((tag) => (
                            <span key={tag} className="text-xs bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full">
                                ✓ {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <p className="relative text-gray-600 text-xs">© {new Date().getFullYear()} Estabizz Fintech Pvt. Ltd.</p>
            </div>

            {/* Right panel — form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#f8faff] px-6 py-12">
                <div className="w-full max-w-md">
                    <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8 group">
                        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="text-gray-500 text-sm mt-1">Please enter your details to sign in.</p>
                    </div>

                    {/* Tab toggle */}
                    <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                        <button
                            type="button"
                            onClick={() => { setTab("email"); setForm({ identifier: "", password: "" }); setError(""); }}
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === "email" ? "bg-white text-[#2196F3] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            Email
                        </button>
                        <button
                            type="button"
                            onClick={() => { setTab("phone"); setForm({ identifier: "", password: "" }); setError(""); }}
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === "phone" ? "bg-white text-[#2196F3] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            Phone Number
                        </button>
                    </div>

                    {error && (
                        <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {tab === "email" ? (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    name="identifier"
                                    value={form.identifier}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3]/10 transition-all"
                                />
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-600 whitespace-nowrap">
                                        🇮🇳 +91
                                    </div>
                                    <input
                                        type="tel"
                                        name="identifier"
                                        value={form.identifier}
                                        onChange={handleChange}
                                        required
                                        placeholder="9876543210"
                                        className="flex-1 border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3]/10 transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <Link href="/forgot-password" className="text-xs text-[#2196F3] hover:underline">Forgot password?</Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3]/10 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#2196F3] to-[#0077B6] hover:from-[#1976D2] hover:to-[#005f8f] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-blue-300/40 mt-1"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing in…
                                </span>
                            ) : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-[#2196F3] font-semibold hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
