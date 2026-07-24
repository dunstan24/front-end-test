import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * Self-hosted Inter font via next/font — eliminates the external Google Fonts
 * network request, prevents FOUT, and enables automatic font subsetting.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Premium Framer Website Templates for Business | Browser.supply",
  description:
    "Professional Framer website templates starting at $129. Trusted by 2,000+ customers. Launch your business site in hours with step by step video tutorials. No coding required.",
  openGraph: {
    title: "Premium Framer Website Templates for Business | Browser.supply",
    description:
      "Professional Framer website templates starting at $129. Trusted by 2,000+ customers.",
    type: "website",
    url: "https://browser.supply/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* DNS preconnect for external resources — saves 100-300ms per domain */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://vjs.zencdn.net" />
        <link rel="dns-prefetch" href="https://vjs.zencdn.net" />
        <link rel="preconnect" href="https://interactive-examples.mdn.mozilla.net" />
        <link rel="dns-prefetch" href="https://interactive-examples.mdn.mozilla.net" />
      </head>
      <body>{children}</body>
    </html>
  );
}
