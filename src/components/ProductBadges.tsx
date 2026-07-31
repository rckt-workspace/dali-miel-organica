import { Leaf, Sparkles, Activity, HeartPulse, Moon, ShieldCheck, Flame } from "lucide-react";
import type { Badge } from "@/lib/products";

const icons = {
  leaf: Leaf,
  minerals: Sparkles,
  glycemic: Activity,
  pressure: HeartPulse,
  sleep: Moon,
  shield: ShieldCheck,
  flame: Flame,
} as const;

export function ProductBadges({
  badges,
  accent,
  size = "sm",
}: {
  badges: Badge[];
  accent: string;
  size?: "sm" | "md";
}) {
  return (
    <ul className="grid grid-cols-3 gap-3">
      {badges.map((b) => {
        const Icon = icons[b.icon];
        return (
          <li key={b.label} className="flex flex-col items-center gap-2 text-center">
            <span
              className={`flex items-center justify-center rounded-full border ${
                size === "md" ? "size-12" : "size-9"
              }`}
              style={{ borderColor: accent, backgroundColor: `${accent}33` }}
            >
              <Icon
                className={size === "md" ? "size-5" : "size-4"}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
            <span
              className={`leading-tight text-verde/80 ${size === "md" ? "text-[12px]" : "text-[10px]"}`}
            >
              {b.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
