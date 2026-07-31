export default function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 ${className ?? ""}`}>
      <span className="font-serif text-[2.1rem] italic leading-none tracking-tight text-neutral-900 sm:text-5xl">
        Chris Burger
      </span>
      <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 sm:text-sm">
        Photographer
      </span>
    </span>
  );
}
