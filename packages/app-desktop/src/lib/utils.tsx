import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { hex } from "color-convert";
import { FileText } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fromUnicode(unicode: string) {
  if (unicode == null) return "";
  const points = unicode.split("-").map((p) => parseInt(p, 16));
  return String.fromCodePoint(...points.filter((p) => !isNaN(p)));
}

export function getNoteIcon(icon?: string, className?: string) {
  if (!icon) return <FileText size={18} className={className} />;
  return fromUnicode(icon);
}

export function getTitlebarState() {
  //TODO: Expose this info from electron API
}

export function setGlobalStyle(property: string, value: string) {
  document.documentElement.style.setProperty(property, value);
}

export function hexToHslVariable(hexstr: string) {
  const sanitized = hexstr.trim().replace("#", "");
  const hsl = hex.hsl(sanitized);
  return `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`;
}
