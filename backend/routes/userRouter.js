import express from "express";
import { createChannel, getChannelData, getCurrentUser } from "../controllers/userController.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.get("/getuser", isAuth, getCurrentUser)
userRouter.post("/createchannel", isAuth, upload.fields([{ name: "avatar", maxCount: 1 }, { name: "banner", maxCount: 1 }]), createChannel)
userRouter.get("/getchannel", isAuth, getChannelData)
export default userRouter;
