export interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId: string
  details: Record<string, any>
  timestamp: Date
  ipAddress: string
  userAgent: string
}

export class AuditLogger {
  private logs: AuditLog[] = []

  async log(entry: Omit<AuditLog, "id" | "timestamp">): Promise<void> {
    const auditEntry: AuditLog = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }

    this.logs.push(auditEntry)

    // In production, would store in database
    console.log("[Audit]", auditEntry)
  }

  async getLogs(filters?: {
    userId?: string
    action?: string
    resource?: string
    startDate?: Date
    endDate?: Date
  }): Promise<AuditLog[]> {
    let filteredLogs = this.logs

    if (filters) {
      if (filters.userId) {
        filteredLogs = filteredLogs.filter((log) => log.userId === filters.userId)
      }
      if (filters.action) {
        filteredLogs = filteredLogs.filter((log) => log.action === filters.action)
      }
      if (filters.resource) {
        filteredLogs = filteredLogs.filter((log) => log.resource === filters.resource)
      }
      if (filters.startDate) {
        filteredLogs = filteredLogs.filter((log) => log.timestamp >= filters.startDate!)
      }
      if (filters.endDate) {
        filteredLogs = filteredLogs.filter((log) => log.timestamp <= filters.endDate!)
      }
    }

    return filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }
}

export const auditLogger = new AuditLogger()
