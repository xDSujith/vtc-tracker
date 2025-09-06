import { type NextRequest, NextResponse } from "next/server"
import { discordBot } from "@/lib/discord-bot"

export async function POST(request: NextRequest) {
  try {
    const { authorization } = await request.json()

    // Simple auth check - in production use proper authentication
    if (authorization !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const commands = await discordBot.registerCommands()

    return NextResponse.json({
      message: "Commands registered successfully",
      commands,
    })
  } catch (error) {
    console.error("Failed to register Discord commands:", error)
    return NextResponse.json({ error: "Failed to register commands" }, { status: 500 })
  }
}
