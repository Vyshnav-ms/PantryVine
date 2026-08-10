"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, UtensilsCrossed, RotateCcw } from "lucide-react";
import { RecipeCard } from "@/components/RecipeCard";
import { EmptyState } from "@/components/EmptyState";
import { CUISINES, DIETS, RECIPES } from "@/lib/seed-data";

function RecipeCatalogContent() {
  const searchParams = useSearchParams();
  const initialCuisine = searchParams.get("cuisine") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((r) => {
      const cuisineObj = CUISINES.find((c) => c.id === r.cuisineId);
      const cuisineName = cuisineObj?.name || "";

      const matchesSearch =
        !searchQuery ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCuisine =
        selectedCuisine === "all" ||
        cuisineName.toLowerCase() === selectedCuisine.toLowerCase();

      const matchesDifficulty =
        selectedDifficulty === "all" ||
        r.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      return matchesSearch && matchesCuisine && matchesDifficulty;
    }).map((r) => {
      const cuisineObj = CUISINES.find((c) => c.id === r.cuisineId);
      return {
        id: r.id,
        name: r.name,
        description: r.description,
        prepTime: r.prepTime,
        cookTime: r.cookTime,
        servings: r.servings,
        difficulty: r.difficulty,
        image: r.image,
        instructions: r.instructions,
        cuisine: cuisineObj?.name || "Global",
        diets: r.dietIds.map((dId) => DIETS.find((d) => d.id === dId)?.name || "").filter(Boolean),
        category: "Main Course",
        ingredients: [],
      };
    });
  }, [searchQuery, selectedCuisine, selectedDifficulty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-herb-600">
          Recipe Catalog
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-charcoal-900">
          Discover All Recipes
        </h1>
        <p className="text-sm text-charcoal-500 max-w-2xl">
          Browse our complete culinary library across international cuisines, dietary options, and difficulty levels.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-cream-300 shadow-card flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-charcoal-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipe title or description..."
            className="w-full pl-10 pr-4 py-2 bg-cream-50 rounded-xl border border-cream-300 focus:border-herb-500 focus:outline-none text-sm text-charcoal-900 font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 text-xs font-semibold text-charcoal-800 focus:outline-none cursor-pointer"
          >
            <option value="all">All Cuisines</option>
            {CUISINES.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 text-xs font-semibold text-charcoal-800 focus:outline-none cursor-pointer"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          {(searchQuery || selectedCuisine !== "all" || selectedDifficulty !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCuisine("all");
                setSelectedDifficulty("all");
              }}
              className="px-3 py-2 text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No recipes match your filter criteria"
          description="Try clearing your search query or selecting a different cuisine filter."
          onReset={() => {
            setSearchQuery("");
            setSelectedCuisine("all");
            setSelectedDifficulty("all");
          }}
          resetLabel="Reset All Filters"
        />
      )}
    </div>
  );
}

export default function RecipesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-charcoal-500">Loading catalog...</div>}>
      <RecipeCatalogContent />
    </Suspense>
  );
}
