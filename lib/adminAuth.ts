import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { connectDB, getMongoUri } from "@/lib/db";
import User from "@/lib/models/User";

interface AdminToken {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}

export const DEFAULT_ADMIN_EMAILS = ["estabizz@gmail.com", "info@estabizz.com"];

function getJwtSecret() {
    return process.env.JWT_SECRET || "";
}

function getAdminEmails() {
    const configured = (process.env.ADMIN_EMAILS || process.env.ESTABIZZ_ADMIN_EMAIL || "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);

    return Array.from(new Set([...configured, ...DEFAULT_ADMIN_EMAILS]));
}

export async function getAdminUserByEmail(email: string) {
    if (!email || !getMongoUri()) return null;
    await connectDB();
    return User.findOne({ email: email.toLowerCase().trim(), role: "admin" }).lean();
}

export function isAdminEmail(email?: string | null) {
    if (!email) return false;
    const adminEmails = getAdminEmails();
    return adminEmails.includes(email.toLowerCase().trim());
}

export function hasAdminPermission(token: AdminToken | null, _permission = "blogs:manage") {
    if (!token?.email) return false;
    if (token.role === "admin") return true;
    return isAdminEmail(token.email);
}

export function canManageBlogs(token: AdminToken | null) {
    return hasAdminPermission(token, "blogs:manage");
}

export function canApproveBlogs(token: AdminToken | null) {
    return hasAdminPermission(token, "blogs:approve");
}

export function canPublishBlogs(token: AdminToken | null) {
    return hasAdminPermission(token, "blogs:publish");
}

export function isAdminToken(token: AdminToken | null) {
    return canManageBlogs(token);
}

export function verifyAdminCookie(tokenValue?: string) {
    const secret = getJwtSecret();
    if (!secret || !tokenValue) return null;

    try {
        const decoded = jwt.verify(tokenValue, secret) as AdminToken;
        return isAdminToken(decoded) ? decoded : null;
    } catch {
        return null;
    }
}

export async function requireAdminPage() {
    const cookieStore = await cookies();
    const admin = verifyAdminCookie(cookieStore.get("auth_token")?.value);

    if (!admin) {
        redirect("/login?next=/admin/blogs");
    }

    return admin;
}

export function requireAdminRequest(req: NextRequest) {
    const admin = verifyAdminCookie(req.cookies.get("auth_token")?.value);

    if (!admin) {
        return {
            admin: null,
            response: NextResponse.json(
                { error: "Admin access required. Configure ADMIN_EMAILS and login with an authorised account." },
                { status: 401 }
            ),
        };
    }

    return { admin, response: null };
}
