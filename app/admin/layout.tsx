"use client";

/**
 * Admin Layout
 *
 * Renders as a fixed full-screen overlay (z-[2000]) so the public
 * Navbar / Footer from the root layout are visually covered without
 * touching root layout.tsx.
 *
 * Sidebar: 10 items in 3 groups — Content, Library, System.
 * Active item: gold accent (#d9a938) with left border indicator.
 *
 * TODO: Add JWT / session guard here once auth is wired.
 */

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── Navigation groups ────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    label: "Content",
    items: [
      { label: "Dashboard",     href: "/admin",               icon: "⬡" },
      { label: "Blogs",         href: "/admin/blogs",          icon: "☰" },
      { label: "Pending Blogs", href: "/admin/blogs/pending",  icon: "◷" },
      { label: "Add New Blog",  href: "/admin/blogs/new",      icon: "✚" },
    ],
  },
  {
    label: "Library",
    items: [
      { label: "Categories",    href: "/admin/categories",     icon: "⊟" },
      { label: "Media Library", href: "/admin/media",          icon: "⊞" },
      { label: "Authors",       href: "/admin/authors",        icon: "◉" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "SEO Settings",  href: "/admin/seo",            icon: "◎" },
      { label: "Admin Users",   href: "/admin/users",          icon: "⊛" },
      { label: "Settings",      href: "/admin/settings",       icon: "⊕" },
    ],
  },
];

// ─── Page-title map ───────────────────────────────────────────────────────────

const PAGE_TITLES: Record<string, string> = {
  "/admin":                 "Dashboard",
  "/admin/blogs":           "All Blogs",
  "/admin/blogs/pending":   "Pending Review",
  "/admin/blogs/new":       "New Blog",
  "/admin/categories":      "Categories",
  "/admin/media":           "Media Library",
  "/admin/authors":         "Authors",
  "/admin/seo":             "SEO Settings",
  "/admin/users":           "Admin Users",
  "/admin/settings":        "Settings",
};

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.startsWith("/admin/blogs/edit")) return "Edit Blog";
  return "Admin";
}

// ─── SidebarLink ─────────────────────────────────────────────────────────────

function SidebarLink({
  href,
  icon,
  label,
  active,
  collapsed,
}: {
  href: string;
  icon: string;
  label: string;
  active: boolean;
  collapsed: boolean;
}) {
  const base =
    "group relative flex items-center gap-3 rounded-xl text-[13px] font-medium transition-all duration-150";
  const activeClass =
    "bg-[#d9a938]/15 text-[#d9a938] pl-[10px] pr-3 py-2.5 border-l-2 border-[#d9a938]";
  const idleClass =
    "text-white/55 hover:text-white hover:bg-white/8 px-3 py-2.5";

  return (
    <Link href={href} className={`${base} ${active ? activeClass : idleClass}`} title={label}>
      <span
        className={`text-[15px] shrink-0 leading-none transition-transform ${
          active ? "text-[#d9a938]" : "group-hover:scale-110"
        }`}
      >
        {icon}
      </span>
      {!collapsed && <span className="truncate leading-none">{label}</span>}
    </Link>
  );
}

// ─── Main layout ─────────────────────────────────────────────────────────────

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Exact match for /admin, prefix match for all others
  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    if (href === "/admin/blogs") {
      // Active only when on the blogs list, not on sub-paths like /new, /pending, /edit
      return (
        pathname === "/admin/blogs" ||
        pathname.startsWith("/admin/blogs/edit")
      );
    }
    return pathname.startsWith(href);
  }

  const pageTitle = getPageTitle(pathname);

  return (
    <div className="fixed inset-0 z-[2000] flex overflow-hidden bg-[#f0f4f8] font-sans">

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        className={`${
          collapsed ? "w-[60px]" : "w-[228px]"
        } shrink-0 flex flex-col bg-[#071224] border-r border-white/[0.07] transition-all duration-200 overflow-hidden`}
      >
        {/* Brand bar */}
        <div
          className={`flex items-center gap-2.5 border-b border-white/[0.07] px-4 py-[15px] ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#d9a938] via-[#b8860b] to-[#071224] flex items-center justify-center font-black text-[#071224] text-[14px] shrink-0 shadow-[0_4px_14px_rgba(217,169,56,0.35)]">
            E
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-[13px] font-black text-white leading-tight truncate tracking-wide">
                Estabizz
              </div>
              <div className="text-[10px] text-[#d9a938]/80 font-semibold tracking-[0.08em] uppercase">
                Admin Panel
              </div>
            </div>
          )}
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto py-3 [&::-webkit-scrollbar]:hidden">
          {NAV_GROUPS.map((group, gi) => (
            <div key={group.label} className={gi > 0 ? "mt-4" : ""}>
              {/* Group label */}
              {!collapsed && (
                <div className="px-4 pb-1 pt-0.5">
                  <span className="text-[9.5px] font-black uppercase tracking-[0.14em] text-white/25">
                    {group.label}
                  </span>
                </div>
              )}
              {collapsed && gi > 0 && (
                <div className="mx-3 mb-2 border-t border-white/[0.07]" />
              )}
              {/* Items */}
              <div className="space-y-0.5 px-2">
                {group.items.map((item) => (
                  <SidebarLink
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    active={isActive(item.href)}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* View Public Site */}
        <div className="border-t border-white/[0.07] p-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-medium text-white/35 transition-all hover:text-[#d9a938]/80 hover:bg-white/[0.04]"
            title="View Public Site"
          >
            <span className="text-[14px] shrink-0">↗</span>
            {!collapsed && <span className="truncate">View Public Site</span>}
          </a>
        </div>

        {/* Collapse toggle */}
        <div className="p-2 border-t border-white/[0.07]">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="w-full flex items-center justify-center py-2 rounded-xl text-white/25 hover:text-white/70 hover:bg-white/[0.06] text-[12px] transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? "▶" : "◀"}
          </button>
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="h-[52px] shrink-0 flex items-center justify-between px-6 bg-white border-b border-[#e2e8f0] shadow-[0_1px_4px_rgba(15,23,42,0.05)]">
          <div className="flex items-center gap-3">
            {/* Breadcrumb */}
            <span className="text-[12px] text-[#94a3b8] font-medium hidden sm:inline">
              Admin
            </span>
            <span className="text-[#d9a938]/60 hidden sm:inline text-[11px]">/</span>
            <span className="text-[13px] font-black text-[#0a1628]">
              {pageTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Pending badge */}
            <Link
              href="/admin/blogs/pending"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#d9a938]/10 border border-[#d9a938]/30 px-2.5 py-1 text-[11px] font-bold text-[#b8860b] hover:bg-[#d9a938]/20 transition-colors"
            >
              <span className="text-[8px] text-[#d9a938]">●</span>
              Pending Review
            </Link>

            <span className="text-[12px] font-medium text-[#94a3b8] hidden md:inline">
              admin@estabizz.com
            </span>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d9a938] to-[#b8860b] flex items-center justify-center text-[#071224] text-[11px] font-black shadow-sm">
              A
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
