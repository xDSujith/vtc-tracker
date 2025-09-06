import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { authService } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const currentUser = await authService.validateSession(token)
    if (!currentUser) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const users = await db.getUsers()
    return NextResponse.json(users)
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
    if (!currentUser || !authService.hasPermission(currentUser, "manage_vtc")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const userData = await request.json()
    const user = await db.createUser(userData)
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
