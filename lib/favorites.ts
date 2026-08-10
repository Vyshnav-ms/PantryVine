"use client";

import { useState, useEffect } from "react";
import { RECIPES, CUISINES, DIETS } from "./seed-data";
import { RecipeQueryResult } from "./cypher";

const FAVORITES_KEY = "pantryvine_saved_recipes";

export function getSavedRecipeIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveRecipeId(id: string): void {
  if (typeof window === "undefined") return;
  const current = getSavedRecipeIds();
  if (!current.includes(id)) {
    const updated = [...current, id];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("favorites-updated"));
  }
}

export function removeRecipeId(id: string): void {
  if (typeof window === "undefined") return;
  const current = getSavedRecipeIds();
  const updated = current.filter((item) => item !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("favorites-updated"));
}

export function isRecipeSaved(id: string): boolean {
  return getSavedRecipeIds().includes(id);
}

export function toggleRecipeSaved(id: string): boolean {
  if (isRecipeSaved(id)) {
    removeRecipeId(id);
    return false;
  } else {
    saveRecipeId(id);
    return true;
  }
}

export function useSavedRecipes() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<RecipeQueryResult[]>([]);

  useEffect(() => {
    function loadSaved() {
      const ids = getSavedRecipeIds();
      setSavedIds(ids);

      const recipes = ids
        .map((id) => {
          const r = RECIPES.find((item) => item.id === id);
          if (!r) return null;
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
        })
        .filter(Boolean) as RecipeQueryResult[];

      setSavedRecipes(recipes);
    }

    loadSaved();

    window.addEventListener("favorites-updated", loadSaved);
    return () => window.removeEventListener("favorites-updated", loadSaved);
  }, []);

  return { savedIds, savedRecipes, count: savedIds.length };
}
