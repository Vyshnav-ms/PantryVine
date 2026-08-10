"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, Utensils, Sparkles, ChefHat, ArrowRight } from "lucide-react";
import { RECIPES, INGREDIENTS, CUISINES } from "@/lib/seed-data";

interface GlobalSearchModalProps {
  onClose: () => void;
}

export function GlobalSearchModal({ onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const lowerQuery = query.toLowerCase().trim();

  const matchedRecipes = lowerQuery
    ? RECIPES.filter(
        (r) =>
          r.name.toLowerCase().includes(lowerQuery) ||
          r.description.toLowerCase().includes(lowerQuery)
      ).slice(0, 4)
    : [];

  const matchedIngredients = lowerQuery
    ? INGREDIENTS.filter((i) => i.name.toLowerCase().includes(lowerQuery)).slice(0, 4)
    : [];

  const matchedCuisines = lowerQuery
    ? CUISINES.filter((c) => c.name.toLowerCase().includes(lowerQuery)).slice(0, 3)
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="bg-cream-100 rounded-3xl border border-cream-300 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-4 border-b border-cream-300 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-herb-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you craving? Search recipes, ingredients, cuisines..."
            className="w-full bg-transparent text-charcoal-900 placeholder:text-charcoal-500 text-base focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-charcoal-500 hover:bg-cream-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {lowerQuery ? (
            matchedRecipes.length === 0 &&
            matchedIngredients.length === 0 &&
            matchedCuisines.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <p className="text-sm text-charcoal-500">
                  No matches found for &quot;{query}&quot;.
                </p>
                <p className="text-xs text-charcoal-500">
                  Try searching for staples like <strong>Chicken</strong>, <strong>Tomato</strong>, or <strong>Italian</strong>.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Recipes */}
                {matchedRecipes.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase text-herb-600 tracking-wider flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5" /> Recipes
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {matchedRecipes.map((r) => (
                        <Link
                          key={r.id}
                          href={`/recipes/${r.id}`}
                          onClick={onClose}
                          className="p-3 rounded-2xl bg-white border border-cream-200 hover:border-herb-500 flex items-center justify-between group transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={r.image}
                              alt={r.name}
                              className="w-10 h-10 rounded-xl object-cover"
                            />
                            <div>
                              <h4 className="font-serif font-bold text-sm text-charcoal-900 group-hover:text-herb-500">
                                {r.name}
                              </h4>
                              <span className="text-xs text-charcoal-500">
                                {r.prepTime + r.cookTime} mins • {r.difficulty}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ingredients */}
                {matchedIngredients.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase text-terracotta-500 tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Ingredients
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {matchedIngredients.map((ing) => (
                        <Link
                          key={ing.id}
                          href={`/ingredients/${ing.id}`}
                          onClick={onClose}
                          className="px-3 py-1.5 rounded-full bg-white border border-cream-200 hover:border-terracotta-500 text-xs font-semibold text-charcoal-800 transition-colors"
                        >
                          {ing.name} ({ing.category})
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cuisines */}
                {matchedCuisines.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase text-amber-500 tracking-wider flex items-center gap-1.5">
                      <ChefHat className="w-3.5 h-3.5" /> Cuisines
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {matchedCuisines.map((c) => (
                        <Link
                          key={c.id}
                          href={`/recipes?cuisine=${c.name}`}
                          onClick={onClose}
                          className="px-3.5 py-1.5 rounded-full bg-herb-50 text-herb-700 border border-herb-200 text-xs font-semibold"
                        >
                          {c.name} Cuisine
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase text-charcoal-500 tracking-wider">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {["Butter Chicken", "Tomato", "Margherita Pizza", "Paneer", "Pad Thai", "Garlic"].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-white border border-cream-300 text-xs font-medium text-charcoal-800 hover:border-herb-500"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
