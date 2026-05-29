import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Users — Estabizz Admin",
  robots: { index: false, follow: false },
};

const PLACEHOLDER_USERS = [
  { name: "Admin",          email: "admin@estabizz.com",     role: "Super Admin", status: "Active" },
  { name: "Editorial Team", email: "editorial@estabizz.com", role: "Editor",      status: "Active" },
];

export default function AdminUsersPage() {
  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-[21px] font-black text-[#0a1628]">Admin Users</h1>
          <p className="mt-0.5 text-[13px] text-[#64748b]">
            Manage who has access to the admin panel and their permissions.
          </p>
        </div>
        <button
          disabled
          className="inline-flex items-center gap-2 rounded-xl bg-[#0a1628]/40 px-4 py-2 text-[12px] font-bold text-white cursor-not-allowed"
          title="Coming soon"
        >
          ✚ Invite User
        </button>
      </div>

      <div className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
        <div className="border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3 flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">
            Current Users
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-500">
            {PLACEHOLDER_USERS.length} users
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#f0f4f8]">
                <th className="px-6 py-3 text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Name</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Email</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Role</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fafc]">
              {PLACEHOLDER_USERS.map((user) => (
                <tr key={user.email} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#d9a938] to-[#b8860b] text-[11px] font-black text-[#071224]">
                        {user.name[0]}
                      </div>
                      <span className="text-[13px] font-bold text-[#0a1628]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[13px] text-[#475569]">{user.email}</td>
                  <td className="px-4 py-3.5">
                    <span className={`rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${
                      user.role === "Super Admin"
                        ? "bg-[#d9a938]/10 text-[#b8860b] border-[#d9a938]/30"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[#f0f4f8] bg-[#fffbf0] px-6 py-4">
          <div className="flex items-start gap-3 rounded-xl border border-[#d9a938]/30 bg-[#d9a938]/8 px-4 py-3">
            <span className="text-[#d9a938] text-lg mt-0.5 shrink-0">ℹ</span>
            <p className="text-[12px] text-[#b8860b] font-medium leading-5">
              User management requires authentication to be wired. Full role-based access
              control (RBAC) with JWT sessions is on the development roadmap.
              Currently all admin routes are unguarded (dev mode).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
