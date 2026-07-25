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
  title: "Purchase Request — OrderHub",
  description:
    "Internal purchase request system for branch outlets to order operational supplies from Head Office. Select products, manage quantities, choose payment methods, and submit orders.",
  openGraph: {
    title: "Purchase Request — OrderHub",
    description:
      "Internal ordering system for outlet branches to request operational supplies.",
    type: "website",
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
        {/* DNS preconnect for external image resources */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
