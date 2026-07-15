import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import ChatBot from "@/components/ChatBot";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "myracl. | Tirunelveli's No.1 Digital Marketing Agency",
  description: "myracl. is Tirunelveli's No.1 digital marketing agency and best local SEO company. We provide strategy, high-ROAS ads, web making, and growth loops.",
  keywords: "digital marketing agency in tirunelveli, best seo company in tirunelveli, tirunelveli digital marketing, social media marketing tirunelveli, web development tirunelveli, local seo tirunelveli, marketing company in tirunelveli, myracl",
  authors: [{ name: "myracl." }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  alternates: {
    canonical: "https://myracl.in/",
  },
  openGraph: {
    type: "website",
    title: "myracl. | Tirunelveli's No.1 Digital Marketing Agency",
    description: "myracl. is Tirunelveli's No.1 digital marketing agency and best local SEO company. We provide brand strategy, performance ads, and web making.",
    url: "https://myracl.in/",
    siteName: "myracl.",
    images: [
      {
        url: "https://myracl.in/google-profile.svg",
        width: 512,
        height: 512,
        alt: "myracl. Digital Marketing Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "myracl. | Tirunelveli's No.1 Digital Marketing Agency",
    description: "myracl. is Tirunelveli's No.1 digital marketing agency and best local SEO company. We provide brand strategy, performance ads, and web making.",
    images: ["https://myracl.in/google-profile.svg"],
  },
  verification: {
    google: "kLpL2WHdl97d0zYub2M0O5JCKYLEpwZ91KKNQDatG9o",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "@id": "https://myracl.in/#agency",
    "name": "myracl.",
    "url": "https://myracl.in/",
    "logo": "https://myracl.in/google-profile.svg",
    "image": "https://myracl.in/google-profile.svg",
    "description": "myracl. is Tirunelveli's No.1 digital marketing agency and best local SEO company, specializing in brand strategy, performance ads, video production, web development, and social media growth.",
    "telephone": "+91-XXXXXXXXXX",
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "City",
        "name": "Tirunelveli",
        "sameAs": "https://en.wikipedia.org/wiki/Tirunelveli"
      },
      {
        "@type": "State",
        "name": "Tamil Nadu",
        "sameAs": "https://en.wikipedia.org/wiki/Tamil_Nadu"
      },
      {
        "@type": "Country",
        "name": "India",
        "sameAs": "https://en.wikipedia.org/wiki/India"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tirunelveli Town",
      "addressLocality": "Tirunelveli",
      "addressRegion": "Tamil Nadu",
      "postalCode": "627006",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 8.7139,
      "longitude": 77.7567
    },
    "sameAs": [
      "https://github.com/harish2007328"
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Favicon + Preconnect important origins and preload LCP image to reduce LCP */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://app.cal.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.simpleicons.org" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/xurya.png" fetchPriority="high" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <SmoothScroll />
        {children}
        <ChatBot />
        <CookieConsent />
      </body>
    </html>
  );
}
