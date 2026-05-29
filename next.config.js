/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ["127.0.0.1"],
    images: {
        unoptimized: true,
    },
    // Aggressive cache busting for HTML so visitors always get the latest deploy.
    // Static assets (JS/CSS) keep long cache via Next.js's hashed asset URLs.
    async headers() {
        return [
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
        ];
    },
};

module.exports = nextConfig;
