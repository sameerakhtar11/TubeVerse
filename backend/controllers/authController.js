import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import gentoken from "../config/token.js";
import sendMail from "../config/sendMail.js";


export const signUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        let photoUrl;
        if (req.file) {
            photoUrl = await uploadOnCloudinary(req.file.path)
        }
        const existUser = await User.findOne({ email })

        if (existUser) {
            return res.status(400).json({ message: "User Already Exist" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be greater than 8 character" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            userName,
            email,
            password: hashPassword,
            photoUrl
        })

        let token = await gentoken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            samesite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({ message: `SignUp error ${error}` })
    }
}


export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password",
            });
        }

        const token = await gentoken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Sign In Successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: `SignIn error ${error}`,
        });
    }
};

export const signOut = async (req, res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({ message: "SignOut Successfully" })
    } catch (error) {
        return res.status(500).json({ message: `SignOut error ${error}` })

    }
}


export const googleAuth = async (req, res) => {
    try {
        const { userName, email, photoUrl } = req.body;
        let googlePhoto = photoUrl;
        if (photoUrl) {
            try {
                googlePhoto = await uploadOnCloudinary(photoUrl);
            } catch (error) {
                // return res.status(400).json({message:"Cloudinary upload Failed"})
                console.log("Cloudinary upload Failed")
            }
        }


        const user = await User.findOne({ email })
        if (!user) {
            await User.create({
                userName,
                email,
                photoUrl: googlePhoto

            })
        }
        else {
            if (!user.photoUrl && googlePhoto) {
                user.photoUrl = googlePhoto
                await user.save()
            }
        }

        const token = await gentoken(user?._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Sign In Successfully",
            user,
        });
    }
    catch (error) {
        return res.status(500).json({ message: `GoogleAuth error ${error}` })

    }
}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Please Enter Your Email" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User Not Found" })
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        user.isOtpVerified = false;
        await user.save();
        await sendMail({ to: email, otp })
        return res.status(200).json({ message: "OTP sent successfully" })

    } catch (error) {
        return res.status(500).json({ message: `otp send error ${error}` })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Please Provide Both Email and Otp" })
        }
        const user = await User.findOne({ email })
        if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Otp Is Incorrect or Expired" })
        }

        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;
        await user.save();
        return res.status(200).json({ message: "Otp Verified Successfully" })
    } catch (error) {
        return res.status(500).json({ message: `otp verify error ${error}` })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ message: "Please Provide All Fields" })
        }
        const user = await User.findOne({ email })
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({ message: "User Not Found or Otp Not Verified" })
        }

        if (password != confirmPassword) {
            return res.status(400).json({ message: "Password And Confirm Password Not Match" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        user.password = hashPassword;
        user.resetOtp = undefined;
        user.otpExpires = undefined;
        user.isOtpVerified = false;
        await user.save();
        return res.status(200).json({ message: "Password Reset Successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Reset Password error ${error}` })
    }
}


