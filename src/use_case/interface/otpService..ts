

export const generateOTP = async (digits: number) => {
    try {
        return `${Math.floor(Math.pow(10, digits) + Math.random() * 9 * Math.pow(10, digits))}`

    } catch (error:any) {
        console.log(error.message)
        return {
            success: false,
            message: "Unable to generate OTP",
        };
    }
}