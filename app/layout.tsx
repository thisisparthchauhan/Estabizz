import type { Metadata } from "next";
import LiveBackground from "@/components/ui/LiveBackground";
import ReadingProgress from "@/components/ui/ReadingProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ChatWidget from "@/components/ui/ChatWidget";
import Navbar from "@/components/layout/Navbar";
import Footer, { type FooterContent } from "@/components/layout/Footer";
import type { NavbarContent } from "@/lib/content/navbarDefaults";
import { getContent } from "@/lib/content/getContent";
import "@/app/globals.css"; // Assuming the user will have this

// metadataBase is inherited by every page/route that uses relative canonical/OG URLs.
// It ensures Next.js resolves `/blogs`, `/blogs/[slug]` etc. to absolute URLs
// in <link rel="canonical">, og:url, og:image, and Twitter card meta tags.
export const metadata: Metadata = {
    metadataBase: new URL("https://www.estabizz.com"),
    title: {
        default: "Estabizz Fintech Private Limited | Regulatory Licensing & Compliance",
        template: "%s | Estabizz Fintech",
    },
    description: "Estabizz supports businesses with RBI, SEBI, IRDAI, IFSCA, FIU, MCA and sectoral licensing, regulatory documentation and ongoing compliance in India and global markets.",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        type: "website",
        siteName: "Estabizz Fintech",
        title: "Estabizz Fintech | Regulatory Advisory, Licensing & Compliance",
        description: "Expert RBI, SEBI, IRDAI, IFSCA and FEMA licensing & compliance advisory for fintech and regulated businesses in India.",
        locale: "en_IN",
    },
    twitter: {
        card: "summary_large_image",
        title: "Estabizz Fintech | Regulatory Advisory, Licensing & Compliance",
        description: "Expert RBI, SEBI, IRDAI, IFSCA and FEMA licensing & compliance advisory for fintech and regulated businesses in India.",
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Live navbar + footer content from the CMS (falls back to defaults).
    const [navbarContent, footerContent] = (await Promise.all([
        getContent("global.navbar"),
        getContent("global.footer"),
    ])) as [Partial<NavbarContent>, Partial<FooterContent>];
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="/tailwind.css" />
                {/* Google Analytics — placed in <head> so it appears in server-rendered HTML, required for GTM tag detection */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-HHLKJM5Q87" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-HHLKJM5Q87');
                        `,
                    }}
                />
            </head>
            <body className="antialiased selection:bg-[#1677f2] selection:text-white relative bg-transparent">
                <LiveBackground />
                <ReadingProgress />
                <div className="relative z-10 w-full min-h-screen bg-transparent">
                    <Navbar content={navbarContent} />
                    {children}
                    <Footer content={footerContent} />
                </div>
                <ScrollToTop />
                <ChatWidget />
            </body>
        </html>
    );
}
