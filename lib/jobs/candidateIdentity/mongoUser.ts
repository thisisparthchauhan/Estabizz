import "server-only";

import { Types } from "mongoose";

import type { AuthSession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import type { WebsiteUserIdentity } from "./types";

export async function loadAuthenticatedWebsiteUser(
  session: AuthSession,
): Promise<WebsiteUserIdentity | null> {
  if (!Types.ObjectId.isValid(session.userId)) {
    return null;
  }

  await connectDB();

  const user = await User.findById(session.userId)
    .select("firstName lastName email mobile")
    .exec();

  if (!user) {
    return null;
  }

  return {
    userId: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    mobile: user.mobile,
  };
}
