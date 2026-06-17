import express from "express"
import upload from "../middleware/multer.js"
import { signOut, signUp, signIn, googleAuth, sendOtp, verifyOtp, resetPassword } from "../controllers/authController.js"

const authRouter = express.Router()

authRouter.post("/signup", upload.single("photoUrl"), signUp)
authRouter.post("/signin", signIn)
authRouter.get("/signout", signOut)
authRouter.post("/googleauth", upload.single("photoUrl"), googleAuth)
authRouter.post("/sendotp", sendOtp)
authRouter.post("/verifyotp", verifyOtp)
authRouter.post("/resetpassword", resetPassword)
export default authRouter;