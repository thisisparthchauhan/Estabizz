"use client";

import NavbarEditor from "./NavbarEditor";
import FooterEditor from "./FooterEditor";

export default function NavigationClient() {
  return (
    <div className="min-h-full bg-[#f4f7fb] dark:bg-[#06101f] p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-[21px] font-black text-[#0a1628] dark:text-[#f7f9fc]">Navigation</h1>
        <p className="mt-0.5 text-[13px] text-[#64748b] dark:text-[#a9b6c9]">
          Edit the site navbar and footer. Each section has its own Save button; changes go live across the whole site.
        </p>
      </div>

      <div className="space-y-10">
        <div className="space-y-3">
          <h2 className="text-[15px] font-black text-[#0a1628] dark:text-[#f7f9fc]">Navbar</h2>
          <NavbarEditor />
        </div>

        <FooterEditor />
      </div>
    </div>
  );
}
