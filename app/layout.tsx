import type { Metadata } from "next";
import LiveBackground from "@/components/ui/LiveBackground";
import ReadingProgress from "@/components/ui/ReadingProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";
import "@/app/globals.css"; // Assuming the user will have this

export const metadata: Metadata = {
    title: "Estabizz Fintech | Compliance & Licensing",
    description: "Leading regulatory advisory firm for RBI, SEBI, IRDAI, and IFSCA.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased selection:bg-[#0096D6] selection:text-white relative bg-transparent">
                <LiveBackground />
                <ReadingProgress />
                <div className="relative z-10 w-full min-h-screen bg-transparent">
                    {children}
                </div>
                <ScrollToTop />
            </body>
        </html>
    );
}
