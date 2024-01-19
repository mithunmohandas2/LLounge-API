import { ObjectId } from "mongoose";

export interface Courses {
    _id: ObjectId;
    image: string,
    courseId: ObjectId;
    branchId: ObjectId;
    courseName: string;
    description?: string;
    fee: number;
    isBlocked: boolean;
    tutor?: ObjectId;
    status?: string;
    modules?: Module[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Branch {
    _id: ObjectId;
    branchName: string;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Module {
    _id?: ObjectId;
    courseId: ObjectId;
    content: string;
    duration: string;
    materials: string;
    modName: string;
}


export interface enrollments {
    courseId: ObjectId;
    users: {
        userId: ObjectId,
        progress: number,
    }[]
}

export interface certificate {
    userId: ObjectId,
    courseId: ObjectId,
    courseName: string;
    userName: string;
    marks: number;
    tutorName: string;
    createdAt: Date;
}