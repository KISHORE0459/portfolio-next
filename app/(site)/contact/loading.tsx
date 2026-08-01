import { ContactSkeleton } from "@/components/sections/contact";

export default function ContactLoading() {
  return (
    <main id="main-content" aria-label="Loading contact">
      <ContactSkeleton />
    </main>
  );
}
