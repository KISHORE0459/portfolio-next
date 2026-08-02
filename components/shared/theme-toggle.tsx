"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-lg backdrop-blur-xl transition-colors hover:border-primary hover:text-primary",
        className,
      )}
      aria-label={
        !mounted
          ? "Toggle theme"
          : isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
      }
    >
      {!mounted ? (
        <span className="h-4 w-4 rounded-full bg-muted" aria-hidden="true" />
      ) : isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
