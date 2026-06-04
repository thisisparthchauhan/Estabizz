import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  source: string;     // 'contact' | 'get-started'
  status: string;     // 'new' | 'contacted' | 'closed'
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name:    { type: String, required: true, trim: true, maxlength: 120 },
    email:   { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone:   { type: String, default: '', trim: true, maxlength: 40 },
    company: { type: String, default: '', trim: true, maxlength: 160 },
    service: { type: String, default: '', trim: true, maxlength: 160 },
    message: { type: String, default: '', trim: true, maxlength: 4000 },
    source:  { type: String, default: 'contact', index: true },
    status:  { type: String, default: 'new', index: true },
  },
  { timestamps: true, collection: 'leads' }
);

LeadSchema.index({ createdAt: -1 });

const LeadModel: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default LeadModel;
