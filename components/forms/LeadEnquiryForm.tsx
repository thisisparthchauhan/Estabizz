"use client";

import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";

type Recommendation = { service: string; reason: string };

type LeadEnquiryFormProps = {
    source: string;
    title?: string;
    description?: string;
    services?: string[];
    enableRecommendations?: boolean;
};

const defaultServices = [
    "NBFC Registration",
    "Payment Aggregator Licence",
    "PPI / Prepaid Wallet Authorisation",
    "Account Aggregator Registration",
    "AIF Registration",
    "PMS Registration",
    "RIA / Investment Adviser Registration",
    "Research Analyst Registration",
    "Stock Broker Registration",
    "Insurance Broker Registration",
    "Corporate Agent Registration",
    "IFSCA / GIFT City Setup",
    "FIU-IND / AML / PMLA Compliance",
    "MCA / ROC Compliance",
    "Company Incorporation",
    "Trademark / IPR Support",
    "Global Market Entry",
    "Other / Not Listed",
];

const initialForm = {
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    businessStage: "",
    regulator: "",
    urgency: "",
    existingEntity: "",
    capitalReadiness: "",
    preferredCallbackTime: "",
    message: "",
};

type AttachedDocument = {
    fileName: string;
    mimeType: string;
    size: number;
    dataUrl: string;
};

type GtagWindow = Window & {
    gtag?: (...args: unknown[]) => void;
};

export default function LeadEnquiryForm({
    source,
    title = "Send Us a Message",
    description = "Fill in your details and the Estabizz team will review your requirement.",
    services = defaultServices,
    enableRecommendations = false,
}: LeadEnquiryFormProps) {
    const [form, setForm] = useState(initialForm);
    const [attachedDocument, setAttachedDocument] = useState<AttachedDocument | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [aiError, setAiError] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setError("");
        setAttachedDocument(null);
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setError("Uploaded document must be 2 MB or smaller.");
            e.target.value = "";
            return;
        }

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "image/png",
            "image/jpeg",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Please upload a PDF, DOC, DOCX, PNG or JPG file.");
            e.target.value = "";
            return;
        }

        const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ""));
            reader.onerror = () => reject(new Error("Unable to read file."));
            reader.readAsDataURL(file);
        });

        setAttachedDocument({
            fileName: file.name,
            mimeType: file.type,
            size: file.size,
            dataUrl,
        });
    };

    const handleRecommend = async () => {
        if (!form.message || form.message.trim().length < 10) {
            setAiError("Please describe your requirement first, at least 10 characters.");
            return;
        }

        setAiError("");
        setAiLoading(true);
        setRecommendations([]);
        try {
            const res = await fetch("/api/recommend-services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: form.message }),
            });
            const data = await res.json();
            if (data.recommendations?.length > 0) {
                setRecommendations(data.recommendations);
            } else {
                setAiError("No specific match found. Please select a service manually.");
            }
        } catch {
            setAiError("Unable to get recommendations. Please select manually.");
        } finally {
            setAiLoading(false);
        }
    };

    const fireConversion = () => {
        const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
        const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL;
        const gtag = (window as GtagWindow).gtag;

        if (gtag && conversionId && conversionLabel) {
            gtag("event", "conversion", {
                send_to: `${conversionId}/${conversionLabel}`,
            });
        }

        window.dispatchEvent(new CustomEvent("estabizz:lead-submitted", { detail: { source } }));
    };

    const resetForm = () => {
        setForm(initialForm);
        setAttachedDocument(null);
        setSubmitted(false);
        setSuccessMessage("");
        setError("");
        setRecommendations([]);
        setAiError("");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    attachedDocument,
                    source,
                    pageUrl: window.location.href,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Unable to submit enquiry.");

            setSuccessMessage(data.message || "Thank you. Your enquiry has been received by Estabizz Team. Our team will review your requirement and connect with you shortly.");
            setSubmitted(true);
            fireConversion();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to submit enquiry. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-[#0a1628] mb-2">Thank You</h3>
                <p className="mx-auto max-w-xl text-gray-600 leading-relaxed">
                    {successMessage}
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        onClick={resetForm}
                        className="px-6 py-2.5 bg-[#0096D6] text-white font-semibold rounded-xl text-sm hover:bg-[#0077B6] transition-colors"
                    >
                        Send Another Enquiry
                    </button>
                    <Link
                        href="/thank-you"
                        className="px-6 py-2.5 bg-white border border-blue-100 text-[#0077B6] font-semibold rounded-xl text-sm hover:bg-blue-50 transition-colors"
                    >
                        View Thank You Page
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <h2 className="text-[22px] font-black text-[#0a1628] mb-2">{title}</h2>
            <p className="text-gray-500 text-sm mb-8">{description}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="Full Name" required>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className={inputClass} />
                    </Field>
                    <Field label="Email Address" required>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
                    </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="Phone Number" required>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 98256 00907" className={inputClass} />
                    </Field>
                    <Field label="Company / Organisation">
                        <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Your company name" className={inputClass} />
                    </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="Business Stage" required>
                        <select name="businessStage" value={form.businessStage} onChange={handleChange} required className={inputClass}>
                            <option value="">Select business stage...</option>
                            <option value="Startup">Startup</option>
                            <option value="Existing">Existing</option>
                            <option value="Regulated Entity">Regulated Entity</option>
                        </select>
                    </Field>
                    <Field label="Regulator" required>
                        <select name="regulator" value={form.regulator} onChange={handleChange} required className={inputClass}>
                            <option value="">Select regulator...</option>
                            <option value="RBI">RBI</option>
                            <option value="SEBI">SEBI</option>
                            <option value="IRDAI">IRDAI</option>
                            <option value="IFSCA">IFSCA</option>
                            <option value="MCA">MCA</option>
                            <option value="FIU">FIU</option>
                            <option value="Other / Not Sure">Other / Not Sure</option>
                        </select>
                    </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="Service Urgency" required>
                        <select name="urgency" value={form.urgency} onChange={handleChange} required className={inputClass}>
                            <option value="">Select urgency...</option>
                            <option value="Immediate">Immediate</option>
                            <option value="15 days">15 days</option>
                            <option value="30 days">30 days</option>
                            <option value="Research stage">Research stage</option>
                        </select>
                    </Field>
                    <Field label="Existing Entity?" required>
                        <select name="existingEntity" value={form.existingEntity} onChange={handleChange} required className={inputClass}>
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="Capital Readiness">
                        <input type="text" name="capitalReadiness" value={form.capitalReadiness} onChange={handleChange} placeholder="Example: Rs. 2 crore, Rs. 15 crore, planning stage" className={inputClass} />
                    </Field>
                    <Field label="Preferred Callback Time">
                        <input type="text" name="preferredCallbackTime" value={form.preferredCallbackTime} onChange={handleChange} placeholder="Example: Today 4 PM, tomorrow morning" className={inputClass} />
                    </Field>
                </div>

                <Field label="Service Required">
                    <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
                        <option value="">Select a service...</option>
                        {services.map((service) => (
                            <option key={service} value={service}>{service}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Upload Document">
                    <input type="file" onChange={handleFile} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-bold file:text-[#0077B6]" />
                    <p className="mt-2 text-xs text-gray-500">Optional. PDF, DOC, DOCX, PNG or JPG up to 2 MB.</p>
                    {attachedDocument && <p className="mt-1 text-xs font-semibold text-green-600">Attached: {attachedDocument.fileName}</p>}
                </Field>

                <Field label="Message">
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Describe your requirement, licence stage, regulator query or compliance concern..." className={`${inputClass} resize-none`} />
                    {enableRecommendations && (
                        <>
                            <button type="button" onClick={handleRecommend} disabled={aiLoading} className="mt-2 flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 font-semibold rounded-lg text-xs hover:bg-purple-100 transition-all disabled:opacity-60">
                                {aiLoading ? "Analysing..." : "Suggest Best Service for Me"}
                            </button>
                            {aiError && <p className="mt-1 text-xs text-red-500">{aiError}</p>}
                            {recommendations.length > 0 && (
                                <div className="mt-3 p-4 bg-purple-50 border border-purple-100 rounded-xl">
                                    <p className="text-xs font-bold text-purple-700 mb-2 uppercase tracking-wide">Recommendations</p>
                                    <div className="space-y-2">
                                        {recommendations.map((rec, index) => (
                                            <button key={`${rec.service}-${index}`} type="button" onClick={() => setForm((current) => ({ ...current, service: rec.service }))} className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all text-sm ${form.service === rec.service ? "bg-[#0096D6] border-[#0096D6] text-white" : "bg-white border-purple-200 text-[#0a1628] hover:border-[#0096D6]"}`}>
                                                <span className="font-semibold">{rec.service}</span>
                                                <span className={`block text-xs mt-0.5 ${form.service === rec.service ? "text-blue-100" : "text-gray-500"}`}>{rec.reason}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </Field>

                {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</div>}

                <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? "Submitting..." : "Submit Enquiry"}
                </button>
            </form>
        </>
    );
}

const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all bg-white";

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
    return (
        <label className="block">
            <span className="block text-sm font-semibold text-[#0a1628] mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </span>
            {children}
        </label>
    );
}
