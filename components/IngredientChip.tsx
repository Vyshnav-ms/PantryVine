"use client";

import { X } from "lucide-react";

interface IngredientChipProps {
  name: string;
  onRemove?: () => void;
  onClick?: () => void;
  selected?: boolean;
  size?: "sm" | "md";
}

export function IngredientChip({
  name,
  onRemove,
  onClick,
  selected = false,
  size = "md",
}: IngredientChipProps) {
  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-1 text-xs"
      : "px-3.5 py-1.5 text-sm font-medium";

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border transition-all duration-150 cursor-pointer ${sizeClasses} ${
        selected
          ? "bg-herb-500 text-white border-herb-600 shadow-xs hover:bg-herb-600"
          : "bg-white text-charcoal-800 border-cream-300 hover:border-herb-500 hover:text-herb-600 hover:bg-cream-50"
      }`}
    >
      <span>{name}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="p-0.5 rounded-full hover:bg-white/20 text-current focus:outline-none"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </span>
  );
}
