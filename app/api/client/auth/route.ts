import { type NextRequest, NextResponse } from "next/server"
import { authService } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { driverId, clientVersion } = await request.json()
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "No auth token provided" }, { status: 401 })
    }

    const user = await authService.validateSession(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid auth token" }, { status: 401 })
    }

    // Verify driver belongs to user
    const driver = await db.getDriverById(driverId)
    if (!driver || driver.userId !== user.id) {
      return NextResponse.json({ error: "Driver not found or unauthorized" }, { status: 403 })
    }

    // Log client connection
    console.log(`Windows client connected: ${user.username} (${clientVersion})`)

    return NextResponse.json({
      success: true,
      driver: {
        id: driver.id,
        employeeId: driver.employeeId,
        vtcId: driver.vtcId,
      },
      config: {
        telemetryInterval: 1000, // 1 second
        antiCheatEnabled: true,
        overlayEnabled: true,
      },
    })
  } catch (error) {
    console.error("Client auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
