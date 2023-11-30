const createUser = () => ({
    fName,
    lName,
    email,
    phone,
    password,
    image,
    role: 'user',
    isBlocked: false,
    isVerified: false,
    qualification: null,
    address: {},
    enrolls: [{
        courseId: {},
        Progress: {},
    }]
})