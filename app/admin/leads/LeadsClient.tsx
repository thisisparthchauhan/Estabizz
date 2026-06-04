"use client";

import { useMemo, useState } from "react";

export type Lead = {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    service: string;
    message: string;
    source: string;
    status: string;
    createdAt: string;
};

const STATUS_META: Record<string, { label: string; cls: string }> = {
    new: { label: "New", cls: "bg-[#f5fbff] text-[#0077B6] border-blue-100" },
    contacted: { label: "Contacted", cls: "bg-amber-50 text-amber-700 border-amber-200" },
    closed: { label: "Closed", cls: "bg-green-50 text-green-700 border-green-200" },
};

function toCsv(rows: Lead[]): string {
    const cols = ["createdAt", "name", "email", "phone", "company", "service", "source", "status", "message"];
    const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const head = cols.join(",");
    const body = rows.map((r) => cols.map((c) => esc((r as unknown as Record<string, string>)[c])).join(",")).join("\n");
    return head + "\n" + body;
}

export default function LeadsClient({ leads }: { leads: Lead[] }) {
    const [rows, setRows] = useState<Lead[]>(leads);
    const [q, setQ] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [savingId, setSavingId] = useState<string | null>(null);

    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        return rows.filter((r) => {
            if (statusFilter !== "all" && r.status !== statusFilter) return false;
            if (!term) return true;
            return [r.name, r.email, r.phone, r.company, r.service, r.message].join(" ").toLowerCase().includes(term);
        });
    }, [rows, q, statusFilter]);

    const counts = useMemo(() => {
        const c: Record<string, number> = { all: rows.length, new: 0, contacted: 0, closed: 0 };
        rows.forEach((r) => { c[r.status] = (c[r.status] || 0) + 1; });
        return c;
    }, [rows]);

    const updateStatus = async (id: string, status: string) => {
        setSavingId(id);
        const prev = rows;
        setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
        try {
            const res = await fetch(`/api/admin/leads/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (!res.ok) throw new Error();
        } catch {
            setRows(prev); // revert on failure
            alert("Could not update status. Please try again.");
        } finally {
            setSavingId(null);
        }
    };

    const exportCsv = () => {
        const blob = new Blob([toCsv(filtered)], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `estabizz-leads-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-6 md:p-8">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-[24px] font-black tracking-[-0.02em] text-[#120b45]">Lead Enquiries</h1>
                    <p className="mt-1 text-[13px] text-[#64748b]">Submissions from the Contact and Get Started forms.</p>
                </div>
                <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-4 py-2.5 text-[13px] font-black text-white shadow-[0_10px_24px_rgba(22,119,242,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]">
                    ↓ Export CSV
                </button>
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-3">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search name, email, company, service…"
                    className="h-10 min-w-[260px] flex-1 rounded-xl border border-blue-100 bg-white px-4 text-[13.5px] text-[#0a1628] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:ring-2 focus:ring-blue-50"
                />
                <div className="flex flex-wrap gap-1.5">
                    {["all", "new", "contacted", "closed"].map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-colors ${statusFilter === s ? "border-[#1677f2] bg-[#1677f2] text-white" : "border-blue-100 bg-white text-[#475569] hover:border-[#1677f2]"}`}
                        >
                            {s === "all" ? "All" : STATUS_META[s].label} <span className="opacity-70">({counts[s] || 0})</span>
                        </button>
                    ))}
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-8 text-center text-[14px] text-[#64748b]">
                    {rows.length === 0 ? "No enquiries yet. New submissions will appear here." : "No leads match your search."}
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
                    <table className="min-w-[1000px] w-full text-left text-[13px]">
                        <thead className="bg-gradient-to-r from-[#0866d9] to-[#1677f2] text-white">
                            <tr>
                                {["Date", "Name", "Email", "Phone", "Company", "Service", "Source", "Status", "Message"].map((h) => (
                                    <th key={h} className="whitespace-nowrap px-4 py-3 font-black">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((l) => (
                                <tr key={l.id} className="border-t border-gray-100 align-top hover:bg-[#f8fbff]">
                                    <td className="whitespace-nowrap px-4 py-3 text-[#64748b]">{l.createdAt ? new Date(l.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" }) : "—"}</td>
                                    <td className="whitespace-nowrap px-4 py-3 font-bold text-[#0a1628]">{l.name}</td>
                                    <td className="whitespace-nowrap px-4 py-3"><a href={`mailto:${l.email}`} className="font-semibold text-[#1677f2] hover:underline">{l.email}</a></td>
                                    <td className="whitespace-nowrap px-4 py-3 text-[#475569]">{l.phone ? <a href={`tel:${l.phone}`} className="hover:text-[#1677f2]">{l.phone}</a> : "—"}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-[#475569]">{l.company || "—"}</td>
                                    <td className="px-4 py-3 text-[#475569]">{l.service || "—"}</td>
                                    <td className="whitespace-nowrap px-4 py-3"><span className="rounded-full bg-[#f5fbff] px-2.5 py-0.5 text-[11px] font-bold text-[#0077B6]">{l.source || "contact"}</span></td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <select
                                            value={l.status}
                                            disabled={savingId === l.id}
                                            onChange={(e) => updateStatus(l.id, e.target.value)}
                                            className={`rounded-full border px-2.5 py-1 text-[11px] font-bold outline-none ${STATUS_META[l.status]?.cls || STATUS_META.new.cls}`}
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </td>
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
