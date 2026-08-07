"use client";

import { createContext, useContext } from "react";
import type { AdminRole } from "@/lib/admin/types";

export const AdminRoleContext = createContext<AdminRole | null>(null);

export function useAdminRole(): AdminRole | null {
  return useContext(AdminRoleContext);
}
