import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Estabizz AI — a regulatory compliance assistant for Estabizz Fintech, India's leading fintech compliance platform.

You help clients understand which licenses and registrations they need. Be concise, friendly, and always guide towards a consultation.

Services we offer:
RBI: NBFC Registration, NBFC Account Aggregator License, NBFC Business Plan, Full-Fledged Money Changers License, LendTech Services, NBFC For Sale/Acquisition, NBFC Legal Support, NBFC Takeover, NBFC Financial Modeling
SEBI: AMFI Registration, AIF Compliance, Credit Rating Agency Registration, Depository Participant Registration, REIT Registration, Mutual Fund Registration, Underwriter Registration, Social Stock Exchange License
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
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
        }

        const response = await client.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 300,
            system: SYSTEM_PROMPT,
            messages: messages.slice(-10), // keep last 10 messages for context
        });

        const reply = response.content[0].type === "text" ? response.content[0].text : "";
        return NextResponse.json({ reply });
    } catch (err) {
        console.error("Chat error:", err);
        return NextResponse.json({ error: "Unable to respond. Please try again." }, { status: 500 });
    }
}
