import { NextResponse } from "next/server";
import { getIngredientDetails } from "@/lib/cypher";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await getIngredientDetails(id);

    if (!data.ingredient) {
      return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    return NextResponse.json(
      { error: "Error retrieving ingredient details" },
      { status: 500 }
    );
  }
}
