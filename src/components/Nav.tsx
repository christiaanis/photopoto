import Link from "next/link";
import Logo from "./Logo";

const INSTAGRAM_URL = "https://www.instagram.com/chrispyphotos___/";

export default function Nav() {
  return (
    <header className="border-b border-white/10 bg-[#121210] py-10 sm:py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6">
        <Link href="/" className="transition hover:opacity-70">
          <Logo />
        </Link>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-[0.25em] text-neutral-500 transition hover:text-neutral-200"
        >
          @chrispyphotos___
        </a>
      </div>
    </header>
  );
}
