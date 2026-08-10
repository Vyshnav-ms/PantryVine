"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { RecipeQueryResult } from "@/lib/cypher";

interface RecipeCardProps {
  recipe: RecipeQueryResult;
  variant?: "standard" | "featured" | "compact";
}

export function RecipeCard({ recipe, variant = "standard" }: RecipeCardProps) {
  const matchPct = recipe.matchPercentage;
  const isHighMatch = matchPct && matchPct >= 75;

  if (variant === "featured") {
    return (
      <Link href={`/recipes/${recipe.id}`} className="group block h-full">
        <div className="bg-[#FFFFFF] rounded-[2rem] overflow-hidden border border-[#E8E0D2] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col lg:flex-row h-full">
          {/* Featured Photo */}
          <div className="relative h-72 lg:h-full lg:w-7/12 overflow-hidden bg-[#F3EEE6] shrink-0">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3.5 py-1 bg-[#FAF7F2]/90 backdrop-blur-md text-[#2B533F] text-[11px] font-mono font-bold uppercase tracking-wider rounded-full shadow-xs">
                Editor&apos;s Featured Match
              </span>
            </div>
          </div>

          {/* Featured Body */}
          <div className="p-8 lg:p-10 lg:w-5/12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#635E59] uppercase">
                <span>{recipe.cuisine} Cuisine</span>
                {matchPct !== undefined && (
                  <span className="font-bold text-[#C85A32]">
                    {matchPct}% Match
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-2xl lg:text-3xl text-[#1A1816] group-hover:text-[#2B533F] transition-colors leading-snug">
                {recipe.name}
              </h3>

              <p className="text-sm text-[#635E59] leading-relaxed line-clamp-3 font-sans">
                {recipe.description}
              </p>
            </div>

            {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] text-xs text-[#1A1816]">
                <span className="font-semibold text-[#C85A32]">Missing Pantry Items: </span>
                {recipe.missingIngredients.join(", ")}
              </div>
            )}

            <div className="pt-4 border-t border-[#E8E0D2] flex items-center justify-between text-xs text-[#635E59]">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#2B533F]" />
                {recipe.prepTime + recipe.cookTime} mins • {recipe.difficulty}
              </span>
              <span className="font-semibold text-[#2B533F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Recipe <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/recipes/${recipe.id}`} className="group block h-full">
      <div className="bg-[#FFFFFF] rounded-[1.75rem] overflow-hidden border border-[#E8E0D2] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full">
        {/* Photo Header */}
        <div className="relative h-56 w-full overflow-hidden bg-[#F3EEE6]">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Understated Match Callout */}
          {matchPct !== undefined && (
            <div className="absolute top-3 right-3 z-10">
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase shadow-xs ${
                  isHighMatch
                    ? "bg-[#2B533F] text-white"
                    : "bg-[#C85A32] text-white"
                }`}
              >
                {matchPct}% Match
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#635E59] block">
              {recipe.cuisine} • {recipe.prepTime + recipe.cookTime} MIN • {recipe.difficulty}
            </span>
            <h3 className="font-serif font-bold text-xl text-[#1A1816] group-hover:text-[#2B533F] transition-colors line-clamp-1">
              {recipe.name}
            </h3>
            <p className="text-xs text-[#635E59] line-clamp-2 leading-relaxed font-sans">
              {recipe.description}
            </p>
          </div>

          {/* Missing Ingredients Callout */}
          {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
            <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E0D2] text-[11px] text-[#635E59]">
              <span className="font-semibold text-[#C85A32]">Missing: </span>
              {recipe.missingIngredients.slice(0, 2).join(", ")}
              {recipe.missingIngredients.length > 2 ? `, +${recipe.missingIngredients.length - 2} more` : ""}
            </div>
          )}

          {/* Card Footer */}
          <div className="pt-3 border-t border-[#E8E0D2] flex items-center justify-between text-xs text-[#635E59]">
            <span className="font-medium">View Instructions</span>
            <ArrowRight className="w-4 h-4 text-[#635E59] group-hover:text-[#2B533F] group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
}
