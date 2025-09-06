import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { TelemetryPacket } from "@/lib/windows-client-api"

export async function POST(request: NextRequest) {
  try {
    const telemetryData: TelemetryPacket = await request.json()

    // Validate telemetry data
    if (!telemetryData.driverId || !telemetryData.timestamp) {
      return NextResponse.json({ error: "Invalid telemetry data" }, { status: 400 })
    }

    // Store telemetry in database (in production, you might use a time-series DB)
    // For now, we'll just log it
    console.log(`Telemetry from ${telemetryData.driverId}:`, {
      location: telemetryData.location.city,
      speed: telemetryData.truck.speed,
      fuel: telemetryData.truck.fuel,
    })

    // Update driver location and status
    const driver = await db.getDriverById(telemetryData.driverId)
    if (driver) {
      // Update driver location and status based on telemetry
      driver.location = telemetryData.location
      driver.status = telemetryData.truck.engineRunning ? "DRIVING" : "RESTING"
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Telemetry processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
