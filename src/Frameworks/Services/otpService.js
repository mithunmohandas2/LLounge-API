

const generateOTP = async (digits) => {
    try {
        return (otp = `${Math.floor(Math.pow(10, digits) + Math.random() * 9 * Math.pow(10, digits))}`)
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: "Unable to generate OTP",
        };
    }
}

module.exports = {
    generateOTP,
}