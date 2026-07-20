import Reveal from "./Reveal";

const INSTAGRAM_URL = "https://www.instagram.com/chrispyphotos___/";

export default function Outro() {
  return (
    <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-32 text-center sm:py-44">
      <span className="font-serif text-4xl italic text-white sm:text-5xl">
        That&apos;s the collection &mdash; for now.
      </span>
      <p className="max-w-md text-neutral-400">
        More frames are always being developed. Follow along, or reach out if
        something here speaks to you.
      </p>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 rounded-full border border-white/30 px-8 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-black"
      >
        @chrispyphotos___
      </a>
    </Reveal>
  );
}
