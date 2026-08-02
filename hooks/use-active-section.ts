"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const sectionKey = sectionIds.join("|");

  useEffect(() => {
    const ids = sectionKey.split("|").filter(Boolean);
    if (ids.length === 0) return;

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.35;
      let current = ids[0];

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= marker) {
          current = id;
        }
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionKey]);

  return activeId;
}
