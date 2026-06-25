import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMediaAsset extends Document {
  title: string;
  fileName: string;
  url: string;
  secureUrl: string;
  publicId: string;
  resourceType: string;
  format: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  altText: string;
  caption: string;
  tags: string[];
  folder: string;
  uploadedBy: string;
  uploadedByRole: string;
  usedIn: string[];
  status: 'active' | 'removed';
  createdAt: Date;
  updatedAt: Date;
}

const MediaAssetSchema = new Schema<IMediaAsset>(
  {
    title:          { type: String, default: '' },
    fileName:       { type: String, required: true },
    url:            { type: String, required: true },
    secureUrl:      { type: String, required: true },
    publicId:       { type: String, required: true, unique: true, index: true },
    resourceType:   { type: String, default: 'image' },
    format:         { type: String, default: '' },
    mimeType:       { type: String, default: '' },
    size:           { type: Number, default: 0 },
    width:          { type: Number },
    height:         { type: Number },
    altText:        { type: String, default: '' },
    caption:        { type: String, default: '' },
    tags:           { type: [String], default: [] },
    folder:         { type: String, default: '' },
    uploadedBy:     { type: String, required: true },
    uploadedByRole: { type: String, default: '' },
    usedIn:         { type: [String], default: [] },
    status:         {
      type: String,
      enum: ['active', 'removed'],
      default: 'active',
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'media_assets',
    minimize: false,
  }
);

MediaAssetSchema.index({ createdAt: -1 });
MediaAssetSchema.index({ format: 1, status: 1 });
MediaAssetSchema.index(
  { title: 'text', fileName: 'text', altText: 'text', caption: 'text', tags: 'text' },
  { name: 'media_text_search' }
);

const MediaAsset: Model<IMediaAsset> =
  mongoose.models.MediaAsset ||
  mongoose.model<IMediaAsset>('MediaAsset', MediaAssetSchema);

export default MediaAsset;
