import mongoose, { Schema } from "mongoose";
import { certificate } from "../../domain/courses";

const certificateSchema: Schema<certificate> = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    tutorName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    marks: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

const certificateModel = mongoose.model<certificate>('certificate', certificateSchema)
export { certificateModel }