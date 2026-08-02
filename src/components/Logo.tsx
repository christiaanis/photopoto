function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <text
        x="24"
        y="41"
        textAnchor="middle"
        fontFamily="var(--font-serif), Georgia, serif"
        fontStyle="italic"
        fontSize="30"
        fill="currentColor"
      >
        C
      </text>
      <text
        x="41"
        y="41"
        textAnchor="middle"
        fontFamily="var(--font-serif), Georgia, serif"
        fontStyle="italic"
        fontSize="30"
        fill="currentColor"
        opacity="0.65"
      >
        B
      </text>
    </svg>
  );
}

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-4 sm:gap-5 ${className ?? ""}`}>
      <Monogram className="h-11 w-11 shrink-0 text-neutral-100 sm:h-14 sm:w-14" />

      <span className="flex flex-col items-start gap-1.5">
        <span className="font-serif text-2xl italic leading-none tracking-tight text-neutral-100 sm:text-4xl">
          Christiaan Burger
        </span>
        <span className="flex items-center gap-2.5">
          <span className="h-px w-5 bg-neutral-600" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
            Portfolio
          </span>
        </span>
      </span>
    </span>
  );
}
