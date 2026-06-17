import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 shadow-xl">

                {/* Heading */}
                <h1 className="text-2xl font-bold text-white text-center mb-2">
                    Forgot Password
                </h1>

                <p className="text-gray-400 text-center text-sm mb-6">
                    Recover your account in 3 easy steps
                </p>

                {/* STEP 1 */}
                {step === 1 && (
                    <div className="space-y-4">
                        <h2 className="text-white font-medium">
                            Enter your email
                        </h2>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full bg-[#272727] text-white border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                        />

                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
                        >
                            Send OTP
                        </button>
                    </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <div className="space-y-4">
                        <h2 className="text-white font-medium">
                            Enter OTP
                        </h2>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value)
                            }
                            className="w-full bg-[#272727] text-white border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                        />

                        <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
                        >
                            Verify OTP
                        </button>
                    </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <div className="space-y-4">
                        <h2 className="text-white font-medium">
                            Reset Password
                        </h2>

                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full bg-[#272727] text-white border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            className="w-full bg-[#272727] text-white border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                        />

                        <button
                            type="button"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
                        >
                            Reset Password
                        </button>
                    </div>
                )}

                {/* Back to Sign In */}
                <button
                    type="button"
                    onClick={() => navigate("/signin")}
                    className="w-full mt-6 text-sm text-gray-400 hover:text-white transition"
                >
                    Back to Sign In
                </button>
            </div>
        </div>
    );
}

export default ForgetPassword;