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
  if (size === "md") {
    return (
      <ul className="flex flex-col gap-4">
        {badges.map((b) => {
          const Icon = icons[b.icon];
          return (
            <li key={b.label} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: accent, backgroundColor: `${accent}33` }}
              >
                <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] font-medium leading-snug text-verde">{b.label}</span>
                {b.description && (
                  <span className="text-[13px] leading-snug text-verde/70">{b.description}</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-3 gap-3">
      {badges.map((b) => {
        const Icon = icons[b.icon];
        return (
          <li key={b.label} className="flex flex-col items-center gap-2 text-center">
            <span
              className="flex size-9 items-center justify-center rounded-full border"
              style={{ borderColor: accent, backgroundColor: `${accent}33` }}
            >
              <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-[10px] leading-tight text-verde/80">{b.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
