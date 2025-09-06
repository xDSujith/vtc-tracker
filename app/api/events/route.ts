import { type NextRequest, NextResponse } from "next/server"
import { eventStore } from "@/lib/event-store"
import { authService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const currentUser = await authService.validateSession(token)
    if (!currentUser) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const { aggregateId, aggregateType, eventType, eventData, expectedVersion } = await request.json()

    await eventStore.appendEvents(aggregateId, expectedVersion || 0, [
      {
        aggregateId,
        aggregateType,
        eventType,
        eventData: {
          ...eventData,
          userId: currentUser.id,
          vtcId: currentUser.vtcId,
        },
      },
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Event storage error:", error)
    return NextResponse.json({ error: "Failed to store event" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const aggregateId = searchParams.get("aggregateId")
    const fromVersion = Number.parseInt(searchParams.get("fromVersion") || "0")

    if (!aggregateId) {
      return NextResponse.json({ error: "aggregateId required" }, { status: 400 })
    }

    const eventStream = await eventStore.getEventStream(aggregateId, fromVersion)
    return NextResponse.json(eventStream)
  } catch (error) {
    console.error("Event retrieval error:", error)
    return NextResponse.json({ error: "Failed to retrieve events" }, { status: 500 })
  }
}
