import { connectDB } from "@/lib/db";
import LeadModel from "@/lib/models/Lead";

export const dynamic = "force-dynamic";

type LeadRow = {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    message?: string;
    source?: string;
    createdAt?: string | Date;
};

export default async function AdminLeadsPage() {
    let leads: LeadRow[] = [];
    let dbError = false;
    try {
        await connectDB();
        leads = (await LeadModel.find().sort({ createdAt: -1 }).limit(300).lean()) as unknown as LeadRow[];
    } catch {
        dbError = true;
    }

    return (
        <div className="p-6 md:p-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-[24px] font-black tracking-[-0.02em] text-[#120b45]">Lead Enquiries</h1>
                    <p className="mt-1 text-[13px] text-[#64748b]">Submissions from the Contact and Get Started forms.</p>
                </div>
                <span className="rounded-full border border-blue-100 bg-[#f5fbff] px-3.5 py-1.5 text-[12px] font-black text-[#0077B6]">{leads.length} total</span>
            </div>

            {dbError ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-[14px] font-semibold text-amber-700">
                    Could not connect to the database. Check the MONGODB_URI environment variable.
                </div>
            ) : leads.length === 0 ? (
                <div className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-8 text-center text-[14px] text-[#64748b]">
                    No enquiries yet. New submissions from the Contact and Get Started forms will appear here.
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
                    <table className="min-w-[920px] w-full text-left text-[13px]">
                        <thead className="bg-gradient-to-r from-[#0866d9] to-[#1677f2] text-white">
                            <tr>
                                {["Date", "Name", "Email", "Phone", "Company", "Service", "Source", "Message"].map((h) => (
                                    <th key={h} className="whitespace-nowrap px-4 py-3 font-black">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((l, i) => (
                                <tr key={i} className="border-t border-gray-100 align-top hover:bg-[#f8fbff]">
                                    <td className="whitespace-nowrap px-4 py-3 text-[#64748b]">{l.createdAt ? new Date(l.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" }) : "—"}</td>
                                    <td className="whitespace-nowrap px-4 py-3 font-bold text-[#0a1628]">{l.name}</td>
                                    <td className="whitespace-nowrap px-4 py-3"><a href={`mailto:${l.email}`} className="font-semibold text-[#1677f2] hover:underline">{l.email}</a></td>
                                    <td className="whitespace-nowrap px-4 py-3 text-[#475569]">{l.phone ? <a href={`tel:${l.phone}`} className="hover:text-[#1677f2]">{l.phone}</a> : "—"}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-[#475569]">{l.company || "—"}</td>
                                    <td className="px-4 py-3 text-[#475569]">{l.service || "—"}</td>
                                    <td className="whitespace-nowrap px-4 py-3"><span className="rounded-full bg-[#f5fbff] px-2.5 py-0.5 text-[11px] font-bold text-[#0077B6]">{l.source || "contact"}</span></td>
                                    <td className="px-4 py-3 text-[#64748b]"><div className="max-w-[280px] whitespace-pre-wrap">{l.message || "—"}</div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
