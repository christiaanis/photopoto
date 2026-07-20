import Link from "next/link";
import PhotoFrame from "@/components/PhotoFrame";
import { featuredPhotos } from "@/lib/photos";

export default function Home() {
  return (
    <div>
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden border-b border-white/10 px-6 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06),_transparent_60%)]" />
        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-neutral-500">
          Portrait &middot; Street &middot; Nature &middot; Travel
        </p>
        <h1 className="max-w-3xl font-serif text-5xl leading-tight text-white sm:text-6xl md:text-7xl">
          Photography that finds the moment worth keeping.
        </h1>
        <p className="mt-6 max-w-xl text-base text-neutral-400 sm:text-lg">
          I&apos;m Chris &mdash; a photographer capturing people, places, and
          the light in between. Based on real moments, shot on location.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/portfolio"
            className="rounded-full bg-white px-7 py-3 text-sm uppercase tracking-widest text-black transition hover:bg-neutral-200"
          >
            View Portfolio
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-neutral-600 px-7 py-3 text-sm uppercase tracking-widest text-neutral-200 transition hover:border-white hover:text-white"
          >
            Book a Session
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-3xl text-white sm:text-4xl">
            Selected Work
          </h2>
          <Link
            href="/portfolio"
            className="hidden text-sm uppercase tracking-widest text-neutral-400 transition hover:text-white sm:block"
          >
            Full Portfolio &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPhotos.map((photo, i) => (
            <PhotoFrame key={photo.slug} photo={photo} priority={i < 2} />
          ))}
        </div>
        <Link
          href="/portfolio"
          className="mt-8 block text-center text-sm uppercase tracking-widest text-neutral-400 transition hover:text-white sm:hidden"
        >
          Full Portfolio &rarr;
        </Link>
      </section>

      <section className="border-t border-white/10 bg-neutral-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center">
          <h2 className="font-serif text-3xl text-white sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="max-w-lg text-neutral-400">
            Portraits, events, editorial, or travel &mdash; let&apos;s talk about
            what you need and how I can help tell that story.
          </p>
          <Link
            href="/contact"
            className="rounded-full bg-white px-7 py-3 text-sm uppercase tracking-widest text-black transition hover:bg-neutral-200"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
