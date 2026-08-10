import { NextResponse } from "next/server";
import { INGREDIENTS } from "@/lib/seed-data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.toLowerCase() || "";

  let results = INGREDIENTS.map((i) => ({
    id: i.id,
    name: i.name,
    category: i.category,
    substitutionsCount: i.substitutions?.length || 0,
  }));

  if (query) {
    results = results.filter(
      (i) =>
        i.name.toLowerCase().includes(query) ||
        i.category.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    ingredients: results,
    total: results.length,
  });
}
