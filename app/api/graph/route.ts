import { NextResponse } from "next/server";
import { getGraphTopology } from "@/lib/cypher";

export async function GET() {
  try {
    const topology = await getGraphTopology();
    return NextResponse.json(topology);
  } catch (error) {
    console.error("Error exporting graph topology:", error);
    return NextResponse.json(
      { error: "Failed to generate graph visualization data" },
      { status: 500 }
    );
  }
}
