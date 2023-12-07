import { OtpModel } from '../database/otpModel'
import { UserModel } from '../database/userModel';

export const saveOtp = async (email: string, otp: string) => {
    await OtpModel.findOneAndDelete({ email });
    const newUser = new OtpModel({ email, otp })
    const data = await newUser.save()
    return data;
}

export const verifyOTP = async (email: string, otp: string) => {
    const savedOtp = await OtpModel.findOne({ email });
    if (savedOtp?.otp === otp) {
        const existingUser = await UserModel.findOne({ email })
        return {
            status: 200,
            data: existingUser,
            message: 'User details found in database'
        }
    }else{
        return {
            status: 400,
            message: 'Incorrect OTP'
        }
    }
}
