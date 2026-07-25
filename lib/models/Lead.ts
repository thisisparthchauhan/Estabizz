import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  source: string;          // 'contact' | 'get-started' | 'global-market-page'
  status: string;          // 'new' | 'contacted' | 'closed'
  // Global market fields
  selectedCountry?: string;
  countrySlug?: string;
  region?: string;
  marketTier?: string;     // 'active' | 'developing' | 'planned'
  timeline?: string;
  businessActivity?: string;
  expansionDirection?: string;
  currentStage?: string;
  supportRequired?: string;
  preferredContactMethod?: string;
  pageUrl?: string;
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
    // Global market fields (server-resolved, not client-trusted for slug resolution)
    selectedCountry:       { type: String, default: '', trim: true, maxlength: 100 },
    countrySlug:           { type: String, default: '', trim: true, maxlength: 100 },
    region:                { type: String, default: '', trim: true, maxlength: 80  },
    marketTier:            { type: String, default: '', trim: true, maxlength: 20  },
    timeline:              { type: String, default: '', trim: true, maxlength: 80  },
    businessActivity:      { type: String, default: '', trim: true, maxlength: 160 },
    expansionDirection:    { type: String, default: '', trim: true, maxlength: 160 },
    currentStage:          { type: String, default: '', trim: true, maxlength: 160 },
    supportRequired:       { type: String, default: '', trim: true, maxlength: 160 },
    preferredContactMethod:{ type: String, default: '', trim: true, maxlength: 80  },
    pageUrl:               { type: String, default: '', trim: true, maxlength: 400 },
  },
  { timestamps: true, collection: 'leads' }
);

LeadSchema.index({ createdAt: -1 });

const LeadModel: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default LeadModel;
