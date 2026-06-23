import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Shorts from "./pages/Shorts/Shorts";
import MobileProfile from "../component/MobileProfile";
import ForgetPassword from "./pages/ForgetPassword";
import CreateChannel from "./pages/Channel/CreateChannel";
import ViewChannel from "./pages/Channel/ViewChannel";
import UpdateChannel from "./pages/Channel/UpdateChannel";

import CustomAlert, { showCustomAlert } from "../component/CustomAlert";

import GetCurrentUser from "./customHooks/GetCurrentUser";
import GetChannelData from "./customHooks/GetChannelData";
import CreatePage from "./pages/CreatePage";

export const serverURL = "http://localhost:8000";

const ProtectedRoute = ({ children }) => {
  const { userData } = useSelector((state) => state.user);

  if (!userData) {
    showCustomAlert("Please Sign In first to use this feature");
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  GetCurrentUser();
  GetChannelData();

  return (
    <>
      <CustomAlert />

      <Routes>
        {/* Home Layout */}
        <Route path="/" element={<Home />}>
          <Route
            path="shorts"
            element={
              <ProtectedRoute>
                <Shorts />
              </ProtectedRoute>
            }
          />

          <Route
            path="mobileprofile"
            element={
              <ProtectedRoute>
                <MobileProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="viewchannel"
            element={
              <ProtectedRoute>
                <ViewChannel />
              </ProtectedRoute>
            }
          />

          <Route
            path="updatechannel"
            element={
              <ProtectedRoute>
                <UpdateChannel />
              </ProtectedRoute>
            }
          />

          <Route
            path="create"
            element={
              <ProtectedRoute>
                <CreatePage />
              </ProtectedRoute>
            }
          />

        </Route>

        {/* Auth Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/createchannel"
          element={
            <ProtectedRoute>
              <CreateChannel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;