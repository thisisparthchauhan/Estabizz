"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import type { AdminRole } from "@/lib/admin/types";
import { AdminRoleContext } from "./AdminContext";

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconGrid() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
function IconList() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconTag() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
function IconImage() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
function IconLayout() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" />
    </svg>
  );
}
function IconEdit() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
}
function IconChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function IconArchive() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
function IconTrash() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
function IconTool() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
function IconMenu() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

// ─── Nav types ────────────────────────────────────────────────────────────────

type NavItem = {
  kind: "item";
  label: string;
  href: string;
  icon: React.ReactNode;
  pendingBadge?: boolean;
};
type NavSection = { kind: "section"; label: string };
type NavEntry = NavItem | NavSection;

// ─── Nav entries ──────────────────────────────────────────────────────────────

const NAV_ENTRIES: NavEntry[] = [
  { kind: "section", label: "General" },
  { kind: "item", label: "Dashboard",       href: "/admin",                    icon: <IconGrid /> },
  { kind: "item", label: "Approval Queue",  href: "/admin/approval-queue",     icon: <IconClock />, pendingBadge: true },
  { kind: "item", label: "Change History",  href: "/admin/change-history",     icon: <IconList /> },
  { kind: "item", label: "Restore",         href: "/admin/restore",            icon: <IconClock /> },

  { kind: "section", label: "Content" },
  { kind: "item", label: "Users & Roles",   href: "/admin/users",              icon: <IconUsers /> },
  { kind: "item", label: "Website Editor",  href: "/admin/website",            icon: <IconEdit /> },
  { kind: "item", label: "Content Pages",   href: "/admin/content-pages",      icon: <IconList /> },
  { kind: "item", label: "Page SEO",        href: "/admin/seo",                icon: <IconSearch /> },
  { kind: "item", label: "Regulatory Updates", href: "/admin/regulatory-updates", icon: <IconShield /> },
  { kind: "item", label: "Leads",           href: "/admin/leads",              icon: <IconList /> },

  { kind: "section", label: "Recruitment" },
  { kind: "item", label: "Jobs Dashboard",  href: "/admin/jobs/dashboard",     icon: <IconGrid /> },
  { kind: "item", label: "All Jobs",        href: "/admin/jobs",               icon: <IconList /> },
  { kind: "item", label: "New Job",         href: "/admin/jobs/new",           icon: <IconPlus /> },
  { kind: "item", label: "Applications",    href: "/admin/jobs/applications",  icon: <IconList /> },
  { kind: "item", label: "Candidates",      href: "/admin/jobs/candidates",    icon: <IconUsers /> },
  { kind: "item", label: "Interviews",      href: "/admin/jobs/interviews",    icon: <IconClock /> },
  { kind: "item", label: "Tasks",           href: "/admin/jobs/tasks",         icon: <IconList /> },

  { kind: "section", label: "Blog" },
  { kind: "item", label: "All Blogs",       href: "/admin/blogs",              icon: <IconList /> },
  { kind: "item", label: "New Blog",        href: "/admin/blogs/new",          icon: <IconPlus /> },
  { kind: "item", label: "Pending Review",  href: "/admin/blogs/pending",      icon: <IconClock /> },
  { kind: "item", label: "Categories",      href: "/admin/categories",         icon: <IconTag /> },
  { kind: "item", label: "Media Library",   href: "/admin/media-library",      icon: <IconImage /> },

  { kind: "section", label: "System" },
  { kind: "item", label: "Recycle Bin",     href: "/admin/recycle-bin",        icon: <IconTrash /> },
  { kind: "item", label: "Backups",         href: "/admin/backups",            icon: <IconArchive /> },
  { kind: "item", label: "Navigation",      href: "/admin/navigation",         icon: <IconLayout /> },
  { kind: "item", label: "Internal Tools",  href: "/admin/tools",              icon: <IconTool /> },
];

// ─── Role-based nav filtering ─────────────────────────────────────────────────

const WRITER_NAV_HREFS = new Set([
  "/admin/blogs", "/admin/blogs/new", "/admin/blogs/pending",
  "/admin/categories", "/admin/media-library",
]);

const RECRUITMENT_NAV_HREFS = new Set([
  "/admin/jobs/dashboard", "/admin/jobs", "/admin/jobs/new",
  "/admin/jobs/applications", "/admin/jobs/candidates",
  "/admin/jobs/interviews", "/admin/jobs/tasks",
]);

const ROLES_WITH_MANAGE_JOBS = new Set<AdminRole>(["super_admin", "admin"]);

function getVisibleEntries(entries: NavEntry[], adminRole: AdminRole | undefined): NavEntry[] {
  const isWriter = adminRole === "content_writer";
  const hasManageJobs = adminRole ? ROLES_WITH_MANAGE_JOBS.has(adminRole) : false;

  if (!isWriter && hasManageJobs) return entries;

  const result: NavEntry[] = [];
  let pendingSection: NavSection | null = null;
  for (const e of entries) {
    if (e.kind === "section") {
      pendingSection = e;
    } else {
      const allowed = isWriter
        ? WRITER_NAV_HREFS.has(e.href)
        : !RECRUITMENT_NAV_HREFS.has(e.href);
      if (allowed) {
        if (pendingSection) { result.push(pendingSection); pendingSection = null; }
        result.push(e);
      }
    }
  }
  return result;
}

// ─── Page title map ───────────────────────────────────────────────────────────

const PAGE_TITLES: Record<string, string> = {
  "/admin":                        "Dashboard",
  "/admin/approval-queue":         "Approval Queue",
  "/admin/change-history":         "Change History",
  "/admin/restore":                "Restore",
  "/admin/users":                  "Users & Roles",
  "/admin/website":                "Website Editor",
  "/admin/content-pages":          "Content Pages",
  "/admin/seo":                    "Page SEO",
  "/admin/regulatory-updates":     "Regulatory Update Desk",
  "/admin/leads":                  "Leads",
  "/admin/jobs":                   "Job Postings",
  "/admin/jobs/dashboard":         "Jobs Dashboard",
  "/admin/jobs/new":               "New Job",
  "/admin/jobs/applications":      "Applications",
  "/admin/jobs/candidates":        "Candidates",
  "/admin/jobs/interviews":        "Interviews",
  "/admin/jobs/tasks":             "Tasks",
  "/admin/blogs":                  "All Blogs",
  "/admin/blogs/new":              "New Blog",
  "/admin/blogs/pending":          "Pending Review",
  "/admin/categories":             "Categories",
  "/admin/media-library":          "Media Library",
  "/admin/recycle-bin":            "Recycle Bin",
  "/admin/backups":                "Backups",
  "/admin/navigation":             "Navigation",
  "/admin/tools":                  "Internal Tools",
};

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.startsWith("/admin/blogs/edit"))       return "Edit Blog";
  if (pathname.startsWith("/admin/content-pages"))    return "Content Pages";
  if (pathname.startsWith("/admin/website"))          return "Website Editor";
  if (pathname.startsWith("/admin/tools"))            return "Internal Tools";
  if (pathname.startsWith("/admin/jobs/applications")) return "Applications";
  if (pathname.startsWith("/admin/jobs/candidates"))  return "Candidates";
  if (pathname.startsWith("/admin/jobs/interviews"))  return "Interviews";
  if (pathname.startsWith("/admin/jobs/tasks"))       return "Tasks";
  if (pathname.startsWith("/admin/jobs/") && pathname.includes("/edit")) return "Edit Job";
  return "Admin";
}

function getBreadcrumbs(pathname: string): string[] {
  const title = getPageTitle(pathname);
  if (pathname === "/admin") return ["Admin", "Dashboard"];
  return ["Admin", title];
}

// ─── Sidebar building blocks ──────────────────────────────────────────────────

function SidebarBrand({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 border-b border-white/[0.06] px-4 py-[14px] shrink-0 ${collapsed ? "justify-center" : ""}`}>
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1677f2] via-[#c8921a] to-[#8b6110] flex items-center justify-center font-black text-[#071224] text-[15px] shrink-0 shadow-[0_4px_14px_rgba(217,169,56,0.30)]">
        E
      </div>
      {!collapsed && (
        <div className="min-w-0">
          <div className="text-[13px] font-black text-white leading-tight truncate">Estabizz Admin</div>
          <div className="text-[9.5px] text-[#1677f2]/70 font-semibold tracking-[0.09em] uppercase mt-0.5">Content Panel</div>
        </div>
      )}
    </div>
  );
}

function SidebarSectionLabel({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) return <div className="my-2 mx-2 border-t border-white/[0.06]" />;
  return (
    <p className="mt-4 mb-1 px-3 text-[9px] font-black uppercase tracking-[0.14em] text-white/25 select-none">
      {label}
    </p>
  );
}

function SidebarNavLink({
  item, active, collapsed, pendingCount, onClick,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  pendingCount: number;
  onClick?: () => void;
}) {
  const base = "relative flex items-center gap-3 rounded-xl text-[13px] font-medium transition-all duration-150 overflow-hidden";
  const activeClass = "bg-[#1677f2]/15 text-[#1677f2] pl-[10px] pr-3 py-2.5 border-l-[3px] border-[#1677f2]";
  const idleClass = "text-white/50 hover:text-white/80 hover:bg-white/[0.07] px-3 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677f2]/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#071224]";
  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      onClick={onClick}
      className={`${base} ${active ? activeClass : idleClass}`}
    >
      <span className={`shrink-0 ${active ? "text-[#1677f2]" : ""}`}>{item.icon}</span>
      {!collapsed && <span className="truncate leading-none flex-1">{item.label}</span>}
      {!collapsed && item.pendingBadge && pendingCount > 0 && (
        <span className="ml-auto flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[#1677f2] px-1 text-[9.5px] font-black text-[#071224] leading-none">
          {pendingCount > 99 ? "99+" : pendingCount}
        </span>
      )}
      {collapsed && item.pendingBadge && pendingCount > 0 && (
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#1677f2]" />
      )}
    </Link>
  );
}

function SidebarNav({
  entries, collapsed, activeCheck, pendingCount, onLinkClick,
}: {
  entries: NavEntry[];
  collapsed: boolean;
  activeCheck: (href: string) => boolean;
  pendingCount: number;
  onLinkClick?: () => void;
}) {
  return (
    <nav className="flex-1 overflow-y-auto py-2 [&::-webkit-scrollbar]:hidden" aria-label="Main navigation">
      <div className="space-y-0.5 px-2">
        {entries.map((entry, i) =>
          entry.kind === "section"
            ? <SidebarSectionLabel key={`s-${i}`} label={entry.label} collapsed={collapsed} />
            : <SidebarNavLink key={entry.href} item={entry} active={activeCheck(entry.href)} collapsed={collapsed} pendingCount={pendingCount} onClick={onLinkClick} />
        )}
      </div>
    </nav>
  );
}

// ─── Main layout ─────────────────────────────────────────────────────────────

export default function AdminShell({
  children,
  adminEmail,
  adminRole,
}: {
  children: React.ReactNode;
  adminEmail?: string;
  adminRole?: AdminRole;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // auto-collapse on tablet (768–1023px) on first client render
  useEffect(() => {
    setCollapsed(window.innerWidth < 1024);
  }, []);

  // close mobile drawer whenever route changes
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // ESC closes mobile drawer
  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setDrawerOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [drawerOpen]);

  // fetch approval count once
  useEffect(() => {
    fetch("/api/admin/approval-queue/count")
      .then((r) => r.ok ? r.json() : { count: 0 })
      .then((d: { count?: number }) => setPendingCount(d.count ?? 0))
      .catch(() => setPendingCount(0));
  }, []);

  const visibleEntries = getVisibleEntries(NAV_ENTRIES, adminRole);

  const JOBS_NAMED = [
    "/admin/jobs/dashboard", "/admin/jobs/new", "/admin/jobs/applications",
    "/admin/jobs/candidates", "/admin/jobs/interviews", "/admin/jobs/tasks",
  ];

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    if (href === "/admin/blogs") return pathname === "/admin/blogs" || pathname.startsWith("/admin/blogs/edit");
    if (href === "/admin/jobs") {
      return pathname === "/admin/jobs" ||
        (pathname.startsWith("/admin/jobs/") && !JOBS_NAMED.some((p) => pathname.startsWith(p)));
    }
    return pathname.startsWith(href);
  }

  const pageTitle = getPageTitle(pathname);
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <AdminRoleContext.Provider value={adminRole ?? null}>
      <div className="fixed inset-0 z-[2000] flex overflow-hidden font-sans">

        {/* ── Mobile backdrop ──────────────────────────────────────────────── */}
        <div
          className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 md:hidden ${drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />

        {/* ── Mobile drawer ────────────────────────────────────────────────── */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col bg-[#071224] dark:bg-[var(--sidebar-background)] border-r border-white/[0.06] dark:border-[#2d4a6b] transition-transform duration-200 md:hidden overflow-hidden`}
          style={{ transform: drawerOpen ? "translateX(0)" : "translateX(-100%)" }}
          aria-label="Navigation drawer"
          aria-hidden={!drawerOpen}
        >
          <SidebarBrand collapsed={false} />
          <SidebarNav entries={visibleEntries} collapsed={false} activeCheck={isActive} pendingCount={pendingCount} onLinkClick={() => setDrawerOpen(false)} />
          <div className="shrink-0 border-t border-white/[0.06] p-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] font-medium text-white/35 transition-all hover:text-[#1677f2]/80 hover:bg-white/[0.04]"
              title="Back to Site"
            >
              <span className="shrink-0"><IconArrowLeft /></span>
              <span className="truncate">Back to Site</span>
            </a>
          </div>
        </aside>

        {/* ── Desktop sidebar ──────────────────────────────────────────────── */}
        <aside
          className={`flex-shrink-0 flex flex-col overflow-hidden transition-[width] duration-200 bg-[#071224] dark:bg-[var(--sidebar-background)] border-r border-white/[0.06] dark:border-[#2d4a6b] w-0 ${collapsed ? "md:w-[68px]" : "md:w-[240px]"}`}
        >
          <SidebarBrand collapsed={collapsed} />
          <SidebarNav entries={visibleEntries} collapsed={collapsed} activeCheck={isActive} pendingCount={pendingCount} />
          <div className="shrink-0 border-t border-white/[0.06] p-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] font-medium text-white/35 transition-all hover:text-[#1677f2]/80 hover:bg-white/[0.04] ${collapsed ? "justify-center" : ""}`}
              title="Back to Site"
            >
              <span className="shrink-0"><IconArrowLeft /></span>
              {!collapsed && <span className="truncate">Back to Site</span>}
            </a>
          </div>
          <div className="shrink-0 p-2 border-t border-white/[0.06]">
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="w-full flex items-center justify-center py-2 rounded-xl text-white/25 hover:text-white/60 hover:bg-white/[0.05] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677f2]/50"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
            </button>
          </div>
        </aside>

        {/* ── Main area ────────────────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden bg-[#f4f7fb] dark:bg-[#06101f] min-w-0">

          {/* Top bar */}
          <header className="h-[52px] shrink-0 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-[#0d1a2d] border-b border-[#e2e8f0] dark:border-[#223550] shadow-[0_1px_4px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3 min-w-0">
              {/* Hamburger — mobile only */}
              <button
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-[#64748b] hover:text-[#0a1628] hover:bg-[#f1f5f9] dark:hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677f2]/60"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation"
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
              >
                <IconMenu />
              </button>

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 min-w-0">
                {breadcrumbs.map((crumb, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="text-[#1677f2]/50 text-[11px] shrink-0">/</span>}
                    <span
                      className={
                        i === breadcrumbs.length - 1
                          ? "text-[13px] font-black text-[#0a1628] dark:text-[#f7f9fc] truncate"
                          : "text-[12px] font-medium text-[#94a3b8] dark:text-[#a9b6c9] hidden sm:inline shrink-0"
                      }
                    >
                      {crumb}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 shrink-0">
              <ThemeToggle variant="icon-only" />
              {pendingCount > 0 && (
                <Link
                  href="/admin/approval-queue"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#1677f2]/10 border border-[#1677f2]/30 px-2.5 py-1 text-[11px] font-bold text-[#b8860b] hover:bg-[#1677f2]/20 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1677f2] shrink-0" />
                  Pending {pendingCount}
                </Link>
              )}
              <span className="text-[12px] font-medium text-[#94a3b8] dark:text-[#a9b6c9] hidden md:inline truncate max-w-[160px]">
                {adminEmail ?? "admin@estabizz.com"}
              </span>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1677f2] to-[#b8860b] flex items-center justify-center text-[#071224] text-[11px] font-black uppercase shadow-sm shrink-0">
                {adminEmail?.[0] ?? "A"}
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </AdminRoleContext.Provider>
  );
}
