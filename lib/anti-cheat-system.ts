export interface TelemetryData {
  driverId: string
  jobId: string
  timestamp: Date
  position: { x: number; y: number; z: number }
  speed: number
  fuel: number
  damage: number
  cargo: string
  route: string
}

export interface CheatDetection {
  id: string
  driverId: string
  jobId: string
  cheatType: "speed_hack" | "teleport" | "fuel_hack" | "damage_reset" | "route_deviation" | "impossible_time"
  severity: "low" | "medium" | "high" | "critical"
  evidence: Record<string, any>
  timestamp: Date
  status: "detected" | "investigating" | "confirmed" | "false_positive"
}

export interface DriverRiskProfile {
  driverId: string
  riskScore: number
  violations: CheatDetection[]
  behaviorPatterns: string[]
  lastAssessment: Date
  status: "clean" | "suspicious" | "flagged" | "banned"
}

export class AntiCheatSystem {
  private detections: CheatDetection[] = []
  private riskProfiles: Map<string, DriverRiskProfile> = new Map()

  async analyzeTelemetry(data: TelemetryData): Promise<CheatDetection[]> {
    const detections: CheatDetection[] = []

    // Speed hack detection
    if (data.speed > 150) {
      // Unrealistic speed for trucks
      detections.push(
        this.createDetection(data, "speed_hack", "high", {
          reportedSpeed: data.speed,
          maxAllowedSpeed: 150,
        }),
      )
    }

    // Teleportation detection
    const lastPosition = await this.getLastPosition(data.driverId)
    if (lastPosition && this.calculateDistance(lastPosition, data.position) > 1000) {
      detections.push(
        this.createDetection(data, "teleport", "critical", {
          lastPosition,
          currentPosition: data.position,
          distance: this.calculateDistance(lastPosition, data.position),
        }),
      )
    }

    // Fuel hack detection
    const lastFuel = await this.getLastFuel(data.driverId)
    if (lastFuel && data.fuel > lastFuel + 10) {
      // Fuel increased without refueling
      detections.push(
        this.createDetection(data, "fuel_hack", "medium", {
          lastFuel,
          currentFuel: data.fuel,
          increase: data.fuel - lastFuel,
        }),
      )
    }

    // Damage reset detection
    const lastDamage = await this.getLastDamage(data.driverId)
    if (lastDamage && data.damage < lastDamage - 5) {
      // Damage decreased without repair
      detections.push(
        this.createDetection(data, "damage_reset", "medium", {
          lastDamage,
          currentDamage: data.damage,
          decrease: lastDamage - data.damage,
        }),
      )
    }

    // Route deviation detection
    const expectedRoute = await this.getExpectedRoute(data.jobId)
    if (expectedRoute && this.isOffRoute(data.position, expectedRoute)) {
      detections.push(
        this.createDetection(data, "route_deviation", "low", {
          expectedRoute,
          currentPosition: data.position,
          deviation: this.calculateRouteDeviation(data.position, expectedRoute),
        }),
      )
    }

    // Store detections
    this.detections.push(...detections)

    // Update risk profile
    await this.updateRiskProfile(data.driverId, detections)

    return detections
  }

  async getDriverRiskProfile(driverId: string): Promise<DriverRiskProfile> {
    let profile = this.riskProfiles.get(driverId)

    if (!profile) {
      profile = {
        driverId,
        riskScore: 0,
        violations: [],
        behaviorPatterns: [],
        lastAssessment: new Date(),
        status: "clean",
      }
      this.riskProfiles.set(driverId, profile)
    }

    return profile
  }

  async investigateDetection(detectionId: string, investigatorId: string): Promise<void> {
    const detection = this.detections.find((d) => d.id === detectionId)
    if (detection) {
      detection.status = "investigating"
      console.log(`[Anti-Cheat] Investigation started for detection ${detectionId} by ${investigatorId}`)
    }
  }

  async confirmCheat(detectionId: string, action: "warn" | "suspend" | "ban"): Promise<void> {
    const detection = this.detections.find((d) => d.id === detectionId)
    if (detection) {
      detection.status = "confirmed"
      await this.applyPenalty(detection.driverId, action, detection)
    }
  }

  async markFalsePositive(detectionId: string): Promise<void> {
    const detection = this.detections.find((d) => d.id === detectionId)
    if (detection) {
      detection.status = "false_positive"
      console.log(`[Anti-Cheat] Detection ${detectionId} marked as false positive`)
    }
  }

  private createDetection(
    data: TelemetryData,
    cheatType: CheatDetection["cheatType"],
    severity: CheatDetection["severity"],
    evidence: Record<string, any>,
  ): CheatDetection {
    return {
      id: crypto.randomUUID(),
      driverId: data.driverId,
      jobId: data.jobId,
      cheatType,
      severity,
      evidence,
      timestamp: new Date(),
      status: "detected",
    }
  }

  private async updateRiskProfile(driverId: string, detections: CheatDetection[]): Promise<void> {
    const profile = await this.getDriverRiskProfile(driverId)

    profile.violations.push(...detections)
    profile.riskScore = this.calculateRiskScore(profile.violations)
    profile.lastAssessment = new Date()

    // Update status based on risk score
    if (profile.riskScore > 80) {
      profile.status = "banned"
    } else if (profile.riskScore > 60) {
      profile.status = "flagged"
    } else if (profile.riskScore > 30) {
      profile.status = "suspicious"
    } else {
      profile.status = "clean"
    }

    this.riskProfiles.set(driverId, profile)
  }

  private calculateRiskScore(violations: CheatDetection[]): number {
    const weights = {
      speed_hack: 20,
      teleport: 30,
      fuel_hack: 15,
      damage_reset: 15,
      route_deviation: 5,
      impossible_time: 25,
    }

    return violations.reduce((score, violation) => {
      return score + (weights[violation.cheatType] || 10)
    }, 0)
  }

  private calculateDistance(
    pos1: { x: number; y: number; z: number },
    pos2: { x: number; y: number; z: number },
  ): number {
    return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2) + Math.pow(pos2.z - pos1.z, 2))
  }

  private async getLastPosition(driverId: string): Promise<{ x: number; y: number; z: number } | null> {
    // Mock implementation - would query database
    return { x: 100, y: 200, z: 300 }
  }

  private async getLastFuel(driverId: string): Promise<number | null> {
    // Mock implementation - would query database
    return 80
  }

  private async getLastDamage(driverId: string): Promise<number | null> {
    // Mock implementation - would query database
    return 15
  }

  private async getExpectedRoute(jobId: string): Promise<string | null> {
    // Mock implementation - would query job route
    return "A1-A2-A3"
  }

  private isOffRoute(position: { x: number; y: number; z: number }, expectedRoute: string): boolean {
    // Mock implementation - would check if position is on expected route
    return Math.random() > 0.8 // 20% chance of being off route
  }

  private calculateRouteDeviation(position: { x: number; y: number; z: number }, expectedRoute: string): number {
    // Mock implementation - would calculate actual deviation
    return Math.random() * 1000
  }

  private async applyPenalty(
    driverId: string,
    action: "warn" | "suspend" | "ban",
    detection: CheatDetection,
  ): Promise<void> {
    console.log(`[Anti-Cheat] Applying penalty ${action} to driver ${driverId} for ${detection.cheatType}`)

    // In real implementation, would update database and notify systems
    switch (action) {
      case "warn":
        // Send warning notification
        break
      case "suspend":
        // Suspend driver for period
        break
      case "ban":
        // Permanently ban driver
        break
    }
  }
}

export const antiCheatSystem = new AntiCheatSystem()
