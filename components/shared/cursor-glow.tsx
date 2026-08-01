"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks";

const POINTER_SELECTOR = [
  "a",
  "button",
  "summary",
  "label",
  "select",
  "input",
  "textarea",
  '[role="button"]',
  '[type="button"]',
  '[type="submit"]',
  '[type="reset"]',
  ".cursor-pointer",
  "[onclick]",
].join(",");

function isPointerTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;

  if (target.closest(POINTER_SELECTOR)) return true;

  let node: Element | null = target;
  while (node && node !== document.documentElement) {
    const cursor = getComputedStyle(node).cursor;
    if (cursor === "pointer") return true;
    node = node.parentElement;
  }

  return false;
}

export function CursorGlow() {
  const reducedMotion = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const positionRef = useRef({ x: -9999, y: -9999 });
  const targetRef = useRef({ x: -9999, y: -9999 });
  const visibleRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    if (!dot) return;

    const syncVisibility = () => {
      dot.style.opacity = visibleRef.current ? "1" : "0";
      dot.style.visibility = visibleRef.current ? "visible" : "hidden";
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      visibleRef.current = !isPointerTarget(event.target);
      syncVisibility();
    };

    const handlePointerOver = (event: PointerEvent) => {
      visibleRef.current = !isPointerTarget(event.target);
      syncVisibility();
    };

    const handlePointerLeave = () => {
      visibleRef.current = false;
      syncVisibility();
    };

    const animate = () => {
      const { x, y } = positionRef.current;
      const { x: tx, y: ty } = targetRef.current;

      positionRef.current.x = x + (tx - x) * 0.22;
      positionRef.current.y = y + (ty - y) * 0.22;

      dot.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;
      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerover", handlePointerOver, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden max-lg:hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.45]"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 10%, transparent 75%)",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-cursor-dot absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-[var(--cursor-dot)] opacity-0 shadow-[0_0_10px_var(--cursor-dot-glow)] will-change-transform"
      />
    </div>
  );
}
