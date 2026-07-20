"use client";

import { useEffect, useCallback, useState } from "react";
import type { Photo } from "@/lib/photos";

export default function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const [failedSlug, setFailedSlug] = useState<string | null>(null);
  const photo = photos[index];
  const failed = failedSlug === photo.slug;

  const next = useCallback(
    () => onNavigate((index + 1) % photos.length),
    [index, photos.length, onNavigate]
  );
  const prev = useCallback(
    () => onNavigate((index - 1 + photos.length) % photos.length),
    [index, photos.length, onNavigate]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, next, prev]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 text-3xl leading-none text-neutral-300 hover:text-white"
      >
        &times;
      </button>

      <button
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-6 text-3xl text-neutral-400 hover:text-white sm:left-6"
      >
        &#8249;
      </button>

      <div
        className="mx-auto flex max-h-[85vh] max-w-[90vw] flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={photo.slug}
            src={`/images/portfolio/${photo.slug}.jpg`}
            alt={photo.alt}
            onError={() => setFailedSlug(photo.slug)}
            className="max-h-[75vh] max-w-[90vw] object-contain"
          />
        ) : (
          <div className="flex h-[60vh] w-[70vw] max-w-xl items-center justify-center bg-neutral-900 text-neutral-600">
            {photo.slug}.jpg
          </div>
        )}
        <p className="text-center text-sm text-neutral-400">{photo.alt}</p>
      </div>

      <button
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-6 text-3xl text-neutral-400 hover:text-white sm:right-6"
      >
        &#8250;
      </button>
    </div>
  );
}
