import User from '../../domain/user'
import { UserModel } from '../database/userModel'
import UserRepository from '../../use_case/interface/userController'

class userRepository implements UserRepository {
    async save(user: User) {
        const newUser = new UserModel(user)
        await newUser.save()
        return {
            success: true,
            data: newUser,
            message: 'User registration successful',
        }
    }

    async findByEmail(email: string) {
        console.log('email exist check')
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return {
                success: true,
                data: existingUser,
                message: 'User details found in database'
            }
        }
        else {
            return null
        }
    }

    async findByPhone(phone: string) {
        console.log('phone exist check')
        const existingUser = await UserModel.findOne({ phone })
        if (existingUser) {
            return {
                success: true,
                data: existingUser,
                message: 'User details found in database'
            }
        }
        else {
            return null
        }
    }
}
export default userRepository