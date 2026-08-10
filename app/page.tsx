"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Utensils } from "lucide-react";
import { IngredientSelector } from "@/components/IngredientSelector";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeGridSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { DatabaseErrorBanner } from "@/components/DatabaseErrorBanner";
import { RecipeQueryResult } from "@/lib/cypher";
import { CUISINES, RECIPES } from "@/lib/seed-data";

export default function HomePage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(["Chicken", "Tomato", "Garlic"]);
  const [matchedRecipes, setMatchedRecipes] = useState<RecipeQueryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    handleSearch();
  }, []);

  async function handleSearch() {
    if (selectedIngredients.length === 0) {
      setMatchedRecipes([]);
      return;
    }

    setLoading(true);
    setDbError(null);

    try {
      const res = await fetch("/api/recipes/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: selectedIngredients }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to search recipes");
      }

      setMatchedRecipes(data.recipes || []);
    } catch (err: any) {
      console.warn("Search error:", err);
      setDbError(err.message || "Failed to load recipes");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-20 pb-24">
      {/* SECTION 1 — EDITORIAL HERO COVER */}
      <section className="pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold tracking-widest text-[#2B533F] uppercase">
                PANTRYVINE • RECIPE JOURNAL
              </span>
              <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#1A1816] tracking-tight leading-[1.05]">
                What's in your <span className="italic font-serif font-normal text-[#C85A32]">kitchen?</span>
              </h1>
              <p className="text-base sm:text-lg text-[#635E59] leading-relaxed max-w-xl font-sans">
                Turn the ingredients you already have into something worth cooking. Discover recipes, smart substitutions, and flavor pairings.
              </p>
            </div>

            {/* Editorial Ingredient Input Container */}
            <div className="bg-[#F3EEE6] p-6 sm:p-7 rounded-[2rem] border border-[#E8E0D2] shadow-xs">
              <IngredientSelector
                selectedIngredients={selectedIngredients}
                onSelect={setSelectedIngredients}
                onFindRecipes={handleSearch}
                loading={loading}
              />
            </div>

            {/* Secondary Link */}
            <div className="pt-1 flex items-center gap-3 text-xs text-[#635E59]">
              <span>Prefer to browse?</span>
              <Link
                href="/recipes"
                className="text-[#2B533F] hover:text-[#203E2F] underline font-semibold flex items-center gap-1"
              >
                Explore all {RECIPES.length} recipes <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Layered Photography Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Large Image */}
              <div className="relative h-80 sm:h-96 lg:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#E8E0D2]">
                <img
                  src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80"
                  alt="Delicious Butter Chicken Curry"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Secondary Card */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E0D2] shadow-lg max-w-xs">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80"
                  alt="Fresh Ingredients"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="space-y-0.5">
                  <h4 className="font-serif font-bold text-sm text-[#1A1816]">
                    Smart Substitutions
                  </h4>
                  <p className="text-[11px] text-[#635E59]">
                    Out of butter? Swap ghee or olive oil 1:1.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ERROR NOTICE IF UNREACHABLE */}
      {dbError && (
        <div className="px-4">
          <DatabaseErrorBanner error={dbError} onRetry={handleSearch} />
        </div>
      )}

      {/* SECTION 2 — ASYMMETRICAL RECIPE DISCOVERY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E8E0D2]">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2B533F]">
              Pantry Match Results
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A1816]">
              Cook something from what you have
            </h2>
          </div>
          {matchedRecipes.length > 0 && (
            <span className="text-xs font-mono text-[#635E59]">
              {matchedRecipes.length} Matching Recipes Available
            </span>
          )}
        </div>

        {/* Asymmetrical Layout */}
        {loading ? (
          <RecipeGridSkeleton count={6} />
        ) : matchedRecipes.length > 0 ? (
          <div className="space-y-8">
            {/* Row 1: Featured Hero Card */}
            <div className="h-auto">
              <RecipeCard recipe={matchedRecipes[0]} variant="featured" />
            </div>

            {/* Row 2: Standard Cards Grid */}
            {matchedRecipes.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedRecipes.slice(1).map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <EmptyState
            onReset={() => {
              setSelectedIngredients(["Chicken", "Tomato", "Garlic"]);
              handleSearch();
            }}
          />
        )}
      </section>

      {/* SECTION 3 — EDITORIAL CUISINES SPOTLIGHT */}
      <section className="bg-[#F3EEE6]/70 py-20 border-y border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2B533F]">
              Global Culinary Traditions
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A1816]">
              Explore Cuisines
            </h2>
            <p className="text-sm text-[#635E59]">
              Journey through culinary heritage and regional flavor palettes
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CUISINES.map((cuisine) => (
              <Link
                key={cuisine.id}
                href={`/recipes?cuisine=${cuisine.name}`}
                className="group p-6 rounded-3xl bg-white border border-[#E8E0D2] shadow-card hover:shadow-card-hover hover:border-[#2B533F] transition-all duration-300 flex flex-col justify-between h-40"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#C85A32] block mb-1">
                    Cuisine
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#1A1816] group-hover:text-[#2B533F] transition-colors">
                    {cuisine.name}
                  </h3>
                </div>
                <div className="flex items-center justify-between text-xs text-[#635E59] font-semibold group-hover:text-[#2B533F]">
                  <span>View Dishes</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — CULINARY INTELLIGENCE CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A1816] text-white rounded-[2.5rem] p-8 sm:p-14 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C85A32] block">
              Culinary Intelligence
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white leading-tight">
              Your ingredients have more possibilities than you think.
            </h2>
            <p className="text-sm sm:text-base text-[#DCD3C5] leading-relaxed font-sans">
              KitchenGraph maps the hidden culinary connections between ingredients, regional traditions, and flavor pairings. If you are missing an ingredient, smart substitution logic recommends authentic alternatives so you can start cooking immediately.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/ingredients"
                className="px-6 py-3 rounded-full bg-[#2B533F] hover:bg-[#203E2F] text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Explore Smart Substitutions
              </Link>
              <Link
                href="/recipes"
                className="px-6 py-3 rounded-full bg-[#36322F] hover:bg-[#494440] text-[#EAE8E6] text-xs font-semibold transition-colors"
              >
                Browse All Recipes
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#23201D] p-6 rounded-2xl border border-[#36322F] space-y-4">
            <h4 className="font-serif font-bold text-lg text-white">
              Example Substitutions
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-[#1A1816] rounded-xl border border-[#36322F] flex justify-between items-center">
                <div>
                  <strong className="text-white font-serif">Butter</strong>
                  <span className="text-[#A29D97] block text-[11px]">Clarified butter option</span>
                </div>
                <span className="text-[#C85A32] font-bold font-mono">↓ Ghee</span>
              </div>
              <div className="p-3.5 bg-[#1A1816] rounded-xl border border-[#36322F] flex justify-between items-center">
                <div>
                  <strong className="text-white font-serif">Heavy Cream</strong>
                  <span className="text-[#A29D97] block text-[11px]">Dairy-free alternative</span>
                </div>
                <span className="text-[#2B533F] font-bold font-mono text-[#4ADE80]">↓ Coconut Milk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — POPULAR RECIPES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D2]">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2B533F]">
              Curated Dishes
            </span>
            <h2 className="font-serif font-bold text-3xl text-[#1A1816] mt-1">
              Popular Recipes
            </h2>
          </div>
          <Link
            href="/recipes"
            className="text-xs font-semibold text-[#2B533F] hover:text-[#203E2F] flex items-center gap-1"
          >
            View Catalog ({RECIPES.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECIPES.slice(0, 6).map((rec) => (
            <RecipeCard
              key={rec.id}
              recipe={{
                id: rec.id,
                name: rec.name,
                description: rec.description,
                prepTime: rec.prepTime,
                cookTime: rec.cookTime,
                servings: rec.servings,
                difficulty: rec.difficulty,
                image: rec.image,
                instructions: rec.instructions,
                cuisine: CUISINES.find((c) => c.id === rec.cuisineId)?.name || "Global",
                diets: [],
                category: "Main Course",
                ingredients: [],
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
