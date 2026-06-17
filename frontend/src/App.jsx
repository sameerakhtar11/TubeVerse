import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CustomAlert from "../component/CustomAlert"
import Shorts from "./pages/Shorts/Shorts"
import GetCurrentUser from "./customHooks/GetCurrentUser"
import MobileProfile from "../component/MobileProfile"
import ForgetPassword from "./pages/ForgetPassword"

export const serverURL = "http://localhost:8000"

function App() {
  GetCurrentUser()
  return (
    <>
      <CustomAlert />
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path="shorts" element={<Shorts />} />
          <Route path="mobileprofile" element={<MobileProfile />} />
        </Route>

        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

      </Routes>
    </>
  )
}

export default App
