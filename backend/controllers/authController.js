import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import gentoken from "../config/token.js";


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