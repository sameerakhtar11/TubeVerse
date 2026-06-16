import { useState } from "react";
import axios from "axios"
import { ClipLoader } from "react-spinners"
import { serverURL } from "../App"
import {
  FaArrowLeft,
  FaPlay,
  FaUserCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { showCustomAlert } from "../../component/CustomAlert";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignUp() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch()
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [backendImage, setBackendImage] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleNext = () => {
    if (step === 1) {
      if (!UserName.trim() || !email.trim()) {
        showCustomAlert("Please fill all fields");
        return;
      }
    }

    if (step === 2) {
      if (!password || !ConfirmPassword) {
        showCustomAlert("Please fill all fields");
        return;
      }

      if (password !== ConfirmPassword) {
        showCustomAlert("Passwords do not match");
        return;
      }
    }

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/");
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const handleSignUp = async () => {
    if (!backendImage) {
      showCustomAlert("Please select a profile picture");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("userName", UserName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("photoUrl", backendImage);

      const result = await axios.post(
        `${serverURL}/api/auth/signup`,
        formData,
        { withCredentials: true }
      );

      console.log(result.data);
      dispatch(setUserData(result.data))
      navigate("/");
      setLoading(false)
      showCustomAlert("Account Created Successfully")
    } catch (error) {
      console.error(error);

      showCustomAlert(
        error.response?.data?.message ||
        "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#181818] px-4">
      <div className="bg-[#202124] rounded-2xl p-8 w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="text-gray-400 mr-3 hover:text-white transition"
          >
            <FaArrowLeft size={20} />
          </button>

          <h1 className="text-white text-2xl font-semibold">
            Create Account
          </h1>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`h-2 w-16 rounded-full transition-all ${step >= item ? "bg-red-600" : "bg-gray-600"
                }`}
            />
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-600 p-2 rounded-full">
                <FaPlay className="text-white" />
              </div>

              <h2 className="text-white text-xl font-medium">
                Basic Information
              </h2>
            </div>

            <input
              type="text"
              placeholder="Username"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-lg bg-[#2d2f31] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-6 px-4 py-3 rounded-lg bg-[#2d2f31] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              onClick={handleNext}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition duration-300"
            >
              Next
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-600 p-2 rounded-full">
                <FaPlay className="text-white" />
              </div>

              <h2 className="text-white text-xl font-medium">
                Security Setup
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-[#2d2f31] text-gray-300 px-4 py-2 rounded-full w-fit mb-6">
              <FaUserCircle />
              <span>{email}</span>
            </div>

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg bg-[#2d2f31] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-lg bg-[#2d2f31] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <div className="flex items-center gap-2 mb-6">
              <input
                type="checkbox"
                id="showpass"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="accent-red-600"
              />

              <label
                htmlFor="showpass"
                className="text-gray-300 text-sm cursor-pointer"
              >
                Show Password
              </label>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition duration-300"
            >
              Next
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-600 p-2 rounded-full">
                <FaPlay className="text-white" />
              </div>

              <h2 className="text-white text-xl font-medium">
                Choose Avatar
              </h2>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 bg-[#2d2f31] flex items-center justify-center">
                {frontendImage ? (
                  <img
                    src={frontendImage}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-7xl text-gray-500" />
                )}
              </div>

              <p className="text-gray-400 text-sm mt-3">
                Upload your profile picture
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="avatar"
                className="flex items-center justify-center w-full px-4 py-3 bg-[#2d2f31] border border-gray-600 rounded-lg text-gray-300 cursor-pointer hover:bg-[#303134] transition"
              >
                Choose Profile Picture
              </label>

              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </div>

            {backendImage && (
              <p className="text-center text-green-400 text-sm mb-6">
                {backendImage.name}
              </p>
            )}

            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center"
            >
              {loading ? (
                <ClipLoader color="white" size={20} />
              ) : (
                "Create Account"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SignUp;