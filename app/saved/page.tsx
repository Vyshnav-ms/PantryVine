"use client";

import Link from "next/link";
import { Bookmark, ArrowRight, Utensils } from "lucide-react";
import { RecipeCard } from "@/components/RecipeCard";
import { useSavedRecipes } from "@/lib/favorites";

export default function SavedRecipesPage() {
  const { savedRecipes, count } = useSavedRecipes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2F6F3] border border-[#C2D8CB] text-[#2B533F] text-xs font-semibold rounded-full">
          <Bookmark className="w-3.5 h-3.5 text-[#C85A32]" />
          <span>My Kitchen</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A1816]">
          Saved Recipes & Favorites
        </h1>
        <p className="text-sm text-[#635E59] max-w-2xl font-sans">
          Your personal collection of saved recipes, favorite dishes, and quick kitchen bookmarks.
        </p>
      </div>

      {/* Saved Recipe Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D2]">
          <h3 className="font-serif font-bold text-2xl text-[#1A1816]">
            Saved Recipes ({count})
          </h3>
          {count > 0 && (
            <Link
              href="/recipes"
              className="text-xs font-semibold text-[#2B533F] hover:text-[#203E2F] flex items-center gap-1"
            >
              Browse Catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {count > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 border border-[#E8E0D2] shadow-card text-center max-w-md mx-auto space-y-4 my-8">
            <div className="w-16 h-16 rounded-full bg-[#F3EEE6] text-[#2B533F] flex items-center justify-center mx-auto">
              <Bookmark className="w-8 h-8 text-[#C85A32]" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#1A1816]">
              No saved recipes yet
            </h3>
            <p className="text-xs text-[#635E59] leading-relaxed font-sans">
              Click the bookmark icon on any recipe page to save dishes to your kitchen collection for quick access.
            </p>
            <div className="pt-2">
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2B533F] text-white text-xs font-semibold hover:bg-[#203E2F] transition-colors shadow-xs"
              >
                <Utensils className="w-4 h-4" /> Browse Recipes
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
