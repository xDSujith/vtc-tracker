import { type NextRequest, NextResponse } from "next/server"
import { mlAntiCheatSystem } from "@/lib/ml-anti-cheat"
import { authService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const currentUser = await authService.validateSession(token)
    if (!currentUser || !authService.hasPermission(currentUser, "view_analytics")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const { telemetryData } = await request.json()

    const prediction = await mlAntiCheatSystem.analyzeTelemetryML(telemetryData)

    return NextResponse.json({
      prediction,
      models: mlAntiCheatSystem.getModelInfo(),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("ML analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze telemetry" }, { status: 500 })
  }
}
