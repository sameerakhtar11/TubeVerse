import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

import { serverURL } from "../App";
import { showCustomAlert } from "../../component/CustomAlert";

function ForgetPassword() {
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            if (!email) {
                showCustomAlert("Please enter your email");
                return;
            }

            setLoading(true);

            const result = await axios.post(
                serverURL + "/api/auth/sendotp",
                { email },
                {
                    withCredentials: true,
                }
            );

            console.log(result.data);

            setStep(2);

            showCustomAlert(result.data.message);
        } catch (error) {
            console.log(error);

            showCustomAlert(
                error?.response?.data?.message ||
                "Failed to send OTP"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            if (!otp) {
                showCustomAlert("Please enter OTP");
                return;
            }

            setLoading(true);

            const result = await axios.post(
                serverURL + "/api/auth/verifyotp",
                { email, otp },
                {
                    withCredentials: true,
                }
            );

            console.log(result.data);

            setStep(3);

            showCustomAlert(result.data.message);
        } catch (error) {
            console.log(error);

            showCustomAlert(
                error?.response?.data?.message ||
                "OTP verification failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        try {
            if (!newPassword || !confirmPassword) {
                showCustomAlert(
                    "Please fill all password fields"
                );
                return;
            }

            if (newPassword !== confirmPassword) {
                showCustomAlert(
                    "Passwords do not match"
                );
                return;
            }

            setLoading(true);

            const result = await axios.post(
                serverURL + "/api/auth/resetpassword",
                {
                    email,
                    password: newPassword,
                    confirmPassword,
                },
                {
                    withCredentials: true,
                }
            );

            console.log(result.data);

            showCustomAlert(result.data.message);

            navigate("/signin");
        } catch (error) {
            console.log(error);

            showCustomAlert(
                error?.response?.data?.message ||
                "Password reset failed"
            );
        } finally {
            setLoading(false);
        }
    };

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

                {/* Progress */}
                <div className="flex justify-center gap-2 mb-6">
                    <div
                        className={`h-2 w-16 rounded-full ${step >= 1
                            ? "bg-red-500"
                            : "bg-gray-700"
                            }`}
                    />
                    <div
                        className={`h-2 w-16 rounded-full ${step >= 2
                            ? "bg-red-500"
                            : "bg-gray-700"
                            }`}
                    />
                    <div
                        className={`h-2 w-16 rounded-full ${step >= 3
                            ? "bg-red-500"
                            : "bg-gray-700"
                            }`}
                    />
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                    <div className="space-y-4">
                        <h2 className="text-white font-medium">
                            Enter Your Email
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
                            disabled={loading}
                            onClick={handleSendOtp}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 rounded-lg transition flex items-center justify-center"
                        >
                            {loading ? (
                                <ClipLoader
                                    color="white"
                                    size={20}
                                />
                            ) : (
                                "Send OTP"
                            )}
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
                            disabled={loading}
                            onClick={handleVerifyOtp}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 rounded-lg transition flex items-center justify-center"
                        >
                            {loading ? (
                                <ClipLoader
                                    color="white"
                                    size={20}
                                />
                            ) : (
                                "Verify OTP"
                            )}
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
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(
                                    e.target.value
                                )
                            }
                            className="w-full bg-[#272727] text-white border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            className="w-full bg-[#272727] text-white border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                        />

                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleResetPassword}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded-lg transition flex items-center justify-center"
                        >
                            {loading ? (
                                <ClipLoader
                                    color="white"
                                    size={20}
                                />
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </div>
                )}

                {/* Back Button */}
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