// Database connection and query utilities for VTC Tracker
import type { User, VTC, Driver, Truck, Job, TelemetryData, Event, Fine, Application } from "./types"

// Mock database - in production this would connect to PostgreSQL
class MockDatabase {
  private users: User[] = []
  private vtcs: VTC[] = []
  private drivers: Driver[] = []
  private trucks: Truck[] = []
  private jobs: Job[] = []
  private telemetryData: TelemetryData[] = []
  private events: Event[] = []
  private fines: Fine[] = []
  private applications: Application[] = []

  constructor() {
    this.seedData()
  }

  private seedData() {
    // Sample VTC
    const sampleVTC: VTC = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "European Express Logistics",
      tag: "EEL",
      description: "Premier European trucking company specializing in long-haul deliveries across the continent.",
      ownerId: "550e8400-e29b-41d4-a716-446655440001",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date(),
      isActive: true,
      settings: {
        requireApplication: true,
        autoAcceptApplications: false,
        allowPublicJobs: true,
        economyEnabled: true,
        antiCheatEnabled: true,
      },
      stats: {
        totalMembers: 25,
        totalJobs: 1250,
        totalDistance: 125000,
        totalRevenue: 2500000,
        averageRating: 4.7,
      },
    }

    // Sample users
    const sampleUsers: User[] = [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        discordId: "123456789012345678",
        username: "TruckMaster2024",
        email: "owner@eel-logistics.com",
        role: "OWNER" as any,
        vtcId: sampleVTC.id,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
        isActive: true,
        lastSeen: new Date(),
        preferences: {
          theme: "dark",
          notifications: true,
          language: "en",
          timezone: "UTC",
        },
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        discordId: "234567890123456789",
        username: "DispatcherPro",
        email: "dispatcher@eel-logistics.com",
        role: "DISPATCHER" as any,
        vtcId: sampleVTC.id,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
        isActive: true,
        lastSeen: new Date(),
        preferences: {
          theme: "dark",
          notifications: true,
          language: "en",
          timezone: "UTC",
        },
      },
    ]

    this.vtcs.push(sampleVTC)
    this.users.push(...sampleUsers)
  }

  // User operations
  async getUsers(): Promise<User[]> {
    return this.users
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null
  }

  async getUserByDiscordId(discordId: string): Promise<User | null> {
    return this.users.find((user) => user.discordId === discordId) || null
  }

  async createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const user: User = {
      ...userData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.users.push(user)
    return user
  }

  // VTC operations
  async getVTCs(): Promise<VTC[]> {
    return this.vtcs
  }

  async getVTCById(id: string): Promise<VTC | null> {
    return this.vtcs.find((vtc) => vtc.id === id) || null
  }

  async createVTC(vtcData: Omit<VTC, "id" | "createdAt" | "updatedAt">): Promise<VTC> {
    const vtc: VTC = {
      ...vtcData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.vtcs.push(vtc)
    return vtc
  }

  // Driver operations
  async getDrivers(): Promise<Driver[]> {
    return this.drivers
  }

  async getDriversByVTC(vtcId: string): Promise<Driver[]> {
    return this.drivers.filter((driver) => driver.vtcId === vtcId)
  }

  async getDriverById(id: string): Promise<Driver | null> {
    return this.drivers.find((driver) => driver.id === id) || null
  }

  // Job operations
  async getJobs(): Promise<Job[]> {
    return this.jobs
  }

  async getJobsByVTC(vtcId: string): Promise<Job[]> {
    return this.jobs.filter((job) => job.vtcId === vtcId)
  }

  async getJobById(id: string): Promise<Job | null> {
    return this.jobs.find((job) => job.id === id) || null
  }

  async createJob(jobData: Omit<Job, "id" | "createdAt">): Promise<Job> {
    const job: Job = {
      ...jobData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    this.jobs.push(job)
    return job
  }

  // Truck operations
  async getTrucks(): Promise<Truck[]> {
    return this.trucks
  }

  async getTrucksByVTC(vtcId: string): Promise<Truck[]> {
    return this.trucks.filter((truck) => truck.vtcId === vtcId)
  }
}

export const db = new MockDatabase()
