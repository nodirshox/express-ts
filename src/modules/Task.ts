import mongoose, { Schema, Document } from "mongoose";

interface Task extends Document {
    title: string;
    author: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        is_active: {
            type: Boolean,
            default: true
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        },
        deleted_at: {
            type: Date
        }
    }
);

export default mongoose.model<Task>("Task", TaskSchema);