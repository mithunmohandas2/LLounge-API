import nodemailer from 'nodemailer'
const otpService = require('../Services/otpService');

const auth_email = process.env.auth_email
const auth_password = process.env.auth_pass

let transporter = nodemailer.createTransport({

    service: 'Gmail',
    auth: {
        user: auth_email,
        pass: auth_password,
    },
})

//test transporter
transporter.verify((error: any, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Mail Server Initialized : " + success)
    }
});

//=======send email============
export const sendEmail = async (email: string, mailSubject: string, message: string) => {
    const mailOptions = {
        from: auth_email,
        to: email,
        subject: mailSubject,
        html: message,
    }
    const sendEmail = await transporter.sendMail(mailOptions);
    if (sendEmail) {
        return {
            success: true,
            message: "Email sent successfully"
        }
    } else {
        return {
            success: false,
            message: "Failed to send email"
        }
    }
}

// -------------------------------
// Email Verification OTP 

export const verifyEmail = async (email: string) => {
    const Otp = await otpService.generateOTP(4); //OTP digits given as parameter
    let mailSubject = 'Email Verification'
    let message = `<p>Your Email ID : ${email}</p> <p style ="color:tomato; font-size:25px; letter-spacing:2px;"><b> ${Otp}</b></p> 
    <p>This code can be used to verify your email in Learner's Lounge.
     The code expire in 15 minutes`
    //send OTP as Email
    const sendOtp = await sendEmail(email, mailSubject, message)

    if (!sendOtp.success) {
        return {
            success: false,
            message: sendOtp.message
        }
    }
}