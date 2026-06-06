import type { ILead } from "@/lib/models/Lead";

function leadSummary(lead: ILead) {
    return [
        `New Estabizz enquiry received`,
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Phone: ${lead.phone}`,
        `Company: ${lead.company || "Not provided"}`,
        `Service: ${lead.service || "Not selected"}`,
        `Business stage: ${lead.businessStage}`,
        `Regulator: ${lead.regulator}`,
        `Urgency: ${lead.urgency}`,
        `Existing entity: ${lead.existingEntity}`,
        `Capital readiness: ${lead.capitalReadiness || "Not provided"}`,
        `Preferred callback: ${lead.preferredCallbackTime || "Not provided"}`,
        `Source: ${lead.source}`,
        `Message: ${lead.message || "Not provided"}`,
    ].join("\n");
}

export async function notifyLeadTeam(lead: ILead) {
    await Promise.allSettled([
        sendAdminEmail(lead),
        sendWhatsAppAlert(lead),
    ]);
}

async function sendAdminEmail(lead: ILead) {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.LEAD_EMAIL_FROM;
    const to = process.env.LEAD_ADMIN_EMAIL || "info@estabizz.com";

    if (!apiKey || !from) return;

    const text = leadSummary(lead);

    await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from,
            to,
            subject: `New Estabizz enquiry: ${lead.service || lead.regulator}`,
            text,
        }),
    });
}

async function sendWhatsAppAlert(lead: ILead) {
    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const adminTo = process.env.WHATSAPP_ADMIN_TO;

    if (!token || !phoneNumberId || !adminTo) return;

    await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            messaging_product: "whatsapp",
            to: adminTo,
            type: "text",
            text: {
                preview_url: false,
                body: leadSummary(lead).slice(0, 3900),
            },
        }),
    });
}
