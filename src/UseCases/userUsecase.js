const encryptService = require("../Frameworks/Services/encryptService")
const userRepository = require('../Frameworks/Repositories/UserRepository');
const jwt = require('../Frameworks/Services/jwtService')

const registerUser = async (user) => {
    try {
        //Hash the password using Bcrypt or similar
        const hashedPassword = await encryptService.hashData(user.password)

        const newUserDetails = {
            fName: user.firstName,
            lName: user.lastName,
            phone: user.phone,
            email: user.email,
            password: hashedPassword,
        }

        const response = await userRepository.createUser(newUserDetails)
        const tokenData = await jwt.createToken(response._id)

        if (!response.success) {
            return {
                status: 500,
                success: false,
                message: response.message,
            }
        } else {
            return {
                status: 201,
                success: true,
                data: response.data,
                accessToken: tokenData.data,
            }
        }

    } catch (error) {
        return {
            status: 500,
            success: false,
            message: error.message

        }
    }
}




module.exports = {
    registerUser,
}