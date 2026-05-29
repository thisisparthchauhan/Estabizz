import { NextRequest, NextResponse } from "next/server";
import { createUserSubmittedBlog } from "@/lib/blogService";
import { validateBlogImages } from "@/lib/blogSecurity";

const submissionAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function validEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkRateLimit(req: NextRequest) {
    const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const ip = forwardedFor || req.headers.get("x-real-ip") || "unknown";
    const now = Date.now();
    const current = submissionAttempts.get(ip);

    if (!current || current.resetAt < now) {
        submissionAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    current.count += 1;
    submissionAttempts.set(ip, current);
    return current.count > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
    try {
        if (checkRateLimit(req)) {
            return NextResponse.json(
                { error: "Too many submissions from this connection. Please try again after some time." },
                { status: 429 }
            );
        }

        const payload = await req.json();
        const submitter = payload.submittedBy || {};

        if (!submitter.name || !submitter.email || !payload.title || !payload.summary || !payload.content || !payload.declarationAccepted) {
            return NextResponse.json(
                { error: "Name, email, title, summary, content and declaration are required." },
                { status: 400 }
            );
        }

        if (!validEmail(String(submitter.email))) {
            return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
        }

        const imageError = validateBlogImages([payload.featuredImage, ...(payload.inlineImages || [])]);
        if (imageError) return NextResponse.json({ error: imageError }, { status: 413 });

        const blog = await createUserSubmittedBlog({
            ...payload,
            authorName: submitter.name,
            authorEmail: submitter.email,
            status: "Pending Review",
            submittedBy: submitter,
        });

        return NextResponse.json(
            {
                message: "Blog submitted for review. It will not be publicly visible until approved by Estabizz.",
                blog,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Blog submission failed:", error);
        return NextResponse.json(
            { error: "Unable to submit blog. Please try again or contact Estabizz." },
            { status: 500 }
        );
    }
}
