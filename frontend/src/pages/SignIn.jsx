import React, { useState } from "react";
import {
  FaUserCircle,
  FaArrowLeft,
  FaPlay,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { showCustomAlert } from "../../component/CustomAlert";
import { serverURL } from "../App";

function SignIn() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/");
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      return showCustomAlert("Please fill all fields");
    }

    setLoading(true);

    try {
      const result = await axios.post(
        `${serverURL}/api/auth/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(result.data);
      dispatch(setUserData(result.data.user));
      navigate("/");
      setLoading(false);
      showCustomAlert("Sign In Successfully");


    } catch (error) {
      console.log(error);

      showCustomAlert(
        error?.response?.data?.message ||
        "Failed to sign in"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181818] via-[#202124] to-[#181818] px-4">
      <div className="w-full max-w-md bg-[#202124]/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700 p-8">

        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-white transition mr-3"
          >
            <FaArrowLeft size={20} />
          </button>

          <h1 className="text-white text-2xl font-bold">
            Sign In
          </h1>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2].map((item) => (
            <div
              key={item}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= item
                ? "bg-red-600"
                : "bg-gray-700"
                }`}
            />
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPlay className="text-white text-xl" />
              </div>

              <h2 className="text-white text-2xl font-semibold">
                Welcome Back
              </h2>

              <p className="text-gray-400 mt-2">
                Sign in to continue to TubeVerse
              </p>
            </div>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-[#2d2f31] border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => navigate("/signup")}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Create Account
              </button>

              <button
                onClick={() => {
                  if (!email.trim()) {
                    return showCustomAlert(
                      "Please enter your email"
                    );
                  }

                  setStep(2);
                }}
                className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl text-white font-medium transition"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="flex items-center gap-3 bg-[#2d2f31] px-4 py-3 rounded-full mb-6">
              <FaUserCircle className="text-gray-300 text-xl" />
              <span className="text-gray-300 break-all">
                {email}
              </span>
            </div>

            {/* Password */}
            <div className="relative mb-4">
              <input
                type={
                  showPassword ? "text" : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-[#2d2f31] border border-gray-600 text-white rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) =>
                  setShowPassword(
                    e.target.checked
                  )
                }
                className="accent-red-600"
              />

              <label className="text-gray-300 text-sm cursor-pointer">
                Show Password
              </label>
            </div>

            <div className="flex justify-between items-center">
              <button
                className="text-red-400 hover:text-red-300 text-sm"
                onClick={() =>
                  showCustomAlert(
                    "Forgot Password feature coming soon"
                  )
                }
              >
                Forgot Password?
              </button>

              <button
                onClick={handleSignIn}
                disabled={loading}
                className={`px-8 py-3 rounded-xl text-white font-medium transition flex items-center justify-center min-w-[120px]
                  ${loading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                  }`}
              >
                {loading ? (
                  <ClipLoader
                    color="white"
                    size={20}
                  />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SignIn;