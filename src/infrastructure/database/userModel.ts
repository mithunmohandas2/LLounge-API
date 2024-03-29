import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    image: string,
    role: string,
    isBlocked: boolean,
    isVerified: boolean,
    qualification: string,
    address: {
        streetAddress: string,
        landmark: string,
        city: string,
        state: string,
        country: string,
        pincode: string,
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
        enum: ['admin', 'user', 'tutor'],
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
      createdAt: {
        type: Date,
        default: new Date()
    }
})

const UserModel = mongoose.model<User>('user', userSchema)
export { UserModel }