import { type NextRequest, NextResponse } from "next/server"
import { analyticsEngine } from "@/lib/analytics-engine"

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json()

    await analyticsEngine.trackEvent(eventData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics event error:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const driverId = searchParams.get("driverId")
    const vtcId = searchParams.get("vtcId")
    const period = searchParams.get("period") as "daily" | "weekly" | "monthly"

    if (driverId) {
      const metrics = await analyticsEngine.getDriverMetrics(driverId)
      return NextResponse.json(metrics)
    }

    if (vtcId && period) {
      const analytics = await analyticsEngine.getVTCAnalytics(vtcId, period)
      return NextResponse.json(analytics)
    }

    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  } catch (error) {
    console.error("Analytics fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
