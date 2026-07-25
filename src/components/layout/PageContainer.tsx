/**
 * PageContainer — Consistent max-width wrapper with responsive padding.
 * Matches the existing 1200px max-width design system.
 */

import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`max-w-[1200px] mx-auto px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
