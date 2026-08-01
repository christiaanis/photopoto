"use client";

import { useState } from "react";
import { photos } from "@/lib/photos";
import ArtPhoto from "./ArtPhoto";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";

export default function EditorialGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-[1600px] px-1 py-1 sm:px-2 sm:py-2">
      <div className="columns-1 gap-1 sm:columns-2 sm:gap-2 lg:columns-3 [&>*]:mb-1 sm:[&>*]:mb-2">
        {photos.map((photo, i) => (
          <Reveal key={photo.slug} delay={(i % 8) * 40} className="break-inside-avoid">
            <ArtPhoto photo={photo} priority={i < 4} onClick={() => setOpenIndex(i)} />
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
