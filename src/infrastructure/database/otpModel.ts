import mongoose, { Schema } from "mongoose";
import Otp from "../../domain/otp";

// Declare the Schema of the Mongo model
var otpSchema: Schema<Otp> = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    expiresAt: {
        type: Date,
        default: new Date(Date.now() + 900000),
        index: {expires : 0}
    }

});

const OtpModel = mongoose.model<Otp>('Otp', otpSchema);
export { OtpModel }