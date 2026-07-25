"use client";
/**
 * CountryLandingClient.tsx — Global Markets V2
 *
 * Three-tier rendering based on country.pageDepth:
 *   full    — active or priority markets (comprehensive sections)
 *   standard — developing/priority markets (balanced sections)
 *   compact  — planned markets (concise, interest-focused)
 *
 * Positioning: "Estabizz provides global market-entry intelligence, regulatory
 * pathway assessment and advisory coordination across international jurisdictions,
 * managed through its India-based Global Market Desk and independent local
 * professional networks where required."
 *
 * Do NOT promise response times, local offices, or regulatory approval.
 */

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  Building2, ClipboardCheck, ShieldCheck, Globe2, Landmark,
  FileText, Handshake, Network, Route, Scale, ChevronRight,
  AlertCircle, CheckCircle2, ArrowRight,
} from "@/components/globalMarkets/Icons";
import { EstabizzSelect } from "@/components/ui/EstabizzSelect";
import CountryFAQ from "@/components/globalMarkets/CountryFAQ";
import RegulatoryLandscape from "@/components/globalMarkets/RegulatoryLandscape";
import type { GlobalMarketConfig } from "@/lib/globalMarkets/types";
import { COUNTRY_BY_SLUG, flagEmoji } from "@/lib/globalMarkets/countries";

// ─── Icon map ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: "true" }>> = {
  Building2, ClipboardCheck, ShieldCheck, Globe2, Landmark,
  FileText, Handshake, Network, Route, Scale,
};

function SupportIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? Route;
  return <Icon className="h-5 w-5 text-[#1677f2]" aria-hidden="true" />;
}

// ─── Form options ─────────────────────────────────────────────────────────────

const BUSINESS_ACTIVITIES = [
  "Company formation",
  "Fintech or payments",
  "Lending or banking",
  "Insurance",
  "Securities or investment services",
  "Fund management",
  "Trading or import-export",
  "Technology or professional services",
  "Other",
].map(v => ({ value: v, label: v }));

const STAGES = [
  "Exploring the market",
  "Business plan prepared",
  "Entity not incorporated",
  "Entity already incorporated",
  "Licence assessment required",
  "Existing operation requiring compliance support",
].map(v => ({ value: v, label: v }));

const SUPPORT_OPTIONS = [
  "Initial consultation",
  "Written feasibility assessment",
  "Full execution support",
  "Local professional introduction",
  "Ongoing compliance support",
].map(v => ({ value: v, label: v }));

const TIMELINES = [
  "Immediately",
  "Within 1–3 months",
  "Within 3–6 months",
  "Within 6–12 months",
  "Planning ahead",
  "Exploratory only",
].map(v => ({ value: v, label: v }));

const CONTACT_METHODS = [
  "Email",
  "Phone",
  "WhatsApp",
  "Video meeting",
].map(v => ({ value: v, label: v }));

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  phoneNumber: string;
  company: string;
  businessActivity: string;
  expansionDirection: string;
  currentStage: string;
  supportRequired: string;
  timeline: string;
  preferredContactMethod: string;
  message: string;
  // Honeypot
  website: string;
}

const EMPTY_FORM: FormState = {
  name: "", email: "", phoneNumber: "", company: "",
  businessActivity: "", expansionDirection: "", currentStage: "",
  supportRequired: "", timeline: "", preferredContactMethod: "",
  message: "", website: "",
};

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb({ country }: { country: GlobalMarketConfig }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-[#e2edf8] bg-[#f8fbff] py-2.5">
      <div className="mx-auto max-w-5xl px-6">
        <ol className="flex flex-wrap items-center gap-1 text-[12px] text-[#64748b]">
          <li><Link href="/" className="hover:text-[#1677f2]">Home</Link></li>
          <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/global" className="hover:text-[#1677f2]">Global Markets</Link></li>
          <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
          <li className="text-[#94a3b8]">{country.region}</li>
          <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
          <li aria-current="page" className="font-semibold text-[#0a1628]">{country.name}</li>
        </ol>
      </div>
    </nav>
  );
}

// ─── Tier badge ───────────────────────────────────────────────────────────────

function TierBadge({ tier }: { tier: GlobalMarketConfig["tier"] }) {
  const styles = {
    active:     "bg-emerald-100 text-emerald-800",
    developing: "bg-blue-100 text-blue-800",
    planned:    "bg-amber-100 text-amber-800",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide ${styles[tier]}`}>
      {tier === "active" ? "Active" : tier === "developing" ? "Developing" : "Planned"}
    </span>
  );
}

// ─── Status notice ────────────────────────────────────────────────────────────

function StatusNotice({ country }: { country: GlobalMarketConfig }) {
  if (country.tier === "active") return null;

  const isDeveloping = country.tier === "developing";

  return (
    <section
      className={`border-b py-5 ${isDeveloping ? "border-blue-100 bg-blue-50" : "border-amber-100 bg-amber-50"}`}
      aria-label="Current market status"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex gap-3">
          <AlertCircle
            className={`mt-0.5 h-5 w-5 flex-shrink-0 ${isDeveloping ? "text-blue-600" : "text-amber-600"}`}
            aria-hidden="true"
          />
          <div>
            <p className={`text-[13.5px] font-bold ${isDeveloping ? "text-blue-900" : "text-amber-900"}`}>
              Current Market Status
            </p>
            {isDeveloping ? (
              <p className="mt-1 text-[13px] leading-relaxed text-blue-800">
                Estabizz is currently developing its advisory and professional-coordination
                capabilities for {country.name}. We do not presently claim a permanent local
                office, locally incorporated entity or direct regulatory authorisation in this
                market. Enquiries are managed through our India-based Global Market Desk and,
                where required, coordinated with independent local professionals.
              </p>
            ) : (
              <p className="mt-1 text-[13px] leading-relaxed text-amber-800">
                Estabizz is evaluating future support capabilities for {country.name}. This
                page is intended for market-interest registration and does not represent an
                existing local operation.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Market entry overview cards ──────────────────────────────────────────────

function MarketEntryOverview({ country }: { country: GlobalMarketConfig }) {
  const cards = [
    {
      icon: Building2,
      title: "Business setup environment",
      text: country.businessEnvironment ??
        "Entry structures may vary based on ownership, sector, commercial model and intended local activity.",
    },
    {
      icon: Scale,
      title: "Regulatory landscape",
      text: country.regulatoryOverview ??
        "Licensing and registration requirements depend on whether the proposed activity involves financial services, payments, investment products, insurance, lending or other regulated services.",
    },
    {
      icon: Globe2,
      title: "Cross-border considerations",
      text: country.crossBorderOverview ??
        "Businesses may need to assess capital flows, taxation, data handling, foreign ownership and operational substance.",
    },
    {
      icon: Handshake,
      title: "Local professional coordination",
      text: country.localCoordinationOverview ??
        "Local legal, tax, accounting or regulatory professionals may be required depending on the assignment.",
    },
  ];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
          Market Overview
        </p>
        <h2 className="text-[24px] font-black tracking-tight text-[#0a1628]">
          Understanding the {country.name} market-entry landscape
        </h2>
        {country.overview && (
          <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-[#334155]">
            {country.overview}
          </p>
        )}
        <p className="mt-2 text-[12px] text-[#94a3b8]">
          Country information is general and subject to verification based on the proposed activity.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-xl border border-[#e2edf8] bg-[#f8fbff] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="h-5 w-5 text-[#1677f2]" aria-hidden="true" />
                  <p className="text-[13px] font-bold text-[#0a1628]">{card.title}</p>
                </div>
                <p className="text-[12.5px] leading-relaxed text-[#334155]">{card.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Support areas ────────────────────────────────────────────────────────────

function SupportAreas({ country }: { country: GlobalMarketConfig }) {
  const areas = country.supportAreas.slice(0, 8);
  return (
    <section className="bg-[#f8fbff] py-12">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
          {country.tier === "planned" ? "Intended Support Areas" : "Support Areas"}
        </p>
        <h2 className="text-[24px] font-black tracking-tight text-[#0a1628]">
          {country.tier === "planned"
            ? `Planned advisory scope for ${country.name}`
            : `How Estabizz supports ${country.name} market-entry enquiries`}
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <div key={area.label} className="rounded-xl border border-[#e2edf8] bg-white p-4">
              <div className="mb-2">
                <SupportIcon name={area.icon} />
              </div>
              <p className="text-[12.5px] font-semibold leading-snug text-[#1e3a5f]">{area.label}</p>
              {area.description && (
                <p className="mt-1 text-[11.5px] text-[#64748b]">{area.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Who this is for ──────────────────────────────────────────────────────────

function AudienceSection({ country }: { country: GlobalMarketConfig }) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
          Who This Is For
        </p>
        <h2 className="text-[24px] font-black tracking-tight text-[#0a1628]">
          Is this relevant to you?
        </h2>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {country.audiences.map((audience) => (
            <div
              key={audience}
              className="flex items-start gap-3 rounded-xl border border-[#dbe7f3] bg-white p-3.5"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1677f2]" aria-hidden="true" />
              <p className="text-[13px] font-semibold text-[#1e3a5f]">{audience}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── India ↔ country corridor ─────────────────────────────────────────────────

function CorridorSection({ country }: { country: GlobalMarketConfig }) {
  const corridor = country.corridor;
  if (!corridor) return null;

  return (
    <section className="bg-[#070d1a] py-12 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#6ab4ff]">
          Bilateral Support
        </p>
        <h2 className="text-[24px] font-black tracking-tight">
          India–{country.name} business corridor support
        </h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {corridor.indiaToMarket && corridor.indiaToMarket.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="mb-3 text-[12px] font-black uppercase tracking-[0.15em] text-[#6ab4ff]">
                Indian businesses entering {country.name}
              </p>
              <ul className="space-y-2">
                {corridor.indiaToMarket.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1677f2]" aria-hidden="true" />
                    <span className="text-[13px] text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {corridor.marketToIndia && corridor.marketToIndia.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="mb-3 text-[12px] font-black uppercase tracking-[0.15em] text-[#6ab4ff]">
                {country.name} businesses entering India
              </p>
              <ul className="space-y-2">
                {corridor.marketToIndia.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1677f2]" aria-hidden="true" />
                    <span className="text-[13px] text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <p className="mt-4 text-[11.5px] text-white/40">
          Applicability of each workstream depends on the proposed activity and business model.
          Individual regulatory requirements must be confirmed with qualified professionals.
        </p>
      </div>
    </section>
  );
}

// ─── Process section ──────────────────────────────────────────────────────────

function ProcessSection({ country }: { country: GlobalMarketConfig }) {
  const steps = country.processSteps;
  if (!steps || steps.length === 0) return null;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
          Our Approach
        </p>
        <h2 className="text-[24px] font-black tracking-tight text-[#0a1628]">
          How Estabizz supports your market-entry assessment
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative rounded-xl border border-[#e2edf8] bg-white p-5">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#1677f2] text-[13px] font-black text-white">
                {step.number}
              </div>
              <p className="text-[13px] font-bold text-[#0a1628]">{step.title}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#64748b]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Deliverables ─────────────────────────────────────────────────────────────

function DeliverablesSection({ country }: { country: GlobalMarketConfig }) {
  const deliverables = country.deliverables;
  if (!deliverables || deliverables.length === 0) return null;

  return (
    <section className="bg-[#f8fbff] py-10">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
          Advisory Outputs
        </p>
        <h2 className="text-[22px] font-black tracking-tight text-[#0a1628]">
          Indicative advisory outputs
        </h2>
        <p className="mt-1 text-[13px] text-[#64748b]">
          Depending on the engagement, advisory outputs may include:
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((d) => (
            <div key={d} className="flex items-start gap-2.5 rounded-lg border border-[#dbe7f3] bg-white p-3">
              <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1677f2]" aria-hidden="true" />
              <span className="text-[12.5px] font-medium text-[#334155]">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Lead form ────────────────────────────────────────────────────────────────

function LeadForm({ country }: { country: GlobalMarketConfig }) {
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const flag = flagEmoji(country.iso2);

  // Expansion direction options templated with country name
  const expansionDirections = [
    { value: "India to market", label: `India to ${country.name}` },
    { value: "Market to India", label: `${country.name} to India` },
    { value: "Other cross-border route", label: "Other cross-border route" },
  ];

  function setField(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Please enter your full name (at least 2 characters).";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid work email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || submitted) return;
    if (!validate()) return;

    setSubmitting(true);
    setResult(null);

    const phone = form.phoneNumber.trim()
      ? `${country.callingCode} ${form.phoneNumber.trim()}`
      : "";

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:                  form.name.trim(),
          email:                 form.email.trim(),
          phone,
          company:               form.company.trim(),
          // source is validated server-side against the VALID_SOURCES allowlist
          source:                "global-market-page",
          // countrySlug is resolved server-side; name/region/tier NOT trusted from client
          countrySlug:           country.slug,
          businessActivity:      form.businessActivity,
          expansionDirection:    form.expansionDirection,
          currentStage:          form.currentStage,
          supportRequired:       form.supportRequired,
          timeline:              form.timeline,
          preferredContactMethod: form.preferredContactMethod,
          message:               form.message.trim(),
          pageUrl:               typeof window !== "undefined" ? window.location.href : "",
          // Honeypot
          website:               form.website,
        }),
      });

      const json = await res.json().catch(() => ({ ok: false }));

      if (res.status === 429) {
        setResult({
          ok: false,
          msg: "You have reached the submission limit. Please try again later or contact us at support@estabizz.com.",
        });
      } else if (res.status === 503) {
        setResult({
          ok: false,
          msg: "Our enquiry form is temporarily unavailable. Please email support@estabizz.com or call +91 98256 00907.",
        });
      } else if (!json.ok) {
        setResult({
          ok: false,
          msg: json.error || "Something went wrong. Please email support@estabizz.com.",
        });
      } else {
        // Best-effort Formspree notification (fire-and-forget)
        fetch("https://formspree.io/f/xpqvjney", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name:               form.name.trim(),
            email:              form.email.trim(),
            phone,
            company:            form.company.trim(),
            country:            country.name,
            region:             country.region,
            businessActivity:   form.businessActivity,
            expansionDirection: form.expansionDirection,
            currentStage:       form.currentStage,
            supportRequired:    form.supportRequired,
            timeline:           form.timeline,
            preferredContact:   form.preferredContactMethod,
            message:            form.message.trim(),
          }),
        }).catch(() => { /* best-effort */ });

        setSubmitted(true);
        setResult({
          ok: true,
          msg: "Your enquiry has been received. Our Global Market Desk will review it and identify the appropriate next step.",
        });
        setForm(EMPTY_FORM);
      }
    } catch {
      setResult({
        ok: false,
        msg: "Network error. Please email support@estabizz.com or call +91 98256 00907.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section ref={formRef} className="py-12" id="enquiry-form">
      <div className="mx-auto max-w-2xl px-6">
        <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
          Get in Touch
        </p>
        <h2 className="text-[26px] font-black tracking-tight text-[#0a1628]">
          Submit a market-entry enquiry
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-[#64748b]">
          Tell us about your proposed activity and target timeline. Our Global Market Desk
          will review the enquiry and identify the appropriate next step.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-4"
          noValidate
          aria-label={`Market-entry enquiry form for ${country.name}`}
        >
          {/* Accessible error summary */}
          {Object.keys(errors).length > 0 && (
            <div
              role="alert"
              aria-live="polite"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3"
            >
              <p className="text-[13px] font-bold text-red-800">Please correct the following:</p>
              <ul className="mt-1 list-inside list-disc text-[12.5px] text-red-700">
                {Object.values(errors).map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          )}

          {/* Honeypot — hidden from real users */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={e => setField("website", e.target.value)}
            tabIndex={-1}
            aria-hidden="true"
            className="absolute -left-[9999px] opacity-0"
            autoComplete="off"
          />

          {/* Name + Email */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="lead-name" className="mb-1.5 block text-[12px] font-bold text-[#334155]">
                Full name <span className="text-red-500" aria-label="required">*</span>
              </label>
              <input
                id="lead-name"
                required
                minLength={2}
                maxLength={120}
                value={form.name}
                onChange={e => setField("name", e.target.value)}
                placeholder="Your full name"
                aria-describedby={errors.name ? "lead-name-error" : undefined}
                aria-invalid={!!errors.name}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-[#0a1628] outline-none transition-all placeholder:text-[#94a3b8] focus:ring-2 focus:ring-[#1677f2]/10 ${
                  errors.name ? "border-red-400 focus:border-red-400" : "border-[#dbe7f3] focus:border-[#1677f2]"
                }`}
              />
              {errors.name && (
                <p id="lead-name-error" role="alert" className="mt-1 text-[11.5px] text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="lead-email" className="mb-1.5 block text-[12px] font-bold text-[#334155]">
                Work email <span className="text-red-500" aria-label="required">*</span>
              </label>
              <input
                id="lead-email"
                required
                type="email"
                maxLength={160}
                value={form.email}
                onChange={e => setField("email", e.target.value)}
                placeholder="you@company.com"
                aria-describedby={errors.email ? "lead-email-error" : undefined}
                aria-invalid={!!errors.email}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-[#0a1628] outline-none transition-all placeholder:text-[#94a3b8] focus:ring-2 focus:ring-[#1677f2]/10 ${
                  errors.email ? "border-red-400 focus:border-red-400" : "border-[#dbe7f3] focus:border-[#1677f2]"
                }`}
              />
              {errors.email && (
                <p id="lead-email-error" role="alert" className="mt-1 text-[11.5px] text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone + Company */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="lead-phone" className="mb-1.5 block text-[12px] font-bold text-[#334155]">
                Mobile number
              </label>
              <div className="flex overflow-hidden rounded-xl border border-[#dbe7f3] bg-white transition-all focus-within:border-[#1677f2] focus-within:ring-2 focus-within:ring-[#1677f2]/10">
                <div className="flex flex-shrink-0 items-center gap-1.5 border-r border-[#dbe7f3] bg-[#f8fbff] px-3 py-3">
                  <span className="text-[15px] leading-none" aria-hidden="true">{flag}</span>
                  <span className="text-[12.5px] font-bold text-[#334155]">{country.callingCode}</span>
                </div>
                <input
                  id="lead-phone"
                  type="tel"
                  maxLength={20}
                  value={form.phoneNumber}
                  onChange={e => setField("phoneNumber", e.target.value)}
                  placeholder="Mobile number"
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[14px] text-[#0a1628] outline-none placeholder:text-[#94a3b8]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lead-company" className="mb-1.5 block text-[12px] font-bold text-[#334155]">
                Company name
              </label>
              <input
                id="lead-company"
                maxLength={160}
                value={form.company}
                onChange={e => setField("company", e.target.value)}
                placeholder="Your company"
                className="w-full rounded-xl border border-[#dbe7f3] bg-white px-4 py-3 text-[14px] text-[#0a1628] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:ring-2 focus:ring-[#1677f2]/10"
              />
            </div>
          </div>

          {/* Selected market (read-only) */}
          <div>
            <p className="mb-1.5 text-[12px] font-bold text-[#334155]">Selected market</p>
            <div className="flex items-center gap-3 rounded-xl border border-[#dbe7f3] bg-[#f8fbff] px-4 py-3">
              <span className="text-[18px]" aria-hidden="true">{flag}</span>
              <span className="text-[14px] font-semibold text-[#0a1628]">{country.name}</span>
              <TierBadge tier={country.tier} />
              <span className="ml-auto text-[11px] text-[#64748b]">{country.region}</span>
            </div>
          </div>

          {/* Business activity + Expansion direction */}
          <div className="grid gap-4 sm:grid-cols-2">
            <EstabizzSelect
              label="Business activity"
              options={BUSINESS_ACTIVITIES}
              value={form.businessActivity}
              onValueChange={v => setField("businessActivity", v)}
              placeholder="Select activity"
              variant="public"
            />
            <EstabizzSelect
              label="Expansion direction"
              options={expansionDirections}
              value={form.expansionDirection}
              onValueChange={v => setField("expansionDirection", v)}
              placeholder="Select direction"
              variant="public"
            />
          </div>

          {/* Current stage + Support required */}
          <div className="grid gap-4 sm:grid-cols-2">
            <EstabizzSelect
              label="Current stage"
              options={STAGES}
              value={form.currentStage}
              onValueChange={v => setField("currentStage", v)}
              placeholder="Select stage"
              variant="public"
            />
            <EstabizzSelect
              label="Support required"
              options={SUPPORT_OPTIONS}
              value={form.supportRequired}
              onValueChange={v => setField("supportRequired", v)}
              placeholder="Select support type"
              variant="public"
            />
          </div>

          {/* Timeline + Preferred contact */}
          <div className="grid gap-4 sm:grid-cols-2">
            <EstabizzSelect
              label="Target timeline"
              options={TIMELINES}
              value={form.timeline}
              onValueChange={v => setField("timeline", v)}
              placeholder="Select timeline"
              variant="public"
            />
            <EstabizzSelect
              label="Preferred contact method"
              options={CONTACT_METHODS}
              value={form.preferredContactMethod}
              onValueChange={v => setField("preferredContactMethod", v)}
              placeholder="Select contact method"
              variant="public"
            />
          </div>

          {/* Additional context */}
          <div>
            <label htmlFor="lead-message" className="mb-1.5 block text-[12px] font-bold text-[#334155]">
              Additional context <span className="font-normal text-[#94a3b8]">(optional)</span>
            </label>
            <textarea
              id="lead-message"
              maxLength={2000}
              rows={3}
              value={form.message}
              onChange={e => setField("message", e.target.value)}
              placeholder="Brief background on your expansion plans, entity structure, or specific regulatory questions…"
              className="w-full resize-none rounded-xl border border-[#dbe7f3] bg-white px-4 py-3 text-[14px] text-[#0a1628] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:ring-2 focus:ring-[#1677f2]/10"
            />
          </div>

          {/* Result message */}
          {result && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-xl border px-4 py-3 text-[13.5px] font-semibold ${
                result.ok
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {result.msg}
            </div>
          )}

          {/* Submit */}
          {!submitted && (
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[#0a1628] py-3.5 text-[14px] font-black text-white shadow-lg transition-all hover:bg-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit Market-Entry Enquiry →"}
            </button>
          )}

          <p className="text-center text-[11px] text-[#94a3b8]">
            By submitting you agree to our{" "}
            <Link href="/legal/privacy-policy" className="underline hover:text-[#1677f2]">
              Privacy Policy
            </Link>
            . We will never share your details with third parties.
          </p>
        </form>
      </div>
    </section>
  );
}

// ─── Related markets ──────────────────────────────────────────────────────────

function RelatedMarkets({ country }: { country: GlobalMarketConfig }) {
  const related = country.relatedSlugs
    .map(s => COUNTRY_BY_SLUG.get(s))
    .filter((c): c is GlobalMarketConfig => !!c && c.slug !== "india")
    .slice(0, 5);

  if (related.length === 0) return null;

  const tierLabel = {
    active:     "Active",
    developing: "Developing",
    planned:    "Planned",
  };

  return (
    <section className="py-10">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
          Also in {country.region}
        </p>
        <h2 className="text-[22px] font-black tracking-tight text-[#0a1628]">Related markets</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((rel) => (
            <Link
              key={rel.slug}
              href={`/global/${rel.slug}`}
              className="flex items-center gap-3 rounded-xl border border-[#dbe7f3] bg-white p-3.5 transition-all hover:border-[#1677f2]/40 hover:shadow-sm"
            >
              <span className="text-[22px]" aria-hidden="true">{flagEmoji(rel.iso2)}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-[#0a1628]">{rel.name}</p>
                <p className="text-[11px] text-[#64748b]">{rel.region}</p>
              </div>
              <TierBadge tier={rel.tier} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA({ country, scrollToForm }: { country: GlobalMarketConfig; scrollToForm: () => void }) {
  return (
    <section className="bg-[#0a1628] py-12 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="mb-3 text-[40px]" aria-hidden="true">{flagEmoji(country.iso2)}</div>
        <h2 className="text-[26px] font-black tracking-tight">
          Planning your move into {country.name}?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-white/65">
          Tell us what you are building. Our Global Market Desk will help you understand the
          likely regulatory, structural and professional-coordination pathway.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-6 py-3 text-[14px] font-black text-white shadow-lg shadow-[#1677f2]/30 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0a1628]"
          >
            Discuss Your {country.name} Plan
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-6 py-3 text-[14px] font-black text-white transition-all hover:border-white/40 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0a1628]"
          >
            Contact Estabizz
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Main page component ──────────────────────────────────────────────────────

export default function CountryLandingClient({ country }: { country: GlobalMarketConfig }) {
  const formSectionRef = useRef<HTMLElement>(null);
  const flag = flagEmoji(country.iso2);
  const depth = country.pageDepth;

  function scrollToForm() {
    const el = document.getElementById("enquiry-form");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <Breadcrumb country={country} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#070d1a] pb-12 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#1677f2]/10 blur-[100px]" />
          <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#1677f2]/8 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#1677f2]/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#6ab4ff]">
                  Global Market Desk
                </span>
                <span className="text-[10px] text-white/40" aria-hidden="true">·</span>
                <span className="text-[11px] font-semibold text-white/50">{country.region}</span>
                <TierBadge tier={country.tier} />
              </div>
              <div className="mb-2 text-[52px] leading-none lg:text-[64px]" aria-hidden="true">
                {flag}
              </div>
              <h1 className="text-[32px] font-black leading-[1.08] tracking-tight lg:text-[44px]">
                {country.headline ?? `Planning business expansion into ${country.name}?`}
              </h1>
              <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-white/65">
                {country.subheadline ??
                  `Estabizz helps businesses evaluate market-entry structures, regulatory pathways, documentation requirements and professional coordination for ${country.name}. Current enquiries are managed through our India-based Global Market Desk.`}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1677f2] px-6 py-3 text-[14px] font-black text-white shadow-lg shadow-[#1677f2]/30 transition-all hover:-translate-y-0.5 hover:bg-[#1260d4] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#070d1a] sm:justify-start"
                >
                  Discuss Your {country.name} Plan
                </button>
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/8 px-6 py-3 text-[14px] font-black text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#070d1a] sm:justify-start"
                >
                  Register Your Interest
                </button>
              </div>
            </div>

            {/* Status card */}
            <div className="flex flex-col gap-3 lg:min-w-[200px] lg:items-end">
              <div className="rounded-2xl border border-[#1677f2]/25 bg-[#1677f2]/10 px-5 py-4 backdrop-blur-sm">
                <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[#6ab4ff]">
                  Market Status
                </div>
                <div className="mt-1 text-[16px] font-black text-white">
                  {country.marketStatusLabel}
                </div>
              </div>
              {country.callingCode && (
                <div className="rounded-2xl border border-white/8 bg-white/5 px-5 py-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.15em] text-white/50">
                    Dial Code
                  </div>
                  <div className="mt-1 text-[16px] font-bold text-white/80">
                    <span aria-hidden="true">{flag}</span> {country.callingCode}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Status notice (developing / planned) */}
      <StatusNotice country={country} />

      {/* ── Full page sections ──────────────────────────────────────────── */}
      {depth === "full" && (
        <>
          <MarketEntryOverview country={country} />
          {country.regulators && country.regulators.length > 0 && (
            <section className="bg-[#f8fbff] py-12">
              <div className="mx-auto max-w-5xl px-6">
                <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
                  Regulatory Landscape
                </p>
                <h2 className="text-[24px] font-black tracking-tight text-[#0a1628]">
                  Key regulatory bodies
                </h2>
                <RegulatoryLandscape countryName={country.name} regulators={country.regulators} />
              </div>
            </section>
          )}
          <SupportAreas country={country} />
          <AudienceSection country={country} />
          <CorridorSection country={country} />
          <ProcessSection country={country} />
          <DeliverablesSection country={country} />
          <LeadForm country={country} />
          {country.faqs && country.faqs.length > 0 && (
            <section className="bg-[#f8fbff] py-12">
              <div className="mx-auto max-w-5xl px-6">
                <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
                  FAQs
                </p>
                <h2 className="text-[24px] font-black tracking-tight text-[#0a1628]">
                  Frequently asked questions
                </h2>
                <CountryFAQ faqs={country.faqs} countryName={country.name} />
              </div>
            </section>
          )}
          <RelatedMarkets country={country} />
          <FinalCTA country={country} scrollToForm={scrollToForm} />
        </>
      )}

      {/* ── Standard page sections ──────────────────────────────────────── */}
      {depth === "standard" && (
        <>
          <MarketEntryOverview country={country} />
          <SupportAreas country={country} />
          <AudienceSection country={country} />
          <CorridorSection country={country} />
          <ProcessSection country={country} />
          <DeliverablesSection country={country} />
          <LeadForm country={country} />
          {country.faqs && country.faqs.length > 0 && (
            <section className="bg-[#f8fbff] py-12">
              <div className="mx-auto max-w-5xl px-6">
                <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
                  FAQs
                </p>
                <h2 className="text-[24px] font-black tracking-tight text-[#0a1628]">
                  Frequently asked questions
                </h2>
                <CountryFAQ faqs={country.faqs} countryName={country.name} />
              </div>
            </section>
          )}
          <RelatedMarkets country={country} />
          <FinalCTA country={country} scrollToForm={scrollToForm} />
        </>
      )}

      {/* ── Compact page sections ───────────────────────────────────────── */}
      {depth === "compact" && (
        <>
          <SupportAreas country={country} />
          <AudienceSection country={country} />
          <LeadForm country={country} />
          <RelatedMarkets country={country} />
          <FinalCTA country={country} scrollToForm={scrollToForm} />
        </>
      )}
    </div>
  );
}
