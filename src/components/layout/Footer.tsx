// Server Component — no hooks or interactivity needed

import { LogoIcon, XIcon, YouTubeIcon } from "@/components/ui/Icons";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-black py-12 px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          <div className="md:col-span-6 space-y-3 flex flex-col items-start text-left">
            <div className="flex items-center gap-2">
              <LogoIcon className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Browser.supply</span>
            </div>
            <p className="text-[13px] text-zinc-500 max-w-xs leading-relaxed">
              High-converting Framer & Webflow templates built for modern startups.
            </p>
          </div>
          <div className="md:col-span-3 space-y-3 flex flex-col items-start text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Products</div>
            <div className="space-y-2">
              {["Templates", "Bundle", "Custom Project"].map((l) => (
                <a key={l} href="#" className="block text-[13px] text-zinc-500 hover:text-white transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-3 space-y-3 flex flex-col items-start text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Resources</div>
            <div className="space-y-2">
              {["Live examples", "Support", "Blog"].map((l) => (
                <a key={l} href="#" className="block text-[13px] text-zinc-500 hover:text-white transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-zinc-600">
          <span>© 2026 Browser Supply. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Follow us on X">
              <XIcon />
            </a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Subscribe on YouTube">
              <YouTubeIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
