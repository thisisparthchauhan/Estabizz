import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

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
    "Social Stock Exchange License",
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
        const { message } = await req.json();

        if (!message || message.trim().length < 5) {
            return NextResponse.json(
                { error: "Please provide a description of at least 5 characters." },
                { status: 400 }
            );
        }

        const response = await client.messages.create({
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
                    content: `Client's requirement: "${message}"`,
                },
            ],
        });

        const text = response.content[0].type === "text" ? response.content[0].text : "";

        // Parse Claude's JSON response
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
