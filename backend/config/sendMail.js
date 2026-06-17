import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config()
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
    },
});

const sendMail = async ({ to, otp }) => {

    await transporter.sendMail({
        from: process.env.USER,
        to: to,
        subject: "Reset Your Password",
        html: `
      <p>Your OTP for resetting your password is ${otp}</p>
      <p>This OTP will expire in 5 minutes</p>
      `,
    })

}

export default sendMail;
