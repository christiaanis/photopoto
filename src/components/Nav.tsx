import Link from "next/link";
import Logo from "./Logo";

const INSTAGRAM_URL = "https://www.instagram.com/chrispyphotos___/";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-white">
          <Logo />
        </Link>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm uppercase tracking-[0.15em] text-neutral-400 transition hover:text-white"
        >
          Instagram
        </a>
      </div>
    </header>
  );
}
