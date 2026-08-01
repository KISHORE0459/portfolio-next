"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export function ToastProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      theme={resolvedTheme === "light" ? "light" : "dark"}
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "glass border-border/50",
        },
      }}
    />
  );
}
