import { connectDB } from "@/lib/db";
import LeadModel from "@/lib/models/Lead";
import LeadsClient, { type Lead } from "./LeadsClient";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
    let leads: Lead[] = [];
    let dbError = false;
    try {
        await connectDB();
        const docs = (await LeadModel.find().sort({ createdAt: -1 }).limit(1000).lean()) as unknown as Record<string, unknown>[];
        leads = docs.map((d) => ({
            id: String(d._id),
            name: (d.name as string) || "",
            email: (d.email as string) || "",
            phone: (d.phone as string) || "",
            company: (d.company as string) || "",
            service: (d.service as string) || "",
            message: (d.message as string) || "",
            source: (d.source as string) || "contact",
            status: (d.status as string) || "new",
            createdAt: d.createdAt ? new Date(d.createdAt as string).toISOString() : "",
        }));
    } catch {
        dbError = true;
    }

    if (dbError) {
        return (
            <div className="p-6 md:p-8">
                <h1 className="mb-3 text-[24px] font-black tracking-[-0.02em] text-[#120b45]">Lead Enquiries</h1>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-[14px] font-semibold text-amber-700">
                    Could not connect to the database. Check the MONGODB_URI environment variable.
                </div>
            </div>
        );
    }

    return <LeadsClient leads={leads} />;
}
