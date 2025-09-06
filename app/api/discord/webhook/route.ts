import { type NextRequest, NextResponse } from "next/server"
import { discordNotifications } from "@/lib/discord-notifications"

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json()

    // Handle different notification types
    switch (type) {
      case "job_created":
        await discordNotifications.notifyJobCreated(data.job, data.creator)
        break

      case "job_assigned":
        await discordNotifications.notifyJobAssigned(data.job, data.driver, data.assignedBy)
        break

      case "job_completed":
        await discordNotifications.notifyJobCompleted(data.job, data.driver, data.rating)
        break

      case "driver_online":
        await discordNotifications.notifyDriverOnline(data.driver)
        break

      case "driver_offline":
        await discordNotifications.notifyDriverOffline(data.driver)
        break

      case "new_member":
        await discordNotifications.notifyNewMember(data.user)
        break

      case "system_alert":
        await discordNotifications.notifySystemAlert(data.title, data.message, data.severity)
        break

      default:
        return NextResponse.json({ error: "Unknown notification type" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Discord webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
