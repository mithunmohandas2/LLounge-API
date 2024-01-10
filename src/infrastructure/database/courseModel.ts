import mongoose, { Schema, Document, ObjectId, Decimal128 } from 'mongoose';

export interface ICourses extends Document {
    _id?: ObjectId;
    courseName: String;
    branchId: ObjectId;
    description?: String;
    fee: Decimal128;
    isBlocked: Boolean;
    tutor?: ObjectId[];
    status?: String;
    modules?: {
        modName: String;
        content: String;
        duration: String;
        materials: String;
    }[];
    createdAt?: Date;
    updatedAt?: Date;
}

const CoursesSchema: Schema = new Schema({
    courseName: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'branch',
        required: true
    },
    description: {
        type: String
    },
    fee: {
        type: Number,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    tutor: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    status: {
        type: String,
        enum: ['editRequested', 'forApproval', 'draft'],
        default: 'draft',
    },
    modules: [{
        modName: { type: String },
        content: { type: String },
        duration: { type: String },
        materials: { type: String },
    }],
}, { timestamps: true });

const CourseModel = mongoose.model<ICourses>('course', CoursesSchema);

export default CourseModel;

