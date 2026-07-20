"use client";

import { useState } from "react";
import { photos } from "@/lib/photos";
import PhotoFrame from "./PhotoFrame";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        {photos.map((photo, i) => (
          <Reveal key={photo.slug} delay={(i % 6) * 60} className="break-inside-avoid">
            <PhotoFrame photo={photo} onClick={() => setOpenIndex(i)} priority={i < 2} />
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
