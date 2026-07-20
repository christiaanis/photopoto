"use client";

import { useState } from "react";
import type { Photo } from "@/lib/photos";

type FrameStyle = "mat" | "gallery" | "framed" | "minimal";

// Deterministic (not random) so server/client render match and the
// layout stays stable across reloads -- but varied enough that the
// grid doesn't feel like a stamped-out template.
const STYLE_CYCLE: FrameStyle[] = [
  "mat",
  "mat",
  "gallery",
  "mat",
  "framed",
  "mat",
  "minimal",
  "mat",
  "gallery",
  "mat",
  "mat",
  "framed",
];

function hashSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function getStyle(slug: string): FrameStyle {
  return STYLE_CYCLE[hashSlug(slug) % STYLE_CYCLE.length];
}

const errorFallback = (slug: string) => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black px-6 text-center">
    <svg className="h-8 w-8 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <circle cx="12" cy="13" r="3.5" />
      <path d="M8 6l1.5-2h5L16 6" />
    </svg>
    <span className="text-xs text-neutral-600">{slug}.jpg</span>
  </div>
);

export default function PhotoFrame({
  photo,
  onClick,
  priority,
}: {
  photo: Photo;
  onClick?: () => void;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const src = `/images/portfolio/${photo.slug}.jpg`;
  const style = getStyle(photo.slug);

  const image = !failed ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={photo.alt}
      loading={priority ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
    />
  ) : (
    errorFallback(photo.slug)
  );

  const frame = (
    <div
      className="relative w-full overflow-hidden bg-neutral-900"
      style={{ aspectRatio: photo.ratio }}
    >
      {image}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
    </div>
  );

  const cursor = onClick ? "cursor-zoom-in" : "cursor-default";

  if (style === "framed") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={photo.alt}
        className={`group block w-full bg-neutral-950 p-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.55)] ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1 ${cursor}`}
      >
        <div className="bg-white p-4 sm:p-5">{frame}</div>
      </button>
    );
  }

  if (style === "gallery") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={photo.alt}
        className={`group block w-full bg-white px-5 pb-10 pt-5 shadow-[0_6px_36px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1 sm:px-7 sm:pb-14 sm:pt-7 ${cursor}`}
      >
        {frame}
        <p className="mt-4 text-center text-[10px] uppercase tracking-[0.25em] text-neutral-400">
          {photo.alt}
        </p>
      </button>
    );
  }

  if (style === "minimal") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={photo.alt}
        className={`group block w-full shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1 ${cursor}`}
      >
        {frame}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={photo.alt}
      className={`group block w-full bg-white p-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1 sm:p-3 ${cursor}`}
    >
      {frame}
    </button>
  );
}
