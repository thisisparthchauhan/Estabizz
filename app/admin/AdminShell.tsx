"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconGrid() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function IconList() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
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
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function IconLayout() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
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
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
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

// ─── Nav config ───────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  pendingBadge?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard",      href: "/admin",               icon: <IconGrid /> },
  { label: "Website Editor", href: "/admin/website",        icon: <IconEdit /> },
  { label: "Leads",          href: "/admin/leads",          icon: <IconList /> },
  { label: "All Blogs",      href: "/admin/blogs",          icon: <IconList /> },
  { label: "New Blog",       href: "/admin/blogs/new",      icon: <IconPlus /> },
  { label: "Pending Review", href: "/admin/blogs/pending",  icon: <IconClock />, pendingBadge: true },
  { label: "Categories",     href: "/admin/categories",     icon: <IconTag /> },
  { label: "Media",          href: "/admin/media",          icon: <IconImage /> },
  { label: "Navigation",     href: "/admin/navigation",     icon: <IconLayout /> },
];

// ─── Page title map ───────────────────────────────────────────────────────────

const PAGE_TITLES: Record<string, string> = {
  "/admin":                "Dashboard",
  "/admin/website":        "Website Editor",
  "/admin/leads":          "Leads",
  "/admin/blogs":          "All Blogs",
  "/admin/blogs/new":      "New Blog",
  "/admin/blogs/pending":  "Pending Review",
  "/admin/categories":     "Categories",
  "/admin/media":          "Media",
  "/admin/navigation":     "Navigation",
};

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.startsWith("/admin/blogs/edit")) return "Edit Blog";
  if (pathname.startsWith("/admin/website")) return "Website Editor";
  return "Admin";
}

function getBreadcrumbs(pathname: string): string[] {
  const title = getPageTitle(pathname);
  if (pathname === "/admin") return ["Admin", "Dashboard"];
  return ["Admin", title];
}

// ─── Sidebar link ─────────────────────────────────────────────────────────────

function SidebarLink({
  item,
  active,
  collapsed,
  pendingCount,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  pendingCount: number;
}) {
  const base =
    "relative flex items-center gap-3 rounded-xl text-[13px] font-medium transition-all duration-150 overflow-hidden";
  const activeClass =
    "bg-[#1677f2]/15 text-[#1677f2] pl-[10px] pr-3 py-2.5 border-l-[3px] border-[#1677f2]";
  const idleClass =
    "text-white/50 hover:text-white/80 hover:bg-white/[0.07] px-3 py-2.5";

  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={`${base} ${active ? activeClass : idleClass}`}
    >
      <span className={`shrink-0 ${active ? "text-[#1677f2]" : ""}`}>
        {item.icon}
      </span>
      {!collapsed && (
        <span className="truncate leading-none flex-1">{item.label}</span>
      )}
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

// ─── Main layout ─────────────────────────────────────────────────────────────

export default function AdminShell({
  children,
  adminEmail,
}: {
  children: React.ReactNode;
  adminEmail?: string;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Fetch pending count once on mount
  useEffect(() => {
    fetch("/api/admin/blogs/pending-count")
      .then((r) => r.ok ? r.json() : { count: 0 })
      .then((d: { count?: number }) => setPendingCount(d.count ?? 0))
      .catch(() => setPendingCount(0));
  }, []);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    if (href === "/admin/blogs") {
      return (
        pathname === "/admin/blogs" ||
        pathname.startsWith("/admin/blogs/edit")
      );
    }
    return pathname.startsWith(href);
  }

  const pageTitle = getPageTitle(pathname);
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <div className="fixed inset-0 z-[2000] flex overflow-hidden font-sans">

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        className={`${
          collapsed ? "w-[60px]" : "w-[220px]"
        } shrink-0 flex flex-col bg-[#071224] border-r border-white/[0.06] transition-all duration-200 overflow-hidden`}
      >
        {/* Brand bar */}
        <div
          className={`flex items-center gap-2.5 border-b border-white/[0.06] px-4 py-[14px] ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1677f2] via-[#c8921a] to-[#8b6110] flex items-center justify-center font-black text-[#071224] text-[15px] shrink-0 shadow-[0_4px_14px_rgba(217,169,56,0.30)]">
            E
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-[13px] font-black text-white leading-tight truncate">
                Estabizz Admin
              </div>
              <div className="text-[9.5px] text-[#1677f2]/70 font-semibold tracking-[0.09em] uppercase mt-0.5">
                Content Panel
              </div>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 [&::-webkit-scrollbar]:hidden">
          <div className="space-y-0.5 px-2">
            {NAV_ITEMS.map((item) => (
              <SidebarLink
                key={item.href}
                item={item}
                active={isActive(item.href)}
                collapsed={collapsed}
                pendingCount={pendingCount}
              />
            ))}
          </div>
        </nav>

        {/* Back to Site */}
        <div className="border-t border-white/[0.06] p-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] font-medium text-white/35 transition-all hover:text-[#1677f2]/80 hover:bg-white/[0.04] ${
              collapsed ? "justify-center" : ""
            }`}
            title="Back to Site"
          >
            <span className="shrink-0"><IconArrowLeft /></span>
            {!collapsed && <span className="truncate">Back to Site</span>}
          </a>
        </div>

        {/* Collapse toggle */}
        <div className="p-2 border-t border-white/[0.06]">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="w-full flex items-center justify-center py-2 rounded-xl text-white/25 hover:text-white/60 hover:bg-white/[0.05] transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
          </button>
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#f4f7fb]">

        {/* Top bar */}
        <header className="h-[52px] shrink-0 flex items-center justify-between px-6 bg-white border-b border-[#e2e8f0] shadow-[0_1px_4px_rgba(15,23,42,0.05)]">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <span className="text-[#1677f2]/50 text-[11px]">/</span>
                )}
                <span
                  className={
                    i === breadcrumbs.length - 1
                      ? "text-[13px] font-black text-[#0a1628]"
                      : "text-[12px] font-medium text-[#94a3b8] hidden sm:inline"
                  }
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {pendingCount > 0 && (
              <Link
                href="/admin/blogs/pending"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#1677f2]/10 border border-[#1677f2]/30 px-2.5 py-1 text-[11px] font-bold text-[#b8860b] hover:bg-[#1677f2]/20 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1677f2] shrink-0" />
                Pending {pendingCount}
              </Link>
            )}

            <span className="text-[12px] font-medium text-[#94a3b8] hidden md:inline">
              {adminEmail ?? "admin@estabizz.com"}
            </span>

            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1677f2] to-[#b8860b] flex items-center justify-center text-[#071224] text-[11px] font-black uppercase shadow-sm">
              {adminEmail?.[0] ?? "A"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
