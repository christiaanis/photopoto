import Gallery from "@/components/Gallery";

export const metadata = {
  title: "Portfolio | Chrispy Photos",
  description: "Browse the full photography portfolio by category.",
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-14 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neutral-500">
          Portfolio
        </p>
        <h1 className="font-serif text-4xl text-white sm:text-5xl">
          The Full Collection
        </h1>
      </div>
      <Gallery />
    </div>
  );
}
