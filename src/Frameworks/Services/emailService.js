const nodemailer = require('nodemailer');
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
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Mail Server Initialized : " + success)
    }
});

//=======send email============
async function sendEmail(email, mailSubject, message) {
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
async function verifyEmail(email) {
    const Otp = await otpService.generateOTP(4); //OTP digits given as parameter
    const sendOtp = await sendEmail( //send OTP as Email
        email,
        mailSubject = 'Email Verification',
        message = `<p>Your Email ID : ${email}</p> <p style ="color:tomato; font-size:25px; letter-spacing:2px;"><b> ${Otp}</b></p> 
     <p>This code can be used to verify your email in Learner's Lounge.
      The code expire in 15 minutes`
    )

    if (!sendOtp.success) {
        return res.status(400).json({
            success: false,
            message: sendOtp.message
        });
    }
}

module.exports = {
    sendEmail,
    verifyEmail,
}