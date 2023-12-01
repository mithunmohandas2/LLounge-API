import User from "../domain/user";
import userRepository from "../infrastructure/repository/userRepository";

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
            return {
                status: 200,
                data: 'user already exist'
            }
        }
        else {
            await this.userRepository.save(user)
            return {
                status: 200,
                data: 'user saved'
            }
        }
    }


}

export default Userusecase