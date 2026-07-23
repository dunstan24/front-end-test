import React from "react";
import defaultFooterData from "@/data/footer.json";
import { Twitter, Youtube, Github } from "lucide-react";
import type { FooterData } from "@/lib/data";

interface FooterProps {
  data?: FooterData;
}

export default function Footer({ data = defaultFooterData }: FooterProps) {
  const footerData = data;

  return (
    <footer className="border-t border-white/10 bg-surface-dark pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
        {/* Brand Info (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-accent-purple via-accent-indigo to-accent-cyan p-[1px]">
              <div className="w-full h-full bg-surface-dark rounded-[7px] flex items-center justify-center font-bold text-xs text-white">
                BS
              </div>
            </div>
            <span className="font-bold text-white text-base tracking-tight">
              {footerData.brand.name}
            </span>
          </div>

          <p className="text-xs text-brand-muted max-w-sm leading-relaxed">
            {footerData.brand.tagline}
          </p>

          <div className="flex items-center gap-2 pt-2">
            <a
              href={footerData.socials[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href={footerData.socials[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted hover:text-white hover:bg-white/10 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a
              href={footerData.socials[2].url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted hover:text-white hover:bg-white/10 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Link Columns (3 Columns) */}
        {footerData.columns.map((col, idx) => (
          <div key={idx} className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {col.title}
            </h4>
            <ul className="space-y-2 text-xs">
              {col.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <a
                    href={link.href}
                    className="text-brand-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-subtle">
        <div>{footerData.copyright}</div>
        <div className="flex items-center gap-1">
          <span>{footerData.credit}</span>
        </div>
      </div>
    </footer>
  );
}
