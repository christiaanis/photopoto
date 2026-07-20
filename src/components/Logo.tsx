const BLADES = 6;
const OUTER_R = 11.5;
const INNER_R = 3.4;
const SKEW = 15; // degrees, controls blade width

function toXY(radius: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return [13 + Math.cos(rad) * radius, 13 + Math.sin(rad) * radius];
}

function bladePath(index: number) {
  const step = 360 / BLADES;
  const mid = index * step;
  const [ox1, oy1] = toXY(OUTER_R, mid - SKEW);
  const [ox2, oy2] = toXY(OUTER_R, mid + SKEW);
  const [ix, iy] = toXY(INNER_R, mid);
  return `M ${ix.toFixed(2)} ${iy.toFixed(2)} L ${ox1.toFixed(2)} ${oy1.toFixed(2)} A ${OUTER_R} ${OUTER_R} 0 0 1 ${ox2.toFixed(2)} ${oy2.toFixed(2)} Z`;
}

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true" className="shrink-0">
        {Array.from({ length: BLADES }).map((_, i) => (
          <path
            key={i}
            d={bladePath(i)}
            fill="currentColor"
            fillOpacity="0.9"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeLinejoin="round"
          />
        ))}
        <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="0.75" />
      </svg>
      <span className="flex items-baseline gap-2 font-serif leading-none">
        <span className="text-xl tracking-[0.2em]">CHRISPY</span>
        <span className="h-3 w-px bg-current opacity-40" />
        <span className="text-xl tracking-[0.2em] opacity-60">PHOTOS</span>
      </span>
    </span>
  );
}
