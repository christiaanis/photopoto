"use client";

import { useState } from "react";
import type { Photo } from "@/lib/photos";

export default function ArtPhoto({
  photo,
  index,
  total,
  onClick,
  priority,
  className,
}: {
  photo: Photo;
  index: number;
  total: number;
  onClick?: () => void;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = `/images/portfolio/${photo.slug}.jpg`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={photo.alt}
      className={`group relative block w-full overflow-hidden bg-neutral-950 ${
        onClick ? "cursor-zoom-in" : "cursor-default"
      } ${className ?? ""}`}
      style={{ aspectRatio: photo.ratio }}
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-900 to-black text-neutral-700">
          {photo.slug}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between px-5 py-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:px-6 sm:py-5">
        <span className="font-serif text-sm italic text-white/90 sm:text-base">{photo.alt}</span>
        <span className="font-mono text-[10px] tracking-widest text-white/50">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </button>
  );
}
