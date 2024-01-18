import { ObjectId } from "mongoose";

export interface feedback {
    courseId: ObjectId;
    userFeedback: {
        userId: ObjectId,
        rating: number,
        review: string,
        createdAt: Date
    }[]
}