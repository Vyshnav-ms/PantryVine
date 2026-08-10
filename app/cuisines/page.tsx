"use client";

import Link from "next/link";
import { ChefHat, ArrowRight, Utensils } from "lucide-react";
import { CUISINES, RECIPES } from "@/lib/seed-data";

export default function CuisinesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-herb-600">
          Global Culinary Traditions
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-charcoal-900">
          Explore Cuisines
        </h1>
        <p className="text-sm text-charcoal-500 max-w-2xl">
          Discover authentic regional dishes, signature spices, and traditional recipes grouped by global cuisine.
        </p>
      </div>

      {/* Cuisines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CUISINES.map((cuisine) => {
          const cuisineRecipes = RECIPES.filter((r) => r.cuisineId === cuisine.id);

          return (
            <div
              key={cuisine.id}
              className="bg-white rounded-3xl p-8 border border-cream-300 shadow-card flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-terracotta-500">
                    Cuisine
                  </span>
                  <span className="text-xs font-semibold text-charcoal-500 bg-cream-100 px-3 py-1 rounded-full border border-cream-200">
                    {cuisineRecipes.length} Dishes
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-charcoal-900">
                  {cuisine.name}
                </h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  {cuisine.description}
                </p>
              </div>

              {/* Sample Dish Badges */}
              {cuisineRecipes.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-semibold uppercase text-charcoal-400 block">
                    Popular Dishes:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cuisineRecipes.slice(0, 4).map((r) => (
                      <Link
                        key={r.id}
                        href={`/recipes/${r.id}`}
                        className="px-3 py-1 rounded-full bg-cream-50 hover:bg-cream-100 border border-cream-200 text-xs font-medium text-charcoal-800 transition-colors"
                      >
                        {r.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-cream-200">
                <Link
                  href={`/recipes?cuisine=${cuisine.name}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-herb-600 hover:text-herb-700 transition-colors"
                >
                  View All {cuisine.name} Recipes <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
