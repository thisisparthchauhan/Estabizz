import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";
import {
    limitRequest,
    getClientIp,
    rateLimitResponse,
} from "@/lib/security/rateLimit";

// Maximum body size (10 messages × ~4 KB each, with JSON overhead).
const MAX_BODY_BYTES = 65_536;
// Maximum characters accepted per individual message.
const MAX_MESSAGE_CHARS = 4_000;

const SYSTEM_PROMPT = `You are Estabizz AI — a regulatory compliance assistant for Estabizz Fintech, India's leading fintech compliance platform.

You help clients understand which licenses and registrations they need. Be concise, friendly, and always guide towards a consultation.

Services we offer:
RBI: NBFC Registration, NBFC Account Aggregator License, NBFC Business Plan, Full-Fledged Money Changers License, LendTech Services, NBFC For Sale/Acquisition, NBFC Legal Support, NBFC Takeover, NBFC Financial Modeling
SEBI: AMFI Registration, AIF Compliance, Credit Rating Agency Registration, Depository Participant Registration, REIT Registration, Mutual Fund Registration, Underwriter Registration, Social Stock Exchange License in India
IRDAI: IRDA Insurance Broker License, IRDAI Regulatory Sandbox, Insurance Marketing Firm License, ISNP Registration, IFSCA Insurance Intermediary
FEMA: FEMA Registration, FEMA Compliance
Other: GST Appeal Services, Legal Due Diligence, Transfer Pricing, Trademark Search, ESG Consulting, India Entry Strategy, Enterprise Services, PAP License

Rules:
- Answer in 2-4 short sentences max
- Always end with: "Want a free consultation? Contact us at /contact"
- If asked about fees/timelines, give general estimates and suggest consultation for exact details
- Do NOT make up regulatory details you are unsure of
- You are a guide, not a lawyer — always recommend professional advice for complex matters`;

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
        // Policy: fail-closed — store unreachable or not configured in production
        // both return 503 (storeError or configMissing). Unknown IP in production
        // would share one bucket across all clients; return 503 to prevent a
        // shared-bucket DoS or rate-limit bypass.
        const ip = getClientIp(req);
        if (ip === "unknown" && process.env.NODE_ENV === "production") {
            return NextResponse.json(
                { error: "This service is temporarily unavailable." },
                { status: 503, headers: { "Cache-Control": "no-store" } }
            );
        }

        const limitResult = await limitRequest(
            { namespace: "chat", identifier: ip, limit: 10, windowSeconds: 600 },
            "fail-closed"
        );

        if (!limitResult.allowed) {
            if (limitResult.storeError || limitResult.configMissing) {
                return NextResponse.json(
                    { error: "This service is temporarily unavailable." },
                    { status: 503, headers: { "Cache-Control": "no-store" } }
                );
            }
            return rateLimitResponse(limitResult);
        }

        // ── Body size enforcement (actual bytes) ───────────────────────────────
        // Read the raw body so byteLength is authoritative. Content-Length is
        // untrusted: it can be missing or deliberately set to a false small value.
        const bodyBuffer = await req.arrayBuffer();
        if (bodyBuffer.byteLength > MAX_BODY_BYTES) {
            return NextResponse.json(
                { error: "Request body too large." },
                { status: 413 }
            );
        }

        // ── Input validation ───────────────────────────────────────────────────
        let parsed;
        try {
            parsed = JSON.parse(new TextDecoder().decode(bodyBuffer));
        } catch {
            return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
        }
        const { messages } = parsed;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
        }

        const safeMessages = messages
            .filter(
                (message) =>
                    message &&
                    (message.role === "user" || message.role === "assistant") &&
                    typeof message.content === "string" &&
                    message.content.trim().length > 0
            )
            .slice(-10)
            .map((message) => ({
                role: message.role,
                content: message.content.slice(0, MAX_MESSAGE_CHARS),
            }));

        if (safeMessages.length === 0 || safeMessages[safeMessages.length - 1].role !== "user") {
            return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
        }

        // ── Anthropic call ─────────────────────────────────────────────────────
        const response = await getAnthropicClient().messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 300,
            system: SYSTEM_PROMPT,
            messages: safeMessages,
        });

        const reply = response.content[0].type === "text" ? response.content[0].text : "";
        return NextResponse.json({ reply });
    } catch (err) {
        console.error("Chat error:", err);
        return NextResponse.json({ error: "Unable to respond. Please try again." }, { status: 500 });
    }
}
