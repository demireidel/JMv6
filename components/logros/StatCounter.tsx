"use client";
import { useEffect, useRef, useState } from "react";
import type { LogroStat } from "@/lib/types";

interface StatCounterProps {
  stat: LogroStat;
}

export function StatCounter({ stat }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 60;
          const increment = stat.value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= stat.value) {
              setCount(stat.value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current * 10) / 10);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <div ref={ref} className="text-center p-6 bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl">
      <p className="font-sans text-5xl font-black text-gold">
        {count % 1 === 0 ? count.toFixed(0) : count.toFixed(1)}{stat.unit}
      </p>
      <p className="font-display text-lg text-text mt-2">{stat.label}</p>
      <p className="font-sans text-sm text-muted mt-1">{stat.description}</p>
    </div>
  );
}
