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

    const { searchParams } = new URL(request.url)
    const vtcId = searchParams.get("vtcId")

    const jobs = vtcId ? await db.getJobsByVTC(vtcId) : await db.getJobs()
    return NextResponse.json(jobs)
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
    if (!currentUser || !authService.hasPermission(currentUser, "dispatch_jobs")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const jobData = await request.json()
    const job = await db.createJob({
      ...jobData,
      createdBy: currentUser.id,
    })
    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
