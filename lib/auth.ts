// Authentication utilities for VTC Tracker
import type { User } from "./types"
import { db } from "./db"

export interface AuthSession {
  user: User
  expires: Date
}

// Mock authentication - in production this would integrate with Discord OAuth
export class AuthService {
  private sessions = new Map<string, AuthSession>()

  async authenticateWithDiscord(discordId: string): Promise<{ user: User; token: string } | null> {
    const user = await db.getUserByDiscordId(discordId)
    if (!user) return null

    const token = crypto.randomUUID()
    const session: AuthSession = {
      user,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    }

    this.sessions.set(token, session)
    return { user, token }
  }

  async validateSession(token: string): Promise<User | null> {
    const session = this.sessions.get(token)
    if (!session || session.expires < new Date()) {
      this.sessions.delete(token)
      return null
    }
    return session.user
  }

  async logout(token: string): Promise<void> {
    this.sessions.delete(token)
  }

  hasPermission(user: User, action: string, resource?: any): boolean {
    switch (action) {
      case "manage_vtc":
        return user.role === "OWNER" || user.role === "MANAGER"
      case "dispatch_jobs":
        return user.role === "OWNER" || user.role === "MANAGER" || user.role === "DISPATCHER"
      case "view_analytics":
        return user.role !== "MEMBER"
      default:
        return false
    }
  }
}

export const authService = new AuthService()
