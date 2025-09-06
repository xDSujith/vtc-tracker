import { type NextRequest, NextResponse } from "next/server"
import { antiCheatSystem } from "@/lib/anti-cheat-system"

export async function POST(request: NextRequest) {
  try {
    const telemetryData = await request.json()

    const detections = await antiCheatSystem.analyzeTelemetry(telemetryData)

    return NextResponse.json({
      detections,
      riskLevel: detections.length > 0 ? "high" : "low",
    })
  } catch (error) {
    console.error("Anti-cheat analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze telemetry" }, { status: 500 })
  }
}
