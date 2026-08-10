import { NextResponse } from "next/server";
import { getRecipeById, getSimilarRecipes } from "@/lib/cypher";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const recipe = await getRecipeById(id);

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const similar = await getSimilarRecipes(id);

    return NextResponse.json({
      recipe,
      similarRecipes: similar,
    });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Error retrieving recipe details" },
      { status: 500 }
    );
  }
}
