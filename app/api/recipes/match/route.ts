import { NextResponse } from "next/server";
import { findRecipesByIngredients } from "@/lib/cypher";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ingredients: string[] = body.ingredients || [];

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        { error: "Please provide an array of ingredients" },
        { status: 400 }
      );
    }

    const { recipes, source } = await findRecipesByIngredients(ingredients);

    return NextResponse.json({
      recipes,
      count: recipes.length,
      source,
      searchedIngredients: ingredients,
    });
  } catch (error: any) {
    console.error("Error matching recipes:", error);
    return NextResponse.json(
      { error: "Failed to query recipe database. Please try again later." },
      { status: 500 }
    );
  }
}
