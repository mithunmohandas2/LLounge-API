const User = require('../Models/userModel')

const findByEmail = async (email) => {
    try {
        const userMatch = await User.findOne({ email })

        if (userMatch) {
            return {
                success: true,
                data: userMatch,
                message: 'User details found'
            }
        } else {
            return {
                success: false,
                message: "User not found",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

const findByPhone = async (phone) => {
    try {
        const userMatch = await User.findOne({ phone })

        if (userMatch) {
            return {
                success: true,
                data: userMatch,
                message: 'User details found'
            }
        } else {
            return {
                success: false,
                message: "User not found",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

const createUser = async (user) => {
    try {
        console.log(user, "user");   // test 

        const userData = await new User(user).save();

        return {
            success: true,
            message: "user created",
            data: userData
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

module.exports = {
    findByEmail,
    findByPhone,
    createUser,
}