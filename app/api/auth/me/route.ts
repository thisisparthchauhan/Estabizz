import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getAdminUserByEmail, isAdminEmail } from "@/lib/adminAuth";

interface AuthToken {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: "user" | "admin";
}

export async function GET() {
    const secret = process.env.JWT_SECRET;
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!secret || !token) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, secret) as AuthToken;
        const adminUser = decoded.email && isAdminEmail(decoded.email)
            ? await getAdminUserByEmail(decoded.email)
            : null;
        const role = adminUser ? "admin" : "user";

        return NextResponse.json({
            user: {
                id: decoded.id,
                email: decoded.email,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                role,
            },
        });
    } catch {
        return NextResponse.json({ user: null }, { status: 401 });
    }
}
