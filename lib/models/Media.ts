import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMedia extends Document {
    url: string;
    alt: string;
    caption?: string;
    fileName?: string;
    mimeType?: string;
    source: "admin" | "user";
    createdAt: Date;
    updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
    {
        url: { type: String, required: true },
        alt: { type: String, required: true, trim: true },
        caption: { type: String, trim: true },
        fileName: { type: String, trim: true },
        mimeType: { type: String, trim: true },
        source: { type: String, enum: ["admin", "user"], default: "admin" },
    },
    { timestamps: true }
);

const Media: Model<IMedia> = mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);

export default Media;
