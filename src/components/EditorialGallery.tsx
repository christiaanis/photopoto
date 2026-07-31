"use client";

import { useState } from "react";
import { photos } from "@/lib/photos";
import ArtPhoto from "./ArtPhoto";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";

export default function EditorialGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-1 py-1 sm:px-2 sm:py-2">
      <div className="columns-2 gap-1 sm:columns-3 sm:gap-2 lg:columns-4 [&>*]:mb-1 sm:[&>*]:mb-2">
        {photos.map((photo, i) => (
          <Reveal key={photo.slug} delay={(i % 8) * 40} className="break-inside-avoid">
            <ArtPhoto
              photo={photo}
              priority={i < 6}
              onClick={() => setOpenIndex(i)}
              className="aspect-square"
            />
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
