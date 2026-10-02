import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Newsletter subscribers — the `subscribers` collection.
 *
 * Deliberately separate from `leads`: a lead is someone asking for a specific
 * service and expecting a reply, a subscriber is only consent to receive the
 * newsletter. Mixing them would corrupt the lead pipeline's counts and let a
 * newsletter signup be worked as an enquiry.
 *
 * `email` is uniquely indexed, so re-subscribing updates the existing row
 * rather than creating a duplicate (see app/api/subscribe/route.ts).
 */
export interface ISubscriber extends Document {
  email: string;
  status: string;          // 'active' | 'unsubscribed'
  source: string;          // 'footer' | 'blog' | …  where they signed up
  pageUrl: string;         // path only, no query string
  unsubscribedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email:  { type: String, required: true, trim: true, lowercase: true, maxlength: 160, unique: true },
    status: { type: String, default: 'active', index: true },
    source: { type: String, default: 'footer', index: true },
    pageUrl: { type: String, default: '', trim: true, maxlength: 200 },
    unsubscribedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: 'subscribers' }
);

SubscriberSchema.index({ createdAt: -1 });

const SubscriberModel: Model<ISubscriber> =
  mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);

export default SubscriberModel;
