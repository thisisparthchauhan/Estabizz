// Compliance Portal section — default content (single source of truth).
export interface PortalFeature { icon: string; title: string; desc: string; color: string }

export interface CompliancePortalContent {
  label: string;
  heading: string;
  subtitle: string;
  description: string;
  checklistTitle: string;
  checklistItems: string[];
  features: PortalFeature[];
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  footnote: string;
}

export const COMPLIANCE_PORTAL_DEFAULTS: CompliancePortalContent = {
  label: "FOR FOUNDERS, CFOs & COMPLIANCE TEAMS",
  heading: "COMPLIANCE PORTAL",
  subtitle: "One Portal. Complete Regulatory Control.",
  description:
    "Manage your compliance lifecycle through a secure, structured and regulator-ready digital platform. From licence tracking and document uploads to policy frameworks and compliance alerts, the Estabizz Compliance Hub brings everything your business needs into one place.",
  checklistTitle: "What You Can Do Inside the Estabizz Portal",
  checklistItems: [
    "Create your secure compliance account",
    "Track all regulatory licences and application status",
    "Upload and manage documents digitally",
    "Receive real-time compliance alerts & reminders",
    "Access ready-to-use regulatory policy templates",
    "Apply for new registrations seamlessly",
    "Monitor your compliance calendar",
    "Explore regulatory FAQs and guidance notes",
    "Manage intermediary compliance (NBFC, AIF, Broker, PA, RIA, FME, etc.)",
    "Avail exclusive registration support and structured execution",
  ],
  features: [
    { icon: "📊", title: "Compliance Dashboard", desc: "A centralised control panel to monitor filings, approvals, deadlines, and regulatory status across authorities.", color: "#1677f2" },
    { icon: "🔒", title: "Secure Document Vault", desc: "Encrypted storage for statutory documents, policies, licences and regulatory submissions.", color: "#10b981" },
    { icon: "📅", title: "Smart Compliance Calendar", desc: "Automated reminders for RBI, SEBI, IRDAI, IFSCA, ROC, Income Tax and other regulatory filings.", color: "#F59E0B" },
    { icon: "📚", title: "Policy & Framework Library", desc: "Ready-to-adopt AML, KYC, grievance redressal, risk management, internal audit and other mandatory compliance policies.", color: "#7C3AED" },
    { icon: "🔔", title: "Regulatory Alert System", desc: "Stay updated with regulatory circulars, notifications, and industry-specific compliance changes.", color: "#EF4444" },
    { icon: "📋", title: "Guided Application Management", desc: "Apply for new licences and registrations with structured documentation guidance and expert review support.", color: "#0077B6" },
  ],
  primaryBtnText: "Launch Your Compliance Dashboard",
  primaryBtnLink: "/contact",
  secondaryBtnText: "Create Your Account",
  secondaryBtnLink: "/contact",
  footnote: "Compliance is no longer fragmented. It is structured, monitored and controlled from a single secure platform.",
};
