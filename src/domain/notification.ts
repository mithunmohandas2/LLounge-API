import { ObjectId } from "mongoose";

export interface notifications {
    senderId: ObjectId;
    receiverId: ObjectId;
    courseId: ObjectId;
    message: string;
    createdAt: Date;
    expiresAt?:Date;
}