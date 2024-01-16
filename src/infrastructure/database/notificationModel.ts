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
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'course'
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    expiresAt: {
        type: Date,
        default: new Date(Date.now() + (20 * 24 * 60 * 60 * 1000)), //auto delete in 20 days
        index: {expires : 0}
    }
})

const notificationModel = mongoose.model<notifications>('notification', notificationSchema)
export { notificationModel }