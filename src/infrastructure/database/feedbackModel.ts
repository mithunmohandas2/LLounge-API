import mongoose, { Schema } from "mongoose";
import { feedback } from "../../domain/feedback";

const feedbackSchema: Schema<feedback> = new mongoose.Schema({

    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'course'
    },
    userFeedback: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        rating: {
            type: Number,
        },
        review: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }],

})

const feedbackModel = mongoose.model<feedback>('feedback', feedbackSchema)
export { feedbackModel }