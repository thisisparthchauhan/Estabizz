import { connectDB } from "@/lib/db";
import SubscriberModel from "@/lib/models/Subscriber";
import SubscribersClient, { type Subscriber } from "./SubscribersClient";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
    let subscribers: Subscriber[] = [];
    let dbError = false;
    try {
        await connectDB();
        const docs = (await SubscriberModel.find().sort({ createdAt: -1 }).limit(5000).lean()) as unknown as Record<string, unknown>[];
        subscribers = docs.map((d) => ({
            id: String(d._id),
            email: (d.email as string) || "",
            status: (d.status as string) || "active",
            source: (d.source as string) || "footer",
            pageUrl: (d.pageUrl as string) || "",
            createdAt: d.createdAt ? new Date(d.createdAt as string).toISOString() : "",
        }));
    } catch {
        dbError = true;
    }

    if (dbError) {
        return (
            <div className="p-6 md:p-8">
                <h1 className="mb-3 text-[24px] font-black tracking-[-0.02em] text-[#120b45] dark:text-[#fafafa]">Newsletter Subscribers</h1>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-[14px] font-semibold text-amber-700 dark:bg-[#2a2113] dark:text-[#fcd34d] dark:border-[#4a3a1a]">
                    Could not connect to the database. Check the MONGODB_URI environment variable.
                </div>
            </div>
        );
    }

    return <SubscribersClient subscribers={subscribers} />;
}
