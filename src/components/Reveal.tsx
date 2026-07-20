"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  className,
  delay = 0,
  scale = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1100ms] ease-out ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : `translate-y-10 opacity-0 ${scale ? "scale-[1.04]" : ""}`
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
