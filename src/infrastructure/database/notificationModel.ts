import mongoose, { Schema } from "mongoose";
import { notifications } from "../../domain/notification";

const notificationSchema: Schema<notifications> = new mongoose.Schema({

    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const notificationModel = mongoose.model<notifications>('notification', notificationSchema)
export { notificationModel }