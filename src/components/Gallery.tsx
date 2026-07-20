"use client";

import { useState } from "react";
import { photos } from "@/lib/photos";
import PhotoFrame from "./PhotoFrame";
import Lightbox from "./Lightbox";

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {photos.map((photo, i) => (
          <div key={photo.slug} className="break-inside-avoid">
            <PhotoFrame photo={photo} onClick={() => setOpenIndex(i)} priority={i < 3} />
          </div>
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
