import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    image: String,
    role: String,
    isBlocked: Boolean,
    isVerified: Boolean,
    qualification: String,
    address: {
        streetAddress: String,
        landmark: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
    },
    enrolls: [],
    createdAt: Date,
}

const userSchema: Schema<User> = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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
    address: {
        streetAddress: { type: String },
        landmark: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: String }
    },
    enrolls: [{
        courseId: {
            type: mongoose.Types.ObjectId,
            ref: 'Course'
        },
        Progress: { type: mongoose.Types.Decimal128 },
    }],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const UserModel = mongoose.model<User>('user', userSchema)
export { UserModel }