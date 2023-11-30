const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: { type: String },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user', 'instructor'],
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    qualification: { type: String },
    address: {},
    enrolls: [{
        courseId: {
            type: mongoose.Types.ObjectId,
            ref: 'Course'
        },
        Progress: { type: mongoose.Types.Decimal128 },
    }]

}, { timestamps: true });

//Export the model
module.exports = mongoose.model('User', userSchema);