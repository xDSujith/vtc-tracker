import { type NextRequest, NextResponse } from "next/server"
import { discordBot } from "@/lib/discord-bot"

// Verify Discord interaction signature
function verifyDiscordSignature(signature: string, timestamp: string, body: string, publicKey: string): boolean {
  // In production, implement proper signature verification
  // This is a simplified version for demo purposes
  return true
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-signature-ed25519")
    const timestamp = request.headers.get("x-signature-timestamp")
    const body = await request.text()

    if (!signature || !timestamp) {
      return NextResponse.json({ error: "Missing signature headers" }, { status: 401 })
    }

    // Verify the request is from Discord
    const publicKey = process.env.DISCORD_PUBLIC_KEY || "mock-key"
    if (!verifyDiscordSignature(signature, timestamp, body, publicKey)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const interaction = JSON.parse(body)

    // Handle ping from Discord
    if (interaction.type === 1) {
      return NextResponse.json({ type: 1 })
    }

    // Handle slash commands
    if (interaction.type === 2) {
      const response = await discordBot.handleCommand(interaction)
      return NextResponse.json(response)
    }

    return NextResponse.json({ error: "Unknown interaction type" }, { status: 400 })
  } catch (error) {
    console.error("Discord interaction error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
