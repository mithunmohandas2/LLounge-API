import { ObjectId } from "mongoose";

export interface querData extends Document {
    tutorId: ObjectId;
    search: string;
    page: number;
    perPage: number;
    sort: string;
    filter: string;
}


