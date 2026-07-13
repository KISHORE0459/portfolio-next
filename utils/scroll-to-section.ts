export function scrollToSection(href: string): boolean {
  if (!href.startsWith("#")) return false;

  const id = href.slice(1);
  const element = document.getElementById(id);

  if (!element) return false;

  element.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", href);
  return true;
}
