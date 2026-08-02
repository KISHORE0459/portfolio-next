"use client";

import { useEffect } from "react";

interface HashRedirectProps {
  hash: string;
}

export function HashRedirect({ hash }: HashRedirectProps) {
  useEffect(() => {
    window.location.replace(`/#${hash}`);
  }, [hash]);

  return (
    <main className="flex min-h-[40vh] items-center justify-center px-4 text-sm text-muted-foreground">
      Redirecting…
    </main>
  );
}
