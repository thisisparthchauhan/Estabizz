import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function RegulatoryUpdateEmailTemplateRedirect() {
    redirect("/admin/resources");
}
