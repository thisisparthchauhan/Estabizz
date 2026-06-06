import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/lib/models/Lead";
import { notifyLeadTeam } from "@/lib/leadNotifications";

const leadAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
const MAX_DOCUMENT_BYTES = 2 * 1024 * 1024;

const allowedBusinessStages = ["Startup", "Existing", "Regulated Entity"];
const allowedRegulators = ["RBI", "SEBI", "IRDAI", "IFSCA", "MCA", "FIU", "Other / Not Sure"];
const allowedUrgencies = ["Immediate", "15 days", "30 days", "Research stage"];
const allowedExistingEntity = ["Yes", "No"];

function validEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(req: NextRequest) {
    return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(req: NextRequest) {
    const ip = getClientIp(req);
    const now = Date.now();
    const current = leadAttempts.get(ip);

    if (!current || current.resetAt < now) {
        leadAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    current.count += 1;
    leadAttempts.set(ip, current);
    return current.count > RATE_LIMIT_MAX;
}

function clean(value: unknown, max = 500) {
    return String(value || "").trim().slice(0, max);
}

export async function POST(req: NextRequest) {
    try {
        if (checkRateLimit(req)) {
            return NextResponse.json(
                { error: "Too many enquiries from this connection. Please try again after some time." },
                { status: 429 }
            );
        }

        const payload = await req.json();
        const name = clean(payload.name, 120);
        const email = clean(payload.email, 160).toLowerCase();
        const phone = clean(payload.phone, 40);
        const businessStage = clean(payload.businessStage, 60);
        const regulator = clean(payload.regulator, 80);
        const urgency = clean(payload.urgency, 60);
        const existingEntity = clean(payload.existingEntity, 20);

        if (!name || !email || !phone || !businessStage || !regulator || !urgency || !existingEntity) {
            return NextResponse.json(
                { error: "Name, email, phone, business stage, regulator, urgency and existing entity fields are required." },
                { status: 400 }
            );
        }

        if (!validEmail(email)) {
            return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
        }

        if (!allowedBusinessStages.includes(businessStage) || !allowedRegulators.includes(regulator) || !allowedUrgencies.includes(urgency) || !allowedExistingEntity.includes(existingEntity)) {
            return NextResponse.json({ error: "Please select valid enquiry options." }, { status: 400 });
        }

        const attachedDocument = payload.attachedDocument;
        if (attachedDocument?.size && Number(attachedDocument.size) > MAX_DOCUMENT_BYTES) {
            return NextResponse.json({ error: "Uploaded document must be 2 MB or smaller." }, { status: 413 });
        }

        await connectDB();

        const lead = await Lead.create({
            name,
            email,
            phone,
            company: clean(payload.company, 160),
            service: clean(payload.service, 160),
            businessStage,
            regulator,
            urgency,
            existingEntity,
            capitalReadiness: clean(payload.capitalReadiness, 120),
            preferredCallbackTime: clean(payload.preferredCallbackTime, 120),
            message: clean(payload.message, 2500),
            source: clean(payload.source, 80) || "website",
            attachedDocument: attachedDocument
                ? {
                    fileName: clean(attachedDocument.fileName, 180),
                    mimeType: clean(attachedDocument.mimeType, 100),
                    size: Number(attachedDocument.size || 0),
                    dataUrl: clean(attachedDocument.dataUrl, 3_000_000),
                }
                : undefined,
            meta: {
                ip: getClientIp(req),
                userAgent: req.headers.get("user-agent") || "",
                pageUrl: clean(payload.pageUrl, 500),
            },
        });

        notifyLeadTeam(lead).catch((error) => {
            console.error("Lead notification failed:", error);
        });

        return NextResponse.json(
            {
                message: "Thank you. Your enquiry has been received by Estabizz Team. Our team will review your requirement and connect with you shortly.",
                leadId: String(lead._id),
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Lead submission failed:", error);
        return NextResponse.json(
            { error: "Unable to submit enquiry. Please try again or contact Estabizz at info@estabizz.com." },
            { status: 500 }
        );
    }
}
