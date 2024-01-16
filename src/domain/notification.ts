import { ObjectId } from "mongoose";

export interface notifications {
    senderId: ObjectId;
    receiverId: ObjectId;
    message: string;
    createdAt: Date;
}