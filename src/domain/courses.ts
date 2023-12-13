import { Decimal128, ObjectId } from "mongoose";

export interface Courses{
    _id?: ObjectId;
    branch: ObjectId;
    courseName: string;
    Description?: string;
    Fee: Decimal128;
    IsBlocked: boolean;
    Instructor?: ObjectId[];
    Status?: string;
    modules?: {
        Content: string;
        Duration: string;
        Materials: string;
        ModName: string;
    }[];
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface Branch extends Document {
    _id: ObjectId;
    branchName: string;
    isBlocked:boolean;
    CreatedAt: Date;
    UpdatedAt: Date;
}