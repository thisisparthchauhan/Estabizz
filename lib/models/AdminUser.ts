import mongoose, { Schema, Document, Model } from 'mongoose';
import type { AdminRole, AdminStatus, AdminPermission } from '@/lib/admin/types';

// ─────────────────────────────────────────────────────────────────────────────
// Mongoose document interface
// ─────────────────────────────────────────────────────────────────────────────

export interface IAdminUser extends Document {
  fullName: string;
  email: string;           // unique, lowercase
  role: AdminRole;
  status: AdminStatus;
  permissions: AdminPermission[];
  passwordHash?: string;   // bcryptjs hash — optional, see types.ts comment
  authProviderId?: string; // reserved for future OAuth
  emailVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

const AdminUserSchema = new Schema<IAdminUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,           // enforced at database level
      lowercase: true,        // always stored in lowercase
      trim: true,
      index: true,
    },

    role: {
      type: String,
      required: true,
      enum: ['super_admin', 'admin', 'editor', 'reviewer'] satisfies AdminRole[],
      default: 'editor',
    },

    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive', 'suspended'] satisfies AdminStatus[],
      default: 'inactive',    // new accounts start inactive until explicitly activated
    },

    permissions: {
      type: [String],
      required: true,
      default: [],
      validate: {
        validator: (arr: string[]) => Array.isArray(arr),
        message: 'permissions must be an array',
      },
    },

    // Optional — populated by the seed script or admin setup flow
    passwordHash: {
      type: String,
      select: false,          // never returned in queries unless explicitly requested
    },

    authProviderId: {
      type: String,
      trim: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // auto-manages createdAt and updatedAt
    collection: 'admin_users',
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────

// Compound index used by the admin auth check (email + status filter)
AdminUserSchema.index({ email: 1, status: 1 });

// ─── Instance helpers ─────────────────────────────────────────────────────────

AdminUserSchema.methods.hasPermission = function (
  this: IAdminUser,
  permission: AdminPermission
): boolean {
  return this.permissions.includes(permission);
};

// ─── Model ───────────────────────────────────────────────────────────────────

// Guard against model re-registration in Next.js hot-reload cycles
const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser ||
  mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);

export default AdminUser;
