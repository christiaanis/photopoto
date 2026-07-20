"use client";

import { useState } from "react";
import type { Photo } from "@/lib/photos";

const aspectClass: Record<Photo["aspect"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
};

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

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full overflow-hidden bg-neutral-900 ${aspectClass[photo.aspect]} ${
        onClick ? "cursor-zoom-in" : "cursor-default"
      }`}
      aria-label={photo.alt}
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black px-6 text-center">
          <svg
            className="h-8 w-8 text-neutral-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <rect x="3" y="6" width="18" height="14" rx="2" />
            <circle cx="12" cy="13" r="3.5" />
            <path d="M8 6l1.5-2h5L16 6" />
          </svg>
          <span className="text-xs text-neutral-600">{photo.slug}.jpg</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
    </button>
  );
}
