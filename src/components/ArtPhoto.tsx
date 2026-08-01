"use client";

import { useState } from "react";
import type { Photo } from "@/lib/photos";

export default function ArtPhoto({
  photo,
  onClick,
  priority,
  className,
}: {
  photo: Photo;
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
      className={`group relative block w-full overflow-hidden bg-neutral-200 ${
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
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-neutral-400">
          {photo.slug}
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
    </button>
  );
}
