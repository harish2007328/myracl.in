import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import ChatBot from "@/components/ChatBot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "myracl. | Creative Digital Marketing Agency",
  description: "Elevate your brand with myracl. — a creative digital marketing agency delivering strategy, design, and growth that converts.",
  keywords: "digital marketing agency, creative agency, brand strategy, SEO, social media marketing, myracl",
  authors: [{ name: "myracl." }],
  alternates: {
    canonical: "https://myracl.in/",
  },
  openGraph: {
    type: "website",
    title: "myracl. | Creative Digital Marketing Agency",
    description: "Elevate your brand with myracl. — creative digital marketing that converts.",
    url: "https://myracl.in/",
    siteName: "myracl.",
  },
  twitter: {
    card: "summary_large_image",
    title: "myracl. | Creative Digital Marketing Agency",
    description: "Elevate your brand with myracl. — creative digital marketing that converts.",
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
    "name": "myracl.",
    "url": "https://myracl.in/",
    "description": "Creative digital marketing agency helping brands elevate their presence through strategy, design, and growth.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
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
      </body>
    </html>
  );
}
