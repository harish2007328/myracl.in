import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SEO & Performance
  compress: true,
  productionBrowserSourceMaps: false,
  
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "myracl.in",
      }
    ]
  },

  // Headers for crawlers
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=604800",
          }
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          }
        ],
      }
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/",
        permanent: false,
      }
    ];
  },
};

export default nextConfig;
