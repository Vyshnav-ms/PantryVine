"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Layers, ArrowRight } from "lucide-react";
import { RecipeCard } from "@/components/RecipeCard";

export default function IngredientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIngredient() {
      setLoading(true);
      try {
        const res = await fetch(`/api/ingredients/${id}`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Ingredient not found");
        setData(result);
      } catch (err: any) {
        setError(err.message || "Failed to load ingredient details");
      } finally {
        setLoading(false);
      }
    }
    fetchIngredient();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-10 h-10 rounded-full bg-[#F3EEE6] border-2 border-[#2B533F] border-t-transparent animate-spin mx-auto" />
        <p className="text-sm font-medium text-[#635E59]">
          Loading ingredient pairings and substitutions...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="p-8 bg-white rounded-3xl border border-[#E8E0D2] shadow-card text-[#1A1816]">
          <h3 className="font-serif font-bold text-2xl">Ingredient Not Found</h3>
          <p className="text-xs text-[#635E59] mt-1">{error}</p>
        </div>
        <Link
          href="/ingredients"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2B533F] text-white rounded-full font-semibold text-xs hover:bg-[#203E2F] shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Directory
        </Link>
      </div>
    );
  }

  const { ingredient, recipes, cuisines, substitutions, pairings } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Link */}
      <Link
        href="/ingredients"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635E59] hover:text-[#2B533F] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Ingredients
      </Link>

      {/* INGREDIENT HEADER */}
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-[#E8E0D2] shadow-card space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2B533F]">
          {ingredient.category}
        </span>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1A1816]">
          {ingredient.name}
        </h1>
        <p className="text-base text-[#635E59] max-w-2xl font-serif italic">
          Fresh, versatile, and essential to authentic flavor profiles across global cuisines.
        </p>
      </div>

      {/* SUBSTITUTIONS & PAIRINGS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Substitutions */}
        <div className="lg:col-span-7 bg-white p-8 rounded-[2rem] border border-[#E8E0D2] shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D2]">
            <h3 className="font-serif font-bold text-2xl text-[#1A1816] flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#C85A32]" />
              Smart Substitutions
            </h3>
          </div>

          {substitutions.length > 0 ? (
            <div className="space-y-4">
              {substitutions.map((sub: any) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <Link
                      href={`/ingredients/${sub.id}`}
                      className="font-serif font-bold text-lg text-[#1A1816] hover:text-[#2B533F] transition-colors flex items-center gap-1.5"
                    >
                      {sub.name}
                      <ArrowRight className="w-4 h-4 text-[#A29D97]" />
                    </Link>
                    <p className="text-xs text-[#635E59]">
                      {sub.note} (Ratio: <strong>{sub.ratio}</strong>)
                    </p>
                  </div>

                  <span className="px-3 py-1 bg-white border border-[#E8E0D2] text-[#1A1816] text-xs font-semibold rounded-full shrink-0">
                    Used in {sub.usageCount} Recipes
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#635E59] italic py-4">
              No direct substitutions needed for this staple ingredient.
            </p>
          )}
        </div>

        {/* Associated Cuisines & Flavor Pairings */}
        <div className="lg:col-span-5 space-y-6">
          {/* Cuisines */}
          <div className="bg-white p-6 rounded-[2rem] border border-[#E8E0D2] shadow-card space-y-4">
            <h4 className="font-serif font-bold text-xl text-[#1A1816] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2B533F]" />
              Associated Cuisines ({cuisines.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {cuisines.map((c: string) => (
                <span
                  key={c}
                  className="px-3.5 py-1 bg-[#F2F6F3] text-[#2B533F] text-xs font-semibold rounded-full border border-[#C2D8CB]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Pairings */}
          {pairings.length > 0 && (
            <div className="bg-white p-6 rounded-[2rem] border border-[#E8E0D2] shadow-card space-y-4">
              <h4 className="font-serif font-bold text-xl text-[#1A1816]">
                Culinary Flavor Pairings
              </h4>
              <div className="flex flex-wrap gap-2">
                {pairings.map((p: any) => (
                  <Link
                    key={p.id}
                    href={`/ingredients/${p.id}`}
                    className="px-3.5 py-1.5 bg-[#F3EEE6] text-[#1A1816] hover:bg-[#E9E2D7] text-xs font-medium rounded-full transition-colors"
                  >
                    + {p.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RECIPES USING THIS INGREDIENT */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-3xl text-[#1A1816]">
            Recipes Using {ingredient.name} ({recipes.length})
          </h3>
        </div>

        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((rec: any) => (
              <RecipeCard key={rec.id} recipe={rec} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#635E59] italic">
            No recipes currently found for this ingredient.
          </p>
        )}
      </section>
    </div>
  );
}
