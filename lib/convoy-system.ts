// Advanced convoy management system
export interface ConvoyRoute {
  id: string
  name: string
  startLocation: { city: string; country: string; coordinates: { lat: number; lng: number } }
  endLocation: { city: string; country: string; coordinates: { lat: number; lng: number } }
  waypoints: Array<{ city: string; country: string; coordinates: { lat: number; lng: number } }>
  distance: number
  estimatedDuration: number
  difficulty: "easy" | "medium" | "hard" | "extreme"
  scenicRating: number
}

export interface ConvoyEvent {
  id: string
  vtcId: string
  title: string
  description: string
  route: ConvoyRoute
  scheduledStart: Date
  maxParticipants: number
  participants: ConvoyParticipant[]
  status: "planned" | "recruiting" | "active" | "completed" | "cancelled"
  createdBy: string
  createdAt: Date
  requirements: {
    minLevel: number
    requiredTrucks?: string[]
    dlcRequired?: string[]
  }
}

export interface ConvoyParticipant {
  driverId: string
  username: string
  truckInfo: {
    brand: string
    model: string
    licensePlate: string
  }
  position: number
  status: "registered" | "ready" | "driving" | "finished" | "dropped"
  joinedAt: Date
}

export class ConvoySystem {
  private convoys: ConvoyEvent[] = []
  private routes: ConvoyRoute[] = []

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.routes.push({
      id: "route-001",
      name: "European Express",
      startLocation: { city: "Berlin", country: "Germany", coordinates: { lat: 52.52, lng: 13.405 } },
      endLocation: { city: "Paris", country: "France", coordinates: { lat: 48.8566, lng: 2.3522 } },
      waypoints: [
        { city: "Cologne", country: "Germany", coordinates: { lat: 51.9607, lng: 6.9378 } },
        { city: "Brussels", country: "Belgium", coordinates: { lat: 50.8503, lng: 4.3517 } },
      ],
      distance: 1050,
      estimatedDuration: 12,
      difficulty: "medium",
      scenicRating: 4.2,
    })
  }

  async createConvoy(
    convoyData: Omit<ConvoyEvent, "id" | "createdAt" | "participants" | "status">,
  ): Promise<ConvoyEvent> {
    const convoy: ConvoyEvent = {
      ...convoyData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      participants: [],
      status: "planned",
    }

    this.convoys.push(convoy)
    return convoy
  }

  async joinConvoy(
    convoyId: string,
    participant: Omit<ConvoyParticipant, "joinedAt" | "status" | "position">,
  ): Promise<boolean> {
    const convoy = this.convoys.find((c) => c.id === convoyId)
    if (!convoy) return false

    if (convoy.participants.length >= convoy.maxParticipants) {
      return false // Convoy full
    }

    const newParticipant: ConvoyParticipant = {
      ...participant,
      position: convoy.participants.length + 1,
      status: "registered",
      joinedAt: new Date(),
    }

    convoy.participants.push(newParticipant)
    return true
  }

  async startConvoy(convoyId: string): Promise<boolean> {
    const convoy = this.convoys.find((c) => c.id === convoyId)
    if (!convoy || convoy.status !== "recruiting") return false

    convoy.status = "active"
    convoy.participants.forEach((p) => (p.status = "ready"))

    console.log(`[Convoy] Started convoy ${convoy.title} with ${convoy.participants.length} participants`)
    return true
  }

  getActiveConvoys(): ConvoyEvent[] {
    return this.convoys.filter((c) => c.status === "active" || c.status === "recruiting")
  }

  getConvoyRoutes(): ConvoyRoute[] {
    return this.routes
  }
}

export const convoySystem = new ConvoySystem()
