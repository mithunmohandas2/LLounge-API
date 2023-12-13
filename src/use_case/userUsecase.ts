import User from "../domain/user";
import userRepository from "../infrastructure/repository/userRepository";
import { verifyOTP } from "../infrastructure/repository/otpRepository";
import { verifyEmail } from "./interface/emailService";
import BcryptPasswordHashingService from './interface/encryptService';
import JWTService from "./interface/jwtService";
import Otp from "../domain/otp";
import adminRepository from "../infrastructure/repository/adminRepository";

const encryptService = new BcryptPasswordHashingService();
const tokenService = new JWTService()
const adminrepository = new adminRepository()

class Userusecase {
    private userRepository: userRepository
    constructor(userRepository: userRepository) {
        this.userRepository = userRepository
    }

    async register(user: User) {
        console.log('inside useCase')
        const emailFound = await this.userRepository.findByEmail(user.email)
        const phoneFound = await this.userRepository.findByPhone(user.phone)
        if (emailFound?.success || phoneFound?.success) {
            return {
                status: 400,
                message: 'User already exists',
            }
        }
        else {
            const newPassword = await encryptService.hashData(user.password) //Hashing password
            user.password = newPassword
            const registerData = await this.userRepository.save(user)
            return {
                status: 200,
                message: registerData.message,
                data: registerData.data,
            }
        }
    }


    async signIn(user: User) {
        console.log('inside useCase')
        const userFound = await this.userRepository.findByEmail(user.email)
        if (userFound) {
            if (userFound.data.isBlocked) {
                return {
                    status: 400,
                    message: 'User blocked by admin'
                }
            }
            const hashed = userFound.data.password
            const isValid = await encryptService.verifyHashData(user.password, hashed)  //not working
            console.log(isValid)
            if (!isValid) {
                return {
                    status: 400,
                    message: 'Invalid Credentials'
                }
            }
            const token = await tokenService.createToken(userFound.data._id, userFound.data.role)
            // console.log(token)
            return {
                status: 200,
                message: 'Valid User',
                data: userFound.data,
                token: token,
            }
        } else {
            return {
                status: 400,
                message: 'Invalid Credentials'
            }
        }
    }

    async sendOTP(user: User) {
        console.log('inside useCase')
        const userFound = await this.userRepository.findByEmail(user.email)
        if (!userFound) {         //unregistered user
            return {
                status: 400,
                message: 'Email not registered'
            }
        }
        if (userFound.data.isBlocked) {
            return {
                status: 400,
                message: 'User blocked by admin'
            }
        }
        //send OTP mail   
        const sentMail = await verifyEmail(user.email)

        return {
            status: sentMail.status,
            message: sentMail.message,
        }
    }


    async verifyOTP(user: Otp) {
        console.log('inside useCase')
        return await verifyOTP(user.email, user.otp)
    }

    async tokenDecode(data: { token: string }) {
        console.log('inside useCase')
        if (!data.token) return {
            status: 401,
            message: 'Token misssing, Please login again',
        }
        const response = await tokenService.verifyToken(data.token)
        const _id = response?.data?.userData
        const User = await adminrepository.findById(_id)
        console.log(User)
        return {
            status: 200,
            message: User.message,
            data: User.data,
        }
    }

}

export default Userusecase