const jwt = require('jsonwebtoken');

const createToken = async (data) => {
    try {
        const jwtToken =  await jwt.sign({ userData: data }, process.env.secretJWT, { expiresIn: '24h' });
        return {
            success: true,
            message: "Token created",
            data: jwtToken
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

module.exports = {
    createToken,
}
