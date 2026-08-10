"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Utensils, RefreshCw } from "lucide-react";
import { INGREDIENTS, RECIPES } from "@/lib/seed-data";

export default function IngredientsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const set = new Set(INGREDIENTS.map((i) => i.category));
    return Array.from(set);
  }, []);

  const filteredIngredients = useMemo(() => {
    return INGREDIENTS.filter((ing) => {
      const matchesSearch =
        !searchQuery || ing.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat =
        selectedCategory === "all" || ing.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2B533F]">
          Pantry Encyclopedia
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A1816]">
          Ingredients & Smart Substitutions
        </h1>
        <p className="text-sm text-[#635E59] max-w-2xl">
          Discover ingredient flavor pairings, alternative substitutions, and popular dishes across our culinary library.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white rounded-2xl p-4 border border-[#E8E0D2] shadow-card flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#A29D97]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ingredients by name (e.g. Butter, Tomato, Garlic)..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] rounded-xl border border-[#E8E0D2] focus:border-[#2B533F] focus:outline-none text-sm text-[#1A1816] font-medium"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#E8E0D2] text-xs font-semibold text-[#1A1816] focus:outline-none cursor-pointer w-full md:w-auto"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {(searchQuery || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-3 py-2 text-xs font-semibold text-[#C85A32] hover:text-[#8A381C] flex items-center gap-1 shrink-0"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Ingredients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredIngredients.map((ing) => {
          const recipeCount = RECIPES.filter((r) =>
            r.ingredients.some((i) => i.ingredientId === ing.id)
          ).length;

          const hasSubs = ing.substitutions && ing.substitutions.length > 0;

          return (
            <Link
              key={ing.id}
              href={`/ingredients/${ing.id}`}
              className="p-6 rounded-[1.75rem] bg-white border border-[#E8E0D2] shadow-card hover:shadow-card-hover hover:border-[#2B533F] transition-all duration-200 group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2B533F]">
                  {ing.category}
                </span>
                <h3 className="font-serif font-bold text-lg text-[#1A1816] group-hover:text-[#2B533F] transition-colors">
                  {ing.name}
                </h3>
              </div>

              <div className="pt-2 border-t border-[#E8E0D2] flex items-center justify-between text-xs text-[#635E59]">
                <span className="flex items-center gap-1 font-medium">
                  <Utensils className="w-3.5 h-3.5 text-[#C85A32]" />
                  {recipeCount} Recipes
                </span>
                {hasSubs && (
                  <span className="px-2.5 py-0.5 bg-[#FFFBEB] text-[#B45309] rounded-full font-semibold text-[10px] border border-[#FDE68A]">
                    Substitutes Available
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
