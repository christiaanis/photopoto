import Link from "next/link";

const INSTAGRAM_URL = "https://www.instagram.com/chrispyphotos___/";

export default function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" aria-label="Chrispy Photos" className="text-white">
          <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="13" cy="13" r="3.4" fill="currentColor" fillOpacity="0.9" />
          </svg>
        </Link>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm uppercase tracking-[0.15em] text-neutral-300 transition hover:text-white"
        >
          Instagram
        </a>
      </div>
    </header>
  );
}
