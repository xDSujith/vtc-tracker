export interface AnalyticsEvent {
  id: string
  userId: string
  vtcId: string
  eventType:
    | "job_start"
    | "job_complete"
    | "driver_login"
    | "speeding"
    | "collision"
    | "fuel_usage"
    | "distance_traveled"
  timestamp: Date
  data: Record<string, any>
  severity: "info" | "warning" | "critical"
}

export interface DriverMetrics {
  driverId: string
  totalDistance: number
  totalJobs: number
  averageSpeed: number
  fuelEfficiency: number
  safetyScore: number
  onTimeDeliveries: number
  violations: number
  lastActive: Date
}

export interface VTCAnalytics {
  vtcId: string
  totalRevenue: number
  activeDrivers: number
  completedJobs: number
  averageJobTime: number
  fleetUtilization: number
  safetyRating: number
  growthRate: number
  period: "daily" | "weekly" | "monthly"
}

export class AnalyticsEngine {
  private events: AnalyticsEvent[] = []

  async trackEvent(event: Omit<AnalyticsEvent, "id" | "timestamp">): Promise<void> {
    const analyticsEvent: AnalyticsEvent = {
      ...event,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }

    this.events.push(analyticsEvent)

    // Process real-time alerts
    await this.processRealTimeAlerts(analyticsEvent)

    // Store in database (mock implementation)
    console.log("[Analytics] Event tracked:", analyticsEvent)
  }

  async getDriverMetrics(driverId: string): Promise<DriverMetrics> {
    const driverEvents = this.events.filter((e) => e.userId === driverId)

    return {
      driverId,
      totalDistance: this.calculateTotalDistance(driverEvents),
      totalJobs: driverEvents.filter((e) => e.eventType === "job_complete").length,
      averageSpeed: this.calculateAverageSpeed(driverEvents),
      fuelEfficiency: this.calculateFuelEfficiency(driverEvents),
      safetyScore: this.calculateSafetyScore(driverEvents),
      onTimeDeliveries: this.calculateOnTimeDeliveries(driverEvents),
      violations: driverEvents.filter((e) => e.severity === "critical").length,
      lastActive: new Date(),
    }
  }

  async getVTCAnalytics(vtcId: string, period: "daily" | "weekly" | "monthly"): Promise<VTCAnalytics> {
    const vtcEvents = this.events.filter((e) => e.vtcId === vtcId)

    return {
      vtcId,
      totalRevenue: this.calculateRevenue(vtcEvents),
      activeDrivers: this.getUniqueDrivers(vtcEvents).length,
      completedJobs: vtcEvents.filter((e) => e.eventType === "job_complete").length,
      averageJobTime: this.calculateAverageJobTime(vtcEvents),
      fleetUtilization: this.calculateFleetUtilization(vtcEvents),
      safetyRating: this.calculateVTCSafetyRating(vtcEvents),
      growthRate: this.calculateGrowthRate(vtcEvents, period),
      period,
    }
  }

  private async processRealTimeAlerts(event: AnalyticsEvent): Promise<void> {
    if (event.severity === "critical") {
      // Send alert to VTC managers
      console.log("[Alert] Critical event detected:", event)
    }
  }

  private calculateTotalDistance(events: AnalyticsEvent[]): number {
    return events
      .filter((e) => e.eventType === "distance_traveled")
      .reduce((total, e) => total + (e.data.distance || 0), 0)
  }

  private calculateAverageSpeed(events: AnalyticsEvent[]): number {
    const speedEvents = events.filter((e) => e.data.speed)
    return speedEvents.length > 0 ? speedEvents.reduce((sum, e) => sum + e.data.speed, 0) / speedEvents.length : 0
  }

  private calculateFuelEfficiency(events: AnalyticsEvent[]): number {
    const fuelEvents = events.filter((e) => e.eventType === "fuel_usage")
    const distanceEvents = events.filter((e) => e.eventType === "distance_traveled")

    const totalFuel = fuelEvents.reduce((sum, e) => sum + (e.data.fuel || 0), 0)
    const totalDistance = distanceEvents.reduce((sum, e) => sum + (e.data.distance || 0), 0)

    return totalFuel > 0 ? totalDistance / totalFuel : 0
  }

  private calculateSafetyScore(events: AnalyticsEvent[]): number {
    const violations = events.filter((e) => e.severity === "critical").length
    const totalEvents = events.length

    return totalEvents > 0 ? Math.max(0, 100 - (violations / totalEvents) * 100) : 100
  }

  private calculateOnTimeDeliveries(events: AnalyticsEvent[]): number {
    return events.filter((e) => e.eventType === "job_complete" && e.data.onTime === true).length
  }

  private calculateRevenue(events: AnalyticsEvent[]): number {
    return events.filter((e) => e.eventType === "job_complete").reduce((total, e) => total + (e.data.revenue || 0), 0)
  }

  private getUniqueDrivers(events: AnalyticsEvent[]): string[] {
    return [...new Set(events.map((e) => e.userId))]
  }

  private calculateAverageJobTime(events: AnalyticsEvent[]): number {
    const jobTimes = events.filter((e) => e.eventType === "job_complete").map((e) => e.data.duration || 0)

    return jobTimes.length > 0 ? jobTimes.reduce((sum, time) => sum + time, 0) / jobTimes.length : 0
  }

  private calculateFleetUtilization(events: AnalyticsEvent[]): number {
    // Mock calculation - in real implementation would track truck usage
    return Math.random() * 100
  }

  private calculateVTCSafetyRating(events: AnalyticsEvent[]): number {
    const violations = events.filter((e) => e.severity === "critical").length
    const totalJobs = events.filter((e) => e.eventType === "job_complete").length

    return totalJobs > 0 ? Math.max(0, 100 - (violations / totalJobs) * 10) : 100
  }

  private calculateGrowthRate(events: AnalyticsEvent[], period: string): number {
    // Mock calculation - in real implementation would compare periods
    return Math.random() * 20 - 10 // -10% to +10%
  }
}

export const analyticsEngine = new AnalyticsEngine()
