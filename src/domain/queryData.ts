import { ObjectId } from "mongoose";

export interface querData {
    tutorId: ObjectId;
    search: string;
    page: number;
    perPage: number;
    sort: string;
    filter: string;
}


