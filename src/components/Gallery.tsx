"use client";

import { useMemo, useState } from "react";
import { categories, photos as allPhotos, type Category } from "@/lib/photos";
import PhotoFrame from "./PhotoFrame";
import Lightbox from "./Lightbox";

export default function Gallery() {
  const [active, setActive] = useState<Category | "All">("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? allPhotos : allPhotos.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-1.5 text-sm tracking-wide transition ${
              active === c
                ? "border-white bg-white text-black"
                : "border-neutral-700 text-neutral-300 hover:border-neutral-400 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {filtered.map((photo, i) => (
          <div key={photo.slug} className="break-inside-avoid">
            <PhotoFrame photo={photo} onClick={() => setOpenIndex(i)} priority={i < 3} />
          </div>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={filtered}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
