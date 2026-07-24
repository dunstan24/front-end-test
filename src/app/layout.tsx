import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
