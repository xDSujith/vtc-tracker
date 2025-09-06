import { type NextRequest, NextResponse } from "next/server"
import { authService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { discordId } = await request.json()

    if (!discordId) {
      return NextResponse.json({ error: "Discord ID required" }, { status: 400 })
    }

    const result = await authService.authenticateWithDiscord(discordId)
    if (!result) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: result.user,
      token: result.token,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
