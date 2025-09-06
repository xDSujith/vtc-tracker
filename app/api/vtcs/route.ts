import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { authService } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const vtcs = await db.getVTCs()
    return NextResponse.json(vtcs)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

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

    const vtcData = await request.json()
    const vtc = await db.createVTC({
      ...vtcData,
      ownerId: currentUser.id,
    })
    return NextResponse.json(vtc, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
