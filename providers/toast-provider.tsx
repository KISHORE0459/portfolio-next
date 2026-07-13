"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      theme="dark"
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
