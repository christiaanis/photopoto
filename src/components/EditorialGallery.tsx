"use client";

import { useMemo, useState } from "react";
import { photos, type Photo } from "@/lib/photos";
import ArtPhoto from "./ArtPhoto";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";

type Block =
  | { type: "full"; items: Photo[] }
  | { type: "duo"; items: Photo[] }
  | { type: "offset"; items: Photo[] }
  | { type: "triptych"; items: Photo[] }
  | { type: "divider"; label: string };

const CYCLE: Array<{ type: "full" | "duo" | "offset" | "triptych"; take: number }> = [
  { type: "full", take: 1 },
  { type: "duo", take: 2 },
  { type: "offset", take: 2 },
  { type: "full", take: 1 },
  { type: "triptych", take: 3 },
  { type: "offset", take: 2 },
  { type: "full", take: 1 },
  { type: "duo", take: 2 },
];

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

function buildBlocks(all: Photo[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;
  let cycleIdx = 0;
  let sinceDivider = 0;
  let numeralIdx = 0;

  while (i < all.length) {
    if (sinceDivider >= 18 && numeralIdx < NUMERALS.length) {
      blocks.push({ type: "divider", label: NUMERALS[numeralIdx++] });
      sinceDivider = 0;
    }
    const step = CYCLE[cycleIdx % CYCLE.length];
    cycleIdx++;
    const take = Math.min(step.take, all.length - i);
    const items = all.slice(i, i + take);
    i += take;
    sinceDivider += take;

    if (take === 1) blocks.push({ type: "full", items });
    else if (take === 2) blocks.push({ type: step.type === "triptych" ? "duo" : step.type, items });
    else blocks.push({ type: "triptych", items });
  }

  return blocks;
}

export default function EditorialGallery() {
  const blocks = useMemo(() => buildBlocks(photos), []);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const total = photos.length;

  return (
    <div className="flex flex-col gap-20 sm:gap-32">
      {blocks.map((block, bi) => {
        if (block.type === "divider") {
          return (
            <Reveal key={`divider-${bi}`} className="flex items-center justify-center py-6">
              <span className="font-serif text-3xl italic text-white/20 sm:text-4xl">
                {block.label}
              </span>
            </Reveal>
          );
        }

        if (block.type === "full") {
          const photo = block.items[0];
          const idx = photos.indexOf(photo);
          return (
            <Reveal key={photo.slug} scale className="w-full">
              <ArtPhoto
                photo={photo}
                index={idx}
                total={total}
                onClick={() => setOpenIndex(idx)}
              />
            </Reveal>
          );
        }

        if (block.type === "duo") {
          return (
            <Reveal key={block.items.map((p) => p.slug).join("-")} className="mx-auto w-full max-w-6xl px-4 sm:px-8">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {block.items.map((photo) => {
                  const idx = photos.indexOf(photo);
                  return (
                    <ArtPhoto
                      key={photo.slug}
                      photo={photo}
                      index={idx}
                      total={total}
                      onClick={() => setOpenIndex(idx)}
                    />
                  );
                })}
              </div>
            </Reveal>
          );
        }

        if (block.type === "offset") {
          const [a, b] = block.items;
          const ia = photos.indexOf(a);
          const ib = b ? photos.indexOf(b) : -1;
          return (
            <Reveal key={block.items.map((p) => p.slug).join("-")} className="mx-auto w-full max-w-6xl px-4 sm:px-8">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-4">
                <div className="sm:col-span-3">
                  <ArtPhoto photo={a} index={ia} total={total} onClick={() => setOpenIndex(ia)} />
                </div>
                {b && (
                  <div className="sm:col-span-2 sm:self-end">
                    <ArtPhoto photo={b} index={ib} total={total} onClick={() => setOpenIndex(ib)} />
                  </div>
                )}
              </div>
            </Reveal>
          );
        }

        // triptych
        return (
          <Reveal key={block.items.map((p) => p.slug).join("-")} className="mx-auto w-full max-w-6xl px-4 sm:px-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {block.items.map((photo) => {
                const idx = photos.indexOf(photo);
                return (
                  <ArtPhoto
                    key={photo.slug}
                    photo={photo}
                    index={idx}
                    total={total}
                    onClick={() => setOpenIndex(idx)}
                  />
                );
              })}
            </div>
          </Reveal>
        );
      })}

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
