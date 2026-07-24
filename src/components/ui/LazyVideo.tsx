/**
 * LazyVideo — Video element that only loads and plays when scrolled into view.
 *
 * Uses IntersectionObserver to defer video downloading until the element
 * is within 200px of the viewport. This prevents the browser from
 * downloading and decoding ~20 video streams on initial page load.
 *
 * Performance impact: Reduces initial page weight by potentially hundreds
 * of MB of video data that would otherwise be eagerly fetched.
 */
"use client";

import { useRef, useEffect, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
}

export default function LazyVideo({ src, className = "" }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload={isVisible ? "auto" : "none"}
      className={className}
    >
      {isVisible && <source src={src} type="video/mp4" />}
    </video>
  );
}
