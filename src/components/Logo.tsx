export default function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1" />
        <circle cx="13" cy="13" r="4.25" stroke="currentColor" strokeWidth="1" />
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const x1 = 13 + Math.cos(angle) * 5;
          const y1 = 13 + Math.sin(angle) * 5;
          const x2 = 13 + Math.cos(angle) * 11.5;
          const y2 = 13 + Math.sin(angle) * 11.5;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.75"
            />
          );
        })}
      </svg>
      <span className="font-serif text-xl leading-none tracking-[0.15em]">
        CHRISPY <span className="opacity-60">PHOTOS</span>
      </span>
    </span>
  );
}
