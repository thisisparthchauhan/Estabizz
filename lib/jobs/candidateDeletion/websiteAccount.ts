import "server-only";

import bcrypt from "bcryptjs";
import { Types } from "mongoose";

import { connectDB } from "@/lib/db";
import BlogModel from "@/lib/models/Blog";
import User from "@/lib/models/User";

import { ANONYMISED_NAME } from "./types";

/**
 * Erasure of the website (MongoDB) side of a candidate account.
 *
 * Dependency audit that shaped this:
 *   - No Mongo model references `User` by ObjectId. There are no hard
 *     dependencies to break, so the auth record itself can be removed.
 *   - Blogs are linked to a person by EMAIL, not by user id, and both
 *     `author` and `submittedBy` hold denormalised copies of their name and
 *     email. Deleting the User alone would leave that personal data behind in
 *     public content, so attribution is anonymised.
 *   - `AdminUser` lives in a separate `admin_users` collection and is never
 *     touched by this path.
 *   - `Lead` records are contact-form enquiries keyed by email, not by account.
 *     They are a separate commercial record with their own erasure path and are
 *     deliberately NOT removed here.
 */
export interface WebsiteAccountErasureResult {
  userDeleted: boolean;
  blogsAnonymised: number;
}

export interface WebsiteAccountEraser {
  /** Confirms the supplied password belongs to this website user. */
  verifyPassword(_input: { websiteUserId: string; password: string }): Promise<boolean>;
  eraseWebsiteAccount(_input: {
    websiteUserId: string;
    email: string;
  }): Promise<WebsiteAccountErasureResult>;
}

export class MongoWebsiteAccountEraser implements WebsiteAccountEraser {
  async verifyPassword(input: { websiteUserId: string; password: string }): Promise<boolean> {
    if (!Types.ObjectId.isValid(input.websiteUserId) || !input.password) {
      return false;
    }

    await connectDB();

    // `password` is `select: false` on the schema and must be asked for.
    const user = await User.findById(input.websiteUserId).select("+password").exec();

    if (!user?.password) {
      return false;
    }

    return bcrypt.compare(input.password, user.password);
  }

  async eraseWebsiteAccount(input: {
    websiteUserId: string;
    email: string;
  }): Promise<WebsiteAccountErasureResult> {
    if (!Types.ObjectId.isValid(input.websiteUserId)) {
      return { userDeleted: false, blogsAnonymised: 0 };
    }

    await connectDB();

    // Attribution first: while the account still exists, so a failure here
    // leaves a state the candidate can retry from rather than an orphaned
    // article carrying their name with no account to trace it to.
    const blogsAnonymised = await this.anonymiseBlogAttribution(input.email);

    const deletion = await User.deleteOne({ _id: input.websiteUserId }).exec();

    return {
      userDeleted: deletion.deletedCount > 0,
      blogsAnonymised,
    };
  }

  /**
   * Strips the author's identity from their submitted articles.
   *
   * A published article is retained public content; its authorship is the
   * personal data. `submittedBy` is removed outright and the denormalised
   * author name and email are replaced with a tombstone.
   */
  private async anonymiseBlogAttribution(email: string): Promise<number> {
    if (!email) {
      return 0;
    }

    const normalized = email.toLowerCase().trim();
    const result = await BlogModel.updateMany(
      {
        $or: [{ "author.email": normalized }, { "submittedBy.email": normalized }],
      },
      {
        $set: {
          "author.firstName": ANONYMISED_NAME,
          "author.lastName": "",
          "author.email": "",
          "author.bio": "",
          "author.id": "",
        },
        $unset: { submittedBy: "" },
      },
    ).exec();

    return result.modifiedCount ?? 0;
  }
}
