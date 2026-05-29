/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    // Aggressive cache busting for HTML so visitors always get the latest deploy.
    // Static assets (JS/CSS) keep long cache via Next.js's hashed asset URLs.
    async headers() {
        return [
            // ── Public routes: aggressive revalidation ───────────────────────
            {
                // Match all HTML routes (no file extension)
                source: "/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=0, must-revalidate, s-maxage=60, stale-while-revalidate=300",
                    },
                ],
            },
            // ── Admin panel: never index, never cache ────────────────────────
            {
                source: "/admin/:path*",
                headers: [
                    {
                        // Tells crawlers (Googlebot etc.) to not index admin pages,
                        // even if they somehow bypass robots.txt disallow.
                        key: "X-Robots-Tag",
                        value: "noindex, nofollow",
                    },
                    {
                        // No caching for admin — always fresh
                        key: "Cache-Control",
                        value: "no-store",
                    },
                ],
            },
            // ── API routes: never index ───────────────────────────────────────
            {
                source: "/api/:path*",
                headers: [
                    {
                        key: "X-Robots-Tag",
                        value: "noindex, nofollow",
                    },
                    {
                        key: "Cache-Control",
                        value: "no-store",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
