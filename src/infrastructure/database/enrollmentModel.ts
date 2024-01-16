import mongoose, { Schema } from "mongoose";
import { enrollments } from "../../domain/courses";



const enrollmentSchema: Schema<enrollments> = new mongoose.Schema({

    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'course'
    },
    users: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        marks: {
            type: Number,
            default: 0
        }
    }],

})

const enrollmentModel = mongoose.model<enrollments>('enrollment', enrollmentSchema)
export { enrollmentModel }