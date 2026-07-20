"use client";

import { useState } from "react";
import type { Photo } from "@/lib/photos";
import Logo from "./Logo";

export default function Hero({ photo }: { photo: Photo }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative flex h-[100svh] w-full items-end overflow-hidden bg-neutral-950">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/images/portfolio/${photo.slug}.jpg`}
          alt={photo.alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full animate-[kenburns_22s_ease-in-out_infinite_alternate] object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-6 pb-20 text-center">
        <Logo className="text-white [&_svg]:h-10 [&_svg]:w-10 [&_span]:text-3xl sm:[&_svg]:h-12 sm:[&_svg]:w-12 sm:[&_span]:text-4xl" />
        <p className="max-w-md font-serif text-lg italic text-neutral-300 sm:text-xl">
          A visual diary — portraits, streets, and places worth remembering.
        </p>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/50">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 4v14M6 13l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
