import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getAdminUserByEmail } from '@/lib/admin/repository';
import type { AdminContext } from '@/lib/admin/requirePermission';
import { publicContentPathForEditorSlug } from '@/lib/publicContent/managedPaths';
import PublicContentVisualEditorClient from './PublicContentVisualEditorClient';

export const metadata: Metadata = {
  title: 'NBFC Registration Visual Editor — Estabizz Admin',
  robots: { index: false, follow: false },
};

async function getViewer(): Promise<AdminContext | null> {
  const token = (await cookies()).get('auth_token')?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) return null;

  try {
    const decoded = jwt.verify(token, secret) as { email?: string };
    const email = decoded.email?.toLowerCase().trim();
    if (!email) return null;
    const admin = await getAdminUserByEmail(email);
    if (!admin || admin.status !== 'active') return null;
    return { email: admin.email, role: admin.role, permissions: admin.permissions };
  } catch {
    return null;
  }
}

export default async function NbfcRegistrationVisualEditorPage() {
  const viewer = await getViewer();
  return (
    <PublicContentVisualEditorClient
      viewer={viewer}
      fullPath={publicContentPathForEditorSlug('nbfc-registration-in-india') ?? '/rbi/nbfc-registration-in-india'}
    />
  );
}
