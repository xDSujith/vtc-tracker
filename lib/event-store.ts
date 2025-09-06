// Event sourcing system for VTC Tracker
export interface DomainEvent {
  id: string
  aggregateId: string
  aggregateType: string
  eventType: string
  eventData: Record<string, any>
  metadata: {
    userId?: string
    timestamp: Date
    version: number
    correlationId?: string
    causationId?: string
  }
}

export interface EventStream {
  aggregateId: string
  events: DomainEvent[]
  version: number
}

export class EventStore {
  private events: DomainEvent[] = []
  private snapshots: Map<string, any> = new Map()

  async appendEvents(
    aggregateId: string,
    expectedVersion: number,
    events: Omit<DomainEvent, "id" | "metadata">[],
  ): Promise<void> {
    const currentVersion = await this.getAggregateVersion(aggregateId)

    if (currentVersion !== expectedVersion) {
      throw new Error(`Concurrency conflict: expected version ${expectedVersion}, got ${currentVersion}`)
    }

    const domainEvents: DomainEvent[] = events.map((event, index) => ({
      ...event,
      id: crypto.randomUUID(),
      metadata: {
        timestamp: new Date(),
        version: expectedVersion + index + 1,
        correlationId: crypto.randomUUID(),
      },
    }))

    this.events.push(...domainEvents)

    for (const event of domainEvents) {
      await this.publishEvent(event)
    }
  }

  async getEventStream(aggregateId: string, fromVersion = 0): Promise<EventStream> {
    const aggregateEvents = this.events
      .filter((e) => e.aggregateId === aggregateId && e.metadata.version > fromVersion)
      .sort((a, b) => a.metadata.version - b.metadata.version)

    return {
      aggregateId,
      events: aggregateEvents,
      version: aggregateEvents.length > 0 ? aggregateEvents[aggregateEvents.length - 1].metadata.version : 0,
    }
  }

  async getAggregateVersion(aggregateId: string): Promise<number> {
    const events = this.events.filter((e) => e.aggregateId === aggregateId)
    return events.length > 0 ? Math.max(...events.map((e) => e.metadata.version)) : 0
  }

  private async publishEvent(event: DomainEvent): Promise<void> {
    console.log(`[EventStore] Published event: ${event.eventType} for ${event.aggregateType}:${event.aggregateId}`)

    // Trigger projections and read model updates
    await this.updateProjections(event)
  }

  private async updateProjections(event: DomainEvent): Promise<void> {
    switch (event.eventType) {
      case "JobCreated":
        await this.updateJobProjection(event)
        break
      case "DriverLocationUpdated":
        await this.updateDriverLocationProjection(event)
        break
      case "TelemetryReceived":
        await this.updateTelemetryProjection(event)
        break
    }
  }

  private async updateJobProjection(event: DomainEvent): Promise<void> {
    // Update job read model
    console.log(`[Projection] Updating job projection for ${event.aggregateId}`)
  }

  private async updateDriverLocationProjection(event: DomainEvent): Promise<void> {
    // Update driver location read model
    console.log(`[Projection] Updating driver location for ${event.aggregateId}`)
  }

  private async updateTelemetryProjection(event: DomainEvent): Promise<void> {
    // Update telemetry analytics
    console.log(`[Projection] Processing telemetry data for ${event.aggregateId}`)
  }
}

export const eventStore = new EventStore()
