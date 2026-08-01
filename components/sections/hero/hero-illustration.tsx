"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks";

/**
 * Abstract geometric composition — layers, nodes, and structure.
 * Suggests building digital systems without literal UI chrome or people.
 */
export function HeroIllustration() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto hidden w-full max-w-[380px] shrink-0 lg:block"
      aria-hidden="true"
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative"
      >
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

        <svg
          viewBox="0 0 420 460"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full"
        >
          <defs>
            <linearGradient id="heroOrb" x1="80" y1="60" x2="340" y2="380" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F97316" stopOpacity="0.35" />
              <stop offset="1" stopColor="#F97316" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="heroPlane" x1="120" y1="140" x2="320" y2="300" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F97316" stopOpacity="0.22" />
              <stop offset="1" stopColor="#18181B" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Soft backdrop orb */}
          <circle cx="210" cy="230" r="148" fill="url(#heroOrb)" />
          <circle
            cx="210"
            cy="230"
            r="148"
            stroke="#F97316"
            strokeOpacity="0.15"
            strokeWidth="1"
          />

          {/* Outer ring */}
          <circle
            cx="210"
            cy="230"
            r="176"
            stroke="#3F3F46"
            strokeOpacity="0.7"
            strokeWidth="1"
            strokeDasharray="4 10"
          />

          {/* Connection network — systems thinking */}
          <g stroke="#F97316" strokeOpacity="0.35" strokeWidth="1.2">
            <line x1="96" y1="150" x2="210" y2="230" />
            <line x1="324" y1="150" x2="210" y2="230" />
            <line x1="110" y1="320" x2="210" y2="230" />
            <line x1="310" y1="320" x2="210" y2="230" />
            <line x1="210" y1="78" x2="210" y2="230" />
            <line x1="210" y1="230" x2="210" y2="382" />
          </g>

          {/* Floating architecture planes */}
          <g>
            <rect
              x="128"
              y="168"
              width="164"
              height="104"
              rx="18"
              fill="url(#heroPlane)"
              stroke="#F97316"
              strokeOpacity="0.55"
              strokeWidth="1.5"
              transform="rotate(-8 210 220)"
            />
            <rect
              x="142"
              y="196"
              width="164"
              height="104"
              rx="18"
              fill="#18181B"
              fillOpacity="0.92"
              stroke="#FED7AA"
              strokeOpacity="0.25"
              strokeWidth="1.25"
              transform="rotate(6 224 248)"
            />
            <rect
              x="150"
              y="214"
              width="140"
              height="88"
              rx="16"
              fill="#0F0F0F"
              stroke="#F97316"
              strokeOpacity="0.7"
              strokeWidth="1.5"
            />
          </g>

          {/* Abstract structure marks on center plane */}
          <g stroke="#F97316" strokeLinecap="round">
            <path d="M178 242 H262" strokeOpacity="0.9" strokeWidth="3" />
            <path d="M178 258 H238" strokeOpacity="0.35" strokeWidth="2.5" />
            <path d="M178 272 H250" strokeOpacity="0.25" strokeWidth="2.5" />
          </g>

          {/* Code-language motif — brackets only, no editor */}
          <text
            x="168"
            y="300"
            fill="#FED7AA"
            fillOpacity="0.55"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="22"
            fontWeight="600"
          >
            {"</>"}
          </text>

          {/* Network nodes */}
          <g>
            <circle cx="96" cy="150" r="9" fill="#0F0F0F" stroke="#F97316" strokeWidth="2" />
            <circle cx="96" cy="150" r="3.5" fill="#F97316" />

            <circle cx="324" cy="150" r="9" fill="#0F0F0F" stroke="#FED7AA" strokeWidth="1.5" strokeOpacity="0.7" />
            <circle cx="324" cy="150" r="3" fill="#FED7AA" fillOpacity="0.8" />

            <circle cx="110" cy="320" r="8" fill="#0F0F0F" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.6" />
            <circle cx="110" cy="320" r="3" fill="#F97316" fillOpacity="0.7" />

            <circle cx="310" cy="320" r="8" fill="#0F0F0F" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.6" />
            <circle cx="310" cy="320" r="3" fill="#F97316" fillOpacity="0.7" />

            <circle cx="210" cy="78" r="10" fill="#0F0F0F" stroke="#F97316" strokeWidth="2" />
            <circle cx="210" cy="78" r="4" fill="#F97316" />

            <circle cx="210" cy="382" r="8" fill="#0F0F0F" stroke="#3F3F46" strokeWidth="1.5" />
            <circle cx="210" cy="382" r="3" fill="#F97316" fillOpacity="0.5" />
          </g>

          {/* Accent geometry */}
          <path
            d="M48 240 L72 226 L72 254 Z"
            fill="#F97316"
            fillOpacity="0.45"
          />
          <rect
            x="348"
            y="228"
            width="28"
            height="28"
            rx="7"
            stroke="#F97316"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            transform="rotate(18 362 242)"
          />
          <circle
            cx="360"
            cy="120"
            r="22"
            stroke="#FED7AA"
            strokeOpacity="0.3"
            strokeWidth="1.25"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
