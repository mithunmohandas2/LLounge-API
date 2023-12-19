import { Decimal128, ObjectId } from "mongoose";

export interface Courses {
    _id: ObjectId;
    courseId: ObjectId;
    branchId: ObjectId;
    courseName: string;
    description?: string;
    fee: number;
    isBlocked: boolean;
    tutor?: ObjectId;
    status?: string;
    modules?: {
        content: string;
        duration: string;
        materials: string;
        modName: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Branch extends Document {
    _id: ObjectId;
    branchName: string;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Module extends Document {
    courseId: ObjectId;
    content: string;
    duration: string;
    materials: string;
    modName: string;
}


