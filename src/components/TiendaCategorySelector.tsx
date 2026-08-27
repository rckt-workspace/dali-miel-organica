import { motion, AnimatePresence } from "motion/react";

interface CategorySelectorProps {
  active: "pura" | "picante";
  onChange: (category: "pura" | "picante") => void;
}

export function TiendaCategorySelector({ active, onChange }: CategorySelectorProps) {
  return (
    <div className="relative inline-flex gap-4">
      <div className="relative flex gap-4">
        {(
          [
            { key: "pura", label: "Miel Pura", color: "text-verde" },
            { key: "picante", label: "DALI Picante", color: "text-picante-naranja" },
          ] as const
        ).map((cat) => (
          <button
            key={cat.key}
            onClick={() => onChange(cat.key)}
            className={`relative px-1 pb-1 text-[15px] font-semibold transition-colors ${
              active === cat.key ? cat.color : "text-verde/50 hover:text-verde/75"
            }`}
          >
            {cat.label}

            {active === cat.key && (
              <motion.div
                layoutId="category-underline"
                className={`absolute -bottom-1 left-0 right-0 h-1 rounded-full ${
                  cat.key === "pura" ? "bg-verde" : "bg-picante-naranja"
                }`}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
