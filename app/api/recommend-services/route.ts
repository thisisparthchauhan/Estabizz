import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";
import {
    limitRequest,
    getClientIp,
    rateLimitResponse,
} from "@/lib/security/rateLimit";

// Maximum body size and message length.
const MAX_BODY_BYTES = 8_192;
const MAX_MESSAGE_CHARS = 3_000;

const ALL_SERVICES = [
    "NBFC Registration",
    "NBFC Account Aggregator License",
    "NBFC Business Plan",
    "Full-Fledged Money Changers License",
    "LendTech Services",
    "NBFC For Sale / Acquisition",
    "NBFC Legal Support",
    "NBFC Takeover",
    "NBFC Financial Modeling",
    "AMFI Registration",
    "AIF Compliance",
    "Credit Rating Agency Registration",
    "Depository Participant Registration",
    "REIT Registration",
    "Mutual Fund Registration",
    "Underwriter Registration",
    "Social Stock Exchange License in India",
    "IRDA Insurance Broker License",
    "IRDAI Regulatory Sandbox",
    "Insurance Marketing Firm License",
    "ISNP Registration",
    "IFSCA Insurance Intermediary",
    "FEMA Registration",
    "FEMA Compliance",
    "GST Appeal Services",
    "Legal Due Diligence",
    "Transfer Pricing",
    "Trademark Search",
    "ESG Consulting",
    "India Entry Strategy",
    "Other / Not Listed",
];

export async function POST(req: NextRequest) {
    try {
        // ── Feature availability check ─────────────────────────────────────────
        // Return 503 rather than letting the missing-key error propagate as 500.
        // Does not reveal whether a specific secret is set.
        if (!process.env.ANTHROPIC_API_KEY) {
            return NextResponse.json(
                { error: "This service is temporarily unavailable." },
                { status: 503, headers: { "Cache-Control": "no-store" } }
            );
        }

        // ── Rate limiting (fail-closed) ────────────────────────────────────────
        // Checked before body parsing so blocked requests are rejected cheaply.
        // Policy: fail-closed — when the limiter store is unreachable, block the
        // request rather than risk uncontrolled AI spend.
        const ip = getClientIp(req);
        const limitResult = await limitRequest(
            {
                namespace: "recommend-services",
                identifier: ip,
                limit: 5,
                windowSeconds: 600,
            },
            "fail-closed"
        );

        if (!limitResult.allowed) {
            if (limitResult.storeError) {
                return NextResponse.json(
                    { error: "This service is temporarily unavailable." },
                    { status: 503, headers: { "Cache-Control": "no-store" } }
                );
            }
            return rateLimitResponse(limitResult);
        }

        // ── Body size guard ────────────────────────────────────────────────────
        const contentLength = req.headers.get("content-length");
        if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
            return NextResponse.json(
                { error: "Request body too large." },
                { status: 413 }
            );
        }

        // ── Input validation ───────────────────────────────────────────────────
        const { message } = await req.json();

        if (!message || typeof message !== "string" || message.trim().length < 5) {
            return NextResponse.json(
                { error: "Please provide a description of at least 5 characters." },
                { status: 400 }
            );
        }

        if (message.length > MAX_MESSAGE_CHARS) {
            return NextResponse.json(
                { error: `Description must be under ${MAX_MESSAGE_CHARS} characters.` },
                { status: 400 }
            );
        }

        // ── Anthropic call ─────────────────────────────────────────────────────
        const response = await getAnthropicClient().messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 512,
            system: `You are a fintech regulatory compliance advisor at Estabizz Fintech, India.
Your job is to recommend the most relevant services based on a client's description.

Available services:
${ALL_SERVICES.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Rules:
- Recommend 1 to 3 services maximum that best match the client's need
- Return ONLY a valid JSON object, nothing else
- Format: { "recommendations": [{ "service": "exact service name from list", "reason": "one short sentence why this fits" }] }
- Use the EXACT service names from the list above`,
            messages: [
                {
                    role: "user",
                    content: `Client's requirement: "${message.slice(0, MAX_MESSAGE_CHARS)}"`,
                },
            ],
        });

        const text = response.content[0].type === "text" ? response.content[0].text : "";

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return NextResponse.json({ recommendations: [] });
        }

        const parsed = JSON.parse(jsonMatch[0]);
        return NextResponse.json(parsed);
    } catch (err) {
        console.error("Recommend services error:", err);
        return NextResponse.json(
            { error: "Unable to process recommendation. Please try again." },
            { status: 500 }
        );
    }
}
