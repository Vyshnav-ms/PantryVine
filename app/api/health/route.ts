import { NextResponse } from "next/server";
import { checkCognodbConnection } from "@/lib/cognodb";

export async function GET() {
  const status = await checkCognodbConnection();
  return NextResponse.json({
    status: status.isConnected ? "healthy" : "fallback",
    dbStatus: status,
    timestamp: new Date().toISOString(),
  });
}
