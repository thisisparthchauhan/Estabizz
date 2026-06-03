import type { Metadata } from "next";
import LiveBackground from "@/components/ui/LiveBackground";
import ReadingProgress from "@/components/ui/ReadingProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ChatWidget from "@/components/ui/ChatWidget";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "@/app/globals.css"; // Assuming the user will have this

// metadataBase is inherited by every page/route that uses relative canonical/OG URLs.
// It ensures Next.js resolves `/blogs`, `/blogs/[slug]` etc. to absolute URLs
// in <link rel="canonical">, og:url, og:image, and Twitter card meta tags.
export const metadata: Metadata = {
    metadataBase: new URL("https://www.estabizz.com"),
    title: {
        default: "Estabizz Fintech | Compliance & Licensing",
        template: "%s | Estabizz Fintech",
    },
    description: "Leading regulatory advisory firm for RBI, SEBI, IRDAI, and IFSCA.",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="/tailwind.css" />
            </head>
            <body className="antialiased selection:bg-[#1677f2] selection:text-white relative bg-transparent">
                <LiveBackground />
                <ReadingProgress />
                <div className="relative z-10 w-full min-h-screen bg-transparent">
                    <Navbar />
                    {children}
                    <Footer />
                </div>
                <ScrollToTop />
                <ChatWidget />
            </body>
        </html>
    );
}
