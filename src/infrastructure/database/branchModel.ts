import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { Branch } from '../../domain/courses';



const BranchesSchema: Schema = new Schema({
    branchName: {
        type: String,
        required: true,
        unique: true
    },
    isBlocked: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const BranchModel = mongoose.model<Branch>('branch', BranchesSchema);

export default BranchModel;

