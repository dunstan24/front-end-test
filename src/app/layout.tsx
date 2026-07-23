import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Browser Supply — No back-and-forth with AI. Pick, edit, publish.",
  description: "Clone of browser.supply homepage for MindiMedia Technical Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
