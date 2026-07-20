const INSTAGRAM_URL = "https://www.instagram.com/chrispyphotos___/";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Chrispy Photos. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm uppercase tracking-[0.15em] text-neutral-400">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            Instagram
          </a>
          <a href="/contact" className="transition hover:text-white">
            Inquire
          </a>
        </div>
      </div>
    </footer>
  );
}
