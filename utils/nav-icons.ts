import {
  Briefcase,
  Code2,
  FolderKanban,
  Home,
  Mail,
  User,
  type LucideIcon,
} from "lucide-react";

const navIconMap: Record<string, LucideIcon> = {
  Home: Home,
  About: User,
  Experience: Briefcase,
  Skills: Code2,
  Projects: FolderKanban,
  Contact: Mail,
};

export function getNavIcon(label: string): LucideIcon {
  return navIconMap[label] ?? Home;
}
