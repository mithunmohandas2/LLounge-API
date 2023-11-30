const userRepository = require('../Frameworks/Repositories/UserRepository');
const userUsercase = require('../UseCases/userUsecase')

// Validation function for email using regex
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validation function for phone number using regex and minimum length
function isValidPhoneNumber(phone) {
    const phoneRegex = /^\d{10,13}$/; // minimum 10 digits
    return phoneRegex.test(phone);
}

// Validation function for password minimum length
function isValidPassword(password) {
    return password.length >= 6; // minimum length of password
}

const registerUser = async (req, res) => {
    try {
        let { firstName, lastName, email, phone, password } = req.body

        firstName = firstName.trim();
        lastName = lastName.trim();
        email = email.trim();
        phone = phone.trim();
        password = password.trim();

        if (!firstName || !email || !password || !phone) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        if (!isValidEmail(email)) {             // Validate email format
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        if (!isValidPhoneNumber(phone)) {        // Validate phone number
            return res.status(400).json({ success: false, message: "Invalid phone number" });
        }


        if (!isValidPassword(password)) {        // Validate password
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        // Check for existing user
        const userEmailMatch = await userRepository.findByEmail(email);
        const userPhoneMatch = await userRepository.findByPhone(phone);

        if (userEmailMatch.success || userPhoneMatch.success) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        let user = {
            firstName, lastName, email, phone, password
        }

        const response = await userUsercase.registerUser(user)

        if (!response?.success) {
            return res.status(500).json(response)
        }

        // console.log(response.user,"checking for seessin");
        // req.session.user=response.user;
        // req.session.user = response.user;
        // console.log('User details set in session:', req.session.user);

        res.status(response?.status).json(response)

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    registerUser,
}