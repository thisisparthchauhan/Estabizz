import mongoose, { Schema, Document, Model } from "mongoose";

export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "archived";

export interface ILead extends Document {
    name: string;
    email: string;
    phone: string;
    company?: string;
    service?: string;
    businessStage: string;
    regulator: string;
    urgency: string;
    existingEntity: string;
    capitalReadiness?: string;
    preferredCallbackTime?: string;
    message?: string;
    source: string;
    status: LeadStatus;
    attachedDocument?: {
        fileName: string;
        mimeType: string;
        size: number;
        dataUrl?: string;
    };
    meta?: {
        ip?: string;
        userAgent?: string;
        pageUrl?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, required: true, trim: true },
        company: { type: String, trim: true },
        service: { type: String, trim: true },
        businessStage: { type: String, required: true, trim: true },
        regulator: { type: String, required: true, trim: true },
        urgency: { type: String, required: true, trim: true },
        existingEntity: { type: String, required: true, trim: true },
        capitalReadiness: { type: String, trim: true },
        preferredCallbackTime: { type: String, trim: true },
        message: { type: String, trim: true },
        source: { type: String, default: "website", trim: true },
        status: { type: String, enum: ["new", "contacted", "qualified", "closed", "archived"], default: "new" },
        attachedDocument: {
            fileName: { type: String, trim: true },
            mimeType: { type: String, trim: true },
            size: { type: Number },
            dataUrl: { type: String },
        },
        meta: {
            ip: { type: String, trim: true },
            userAgent: { type: String, trim: true },
            pageUrl: { type: String, trim: true },
        },
    },
    { timestamps: true }
);

LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ email: 1, createdAt: -1 });
LeadSchema.index({ status: 1, createdAt: -1 });

const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
