"use client";

import { useEffect, useState } from "react";

interface UseAnimatedCounterOptions {
  end: number;
  duration?: number;
  enabled?: boolean;
}

export function useAnimatedCounter({
  end,
  duration = 2000,
  enabled = true,
}: UseAnimatedCounterOptions): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCount(end);
      return;
    }

    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration, enabled]);

  return count;
}
