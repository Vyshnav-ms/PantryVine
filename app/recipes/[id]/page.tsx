"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  Clock,
  ChefHat,
  Users,
  Utensils,
  ArrowLeft,
  Bookmark,
  AlertCircle,
} from "lucide-react";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeQueryResult } from "@/lib/cypher";
import { isRecipeSaved, toggleRecipeSaved } from "@/lib/favorites";

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [recipe, setRecipe] = useState<RecipeQueryResult | null>(null);
  const [similarRecipes, setSimilarRecipes] = useState<RecipeQueryResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchRecipeData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/recipes/${id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Recipe not found");
        }
        setRecipe(data.recipe);
        setSimilarRecipes(data.similarRecipes || []);
        setSaved(isRecipeSaved(data.recipe.id));
      } catch (err: any) {
        setError(err.message || "Failed to load recipe details");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipeData();
  }, [id]);

  const handleToggleSave = () => {
    if (!recipe) return;
    const isNowSaved = toggleRecipeSaved(recipe.id);
    setSaved(isNowSaved);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-10 h-10 rounded-full bg-[#F3EEE6] border-2 border-[#2B533F] border-t-transparent animate-spin mx-auto" />
        <p className="text-sm font-medium text-[#635E59]">
          Preparing recipe instructions...
        </p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="p-8 bg-white rounded-3xl border border-[#E8E0D2] shadow-card text-[#1A1816]">
          <AlertCircle className="w-8 h-8 text-[#C85A32] mx-auto mb-2" />
          <h3 className="font-serif font-bold text-2xl">Recipe Not Found</h3>
          <p className="text-xs text-[#635E59] mt-1">
            We couldn't locate this recipe. It may have been moved.
          </p>
        </div>
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2B533F] text-white rounded-full font-semibold text-xs hover:bg-[#203E2F] shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Link */}
      <Link
        href="/recipes"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635E59] hover:text-[#2B533F] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Recipes
      </Link>

      {/* TOP EDITORIAL HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Photo Banner */}
        <div className="lg:col-span-6 relative h-80 sm:h-96 lg:h-[460px] rounded-[2.5rem] overflow-hidden shadow-card border border-[#E8E0D2]">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3.5 py-1 bg-[#FAF7F2]/90 backdrop-blur-md text-[#2B533F] text-xs font-bold font-mono uppercase tracking-wider rounded-full shadow-xs">
              {recipe.cuisine} Cuisine
            </span>
            {recipe.diets.map((d) => (
              <span
                key={d}
                className="px-3 py-1 bg-[#1A1816]/80 backdrop-blur-md text-white text-xs font-medium rounded-full"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Title Details & Metadata */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2B533F]">
              RECIPE JOURNAL • {recipe.category || "MAIN COURSE"}
            </span>
            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1A1816] leading-tight">
              {recipe.name}
            </h1>
            <p className="text-base text-[#635E59] leading-relaxed font-sans">
              {recipe.description}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 p-5 bg-white rounded-3xl border border-[#E8E0D2] shadow-card text-center">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#A29D97] block mb-0.5">
                Total Time
              </span>
              <span className="font-bold text-sm text-[#1A1816] flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#2B533F]" />
                {recipe.prepTime + recipe.cookTime} mins
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#A29D97] block mb-0.5">
                Servings
              </span>
              <span className="font-bold text-sm text-[#1A1816] flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#C85A32]" />
                {recipe.servings} People
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#A29D97] block mb-0.5">
                Difficulty
              </span>
              <span className="font-bold text-sm text-[#1A1816] flex items-center justify-center gap-1">
                <ChefHat className="w-3.5 h-3.5 text-[#E29D38]" />
                {recipe.difficulty}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleToggleSave}
              className={`px-6 py-3 rounded-full text-xs font-semibold shadow-xs flex items-center gap-2 transition-all ${
                saved
                  ? "bg-[#2B533F] text-white hover:bg-[#203E2F]"
                  : "bg-white text-[#1A1816] border border-[#E8E0D2] hover:border-[#2B533F]"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
              {saved ? "Saved in My Kitchen" : "Save Recipe"}
            </button>
          </div>
        </div>
      </div>

      {/* EDITORIAL TWO-COLUMN CONTENT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Numbered Ingredients */}
        <div className="lg:col-span-5 space-y-6 bg-white p-8 rounded-[2rem] border border-[#E8E0D2] shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D2]">
            <h3 className="font-serif font-bold text-2xl text-[#1A1816] flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#2B533F]" />
              Ingredients
            </h3>
            <span className="text-xs font-mono font-semibold text-[#A29D97]">
              {recipe.ingredients.length} Items
            </span>
          </div>

          <ul className="space-y-4">
            {recipe.ingredients.map((ing, idx) => (
              <li
                key={ing.id}
                className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#A29D97]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <Link
                      href={`/ingredients/${ing.id}`}
                      className="font-serif font-bold text-base text-[#1A1816] hover:text-[#2B533F] transition-colors"
                    >
                      {ing.name}
                    </Link>
                  </div>
                  <span className="text-xs font-semibold text-[#635E59] bg-white px-3 py-1 rounded-full border border-[#E8E0D2]">
                    {ing.quantity} {ing.unit}
                  </span>
                </div>

                {/* Inline Substitutions Callout */}
                {ing.substitutions && ing.substitutions.length > 0 && (
                  <div className="pt-1 text-xs text-[#C85A32] bg-[#FDF6F3] rounded-xl px-3 py-1.5 flex items-center justify-between border border-[#F4D4C6]">
                    <span>
                      Missing {ing.name.toLowerCase()}? ↓ Swap <strong>{ing.substitutions[0].name}</strong> 1:1.
                    </span>
                    <Link
                      href={`/ingredients/${ing.substitutions[0].id}`}
                      className="font-bold underline hover:text-[#8A381C] ml-2"
                    >
                      Details
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Cooking Instructions */}
        <div className="lg:col-span-7 space-y-6 bg-white p-8 rounded-[2rem] border border-[#E8E0D2] shadow-card">
          <h3 className="font-serif font-bold text-2xl text-[#1A1816] pb-4 border-b border-[#E8E0D2]">
            Instructions
          </h3>

          <ol className="space-y-6">
            {recipe.instructions.map((step, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#2B533F] text-white font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-sm sm:text-base text-[#1A1816] leading-relaxed font-sans">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* RECOMMENDATIONS — "If you liked this..." */}
      {similarRecipes.length > 0 && (
        <section className="space-y-8 pt-8 border-t border-[#E8E0D2]">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2B533F]">
              Recommendations
            </span>
            <h3 className="font-serif font-bold text-3xl text-[#1A1816]">
              If you liked this...
            </h3>
            <p className="text-xs text-[#635E59]">
              Recipes sharing key ingredients and regional flavor profiles
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarRecipes.map((simRecipe) => (
              <RecipeCard key={simRecipe.id} recipe={simRecipe} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
