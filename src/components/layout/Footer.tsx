import React from "react";
import defaultFooterData from "@/data/footer.json";
import { Globe, Twitter, Youtube } from "lucide-react";
import type { FooterData } from "@/lib/data";

interface FooterProps {
  data?: FooterData;
}

/**
 * Footer Component
 * Replicates Section 10 of browser.supply:
 * Logo, tagline, Products & Resources links, social icons, and copyright.
 */
export default function Footer({ data = defaultFooterData }: FooterProps) {
  const footerData = data;

  return (
    <footer className="bg-black py-12 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Brand Area */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-white" />
              <span className="font-bold text-white tracking-tight text-base">
                {footerData.brand.name}
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              {footerData.brand.tagline}
            </p>
          </div>

          {/* Right Links Columns */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8">
            {footerData.columns.map((col, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        className="text-xs text-zinc-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>{footerData.copyright}</p>

          <div className="flex items-center gap-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
