// Discord bot utilities and command handlers for VTC Tracker
import type { User } from "./types"
import { db } from "./db"

export interface DiscordCommand {
  name: string
  description: string
  options?: DiscordCommandOption[]
}

export interface DiscordCommandOption {
  name: string
  description: string
  type: number
  required?: boolean
  choices?: { name: string; value: string }[]
}

export interface DiscordInteraction {
  id: string
  type: number
  data: {
    name: string
    options?: { name: string; value: any }[]
  }
  member: {
    user: {
      id: string
      username: string
      discriminator: string
      avatar?: string
    }
  }
  guild_id: string
  channel_id: string
}

export class DiscordBot {
  private botToken: string
  private applicationId: string

  constructor(botToken: string, applicationId: string) {
    this.botToken = botToken
    this.applicationId = applicationId
  }

  // Register slash commands with Discord
  async registerCommands() {
    const commands: DiscordCommand[] = [
      {
        name: "vtc-status",
        description: "Get VTC status and statistics",
      },
      {
        name: "job-list",
        description: "List available or active jobs",
        options: [
          {
            name: "status",
            description: "Filter jobs by status",
            type: 3, // STRING
            required: false,
            choices: [
              { name: "Available", value: "available" },
              { name: "In Progress", value: "in-progress" },
              { name: "Completed", value: "completed" },
            ],
          },
        ],
      },
      {
        name: "driver-info",
        description: "Get driver information and status",
        options: [
          {
            name: "driver",
            description: "Driver username or ID",
            type: 3, // STRING
            required: true,
          },
        ],
      },
      {
        name: "job-assign",
        description: "Assign a job to a driver (Manager+ only)",
        options: [
          {
            name: "job_id",
            description: "Job ID to assign",
            type: 3, // STRING
            required: true,
          },
          {
            name: "driver",
            description: "Driver to assign the job to",
            type: 3, // STRING
            required: true,
          },
        ],
      },
      {
        name: "fleet-status",
        description: "Get fleet overview and truck status",
      },
      {
        name: "apply-vtc",
        description: "Apply to join the VTC",
        options: [
          {
            name: "message",
            description: "Application message",
            type: 3, // STRING
            required: true,
          },
        ],
      },
    ]

    // In production, this would make an actual API call to Discord
    console.log("Registering Discord commands:", commands)
    return commands
  }

  // Handle slash command interactions
  async handleCommand(interaction: DiscordInteraction): Promise<any> {
    const { name, options = [] } = interaction.data
    const userId = interaction.member.user.id
    const user = await db.getUserByDiscordId(userId)

    if (!user && !["vtc-status", "apply-vtc"].includes(name)) {
      return this.createResponse("You need to be registered with a VTC to use this command.")
    }

    switch (name) {
      case "vtc-status":
        return this.handleVTCStatus()

      case "job-list":
        const status = options.find((opt) => opt.name === "status")?.value
        return this.handleJobList(user, status)

      case "driver-info":
        const driverName = options.find((opt) => opt.name === "driver")?.value
        return this.handleDriverInfo(user, driverName)

      case "job-assign":
        const jobId = options.find((opt) => opt.name === "job_id")?.value
        const driverToAssign = options.find((opt) => opt.name === "driver")?.value
        return this.handleJobAssign(user, jobId, driverToAssign)

      case "fleet-status":
        return this.handleFleetStatus(user)

      case "apply-vtc":
        const message = options.find((opt) => opt.name === "message")?.value
        return this.handleVTCApplication(userId, interaction.member.user, message)

      default:
        return this.createResponse("Unknown command.")
    }
  }

  private async handleVTCStatus(): Promise<any> {
    const vtcs = await db.getVTCs()
    const mainVTC = vtcs[0] // Get the first VTC for demo

    if (!mainVTC) {
      return this.createResponse("No VTC found.")
    }

    const embed = {
      title: `${mainVTC.name} (${mainVTC.tag})`,
      description: mainVTC.description,
      color: 0x8b5cf6, // Purple accent color
      fields: [
        {
          name: "Members",
          value: mainVTC.stats.totalMembers.toString(),
          inline: true,
        },
        {
          name: "Total Jobs",
          value: mainVTC.stats.totalJobs.toString(),
          inline: true,
        },
        {
          name: "Total Distance",
          value: `${mainVTC.stats.totalDistance.toLocaleString()} km`,
          inline: true,
        },
        {
          name: "Revenue",
          value: `$${mainVTC.stats.totalRevenue.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Average Rating",
          value: `⭐ ${mainVTC.stats.averageRating}/5.0`,
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
    }

    return this.createResponse("", [embed])
  }

  private async handleJobList(user: User | null, statusFilter?: string): Promise<any> {
    const jobs = user?.vtcId ? await db.getJobsByVTC(user.vtcId) : await db.getJobs()

    let filteredJobs = jobs
    if (statusFilter) {
      filteredJobs = jobs.filter((job) => job.status === statusFilter)
    }

    if (filteredJobs.length === 0) {
      return this.createResponse(`No jobs found${statusFilter ? ` with status "${statusFilter}"` : ""}.`)
    }

    const jobList = filteredJobs
      .slice(0, 10)
      .map((job) => {
        const statusEmoji = this.getStatusEmoji(job.status)
        return (
          `${statusEmoji} **${job.title}**\n` +
          `📍 ${job.route.origin.city} → ${job.route.destination.city}\n` +
          `💰 $${job.payment} | 📦 ${job.cargo.type}\n` +
          `🚛 ${job.assignedTo || "Unassigned"}\n`
        )
      })
      .join("\n")

    const embed = {
      title: `Jobs ${statusFilter ? `(${statusFilter})` : ""}`,
      description: jobList,
      color: 0x3b82f6,
      footer: {
        text: `Showing ${Math.min(filteredJobs.length, 10)} of ${filteredJobs.length} jobs`,
      },
    }

    return this.createResponse("", [embed])
  }

  private async handleDriverInfo(user: User | null, driverName: string): Promise<any> {
    const drivers = user?.vtcId ? await db.getDriversByVTC(user.vtcId) : await db.getDrivers()
    const driver = drivers.find(
      (d) =>
        d.id.toLowerCase().includes(driverName.toLowerCase()) ||
        d.employeeId.toLowerCase().includes(driverName.toLowerCase()),
    )

    if (!driver) {
      return this.createResponse(`Driver "${driverName}" not found.`)
    }

    const statusEmoji = this.getDriverStatusEmoji(driver.status)
    const embed = {
      title: `${statusEmoji} Driver: ${driverName}`,
      color: 0x22c55e,
      fields: [
        {
          name: "Employee ID",
          value: driver.employeeId,
          inline: true,
        },
        {
          name: "Status",
          value: driver.status,
          inline: true,
        },
        {
          name: "Location",
          value: `${driver.location.city}, ${driver.location.country}`,
          inline: true,
        },
        {
          name: "Total Jobs",
          value: driver.stats.totalJobs.toString(),
          inline: true,
        },
        {
          name: "Rating",
          value: `⭐ ${driver.stats.averageRating}/5.0`,
          inline: true,
        },
        {
          name: "On-Time Rate",
          value: `${Math.round((driver.stats.onTimeDeliveries / driver.stats.totalJobs) * 100)}%`,
          inline: true,
        },
      ],
    }

    if (driver.currentJob) {
      embed.fields.push({
        name: "Current Job",
        value: driver.currentJob,
        inline: false,
      })
    }

    return this.createResponse("", [embed])
  }

  private async handleJobAssign(user: User | null, jobId: string, driverName: string): Promise<any> {
    if (!user || !["OWNER", "MANAGER", "DISPATCHER"].includes(user.role)) {
      return this.createResponse("❌ You do not have permission to assign jobs.")
    }

    // In a real implementation, this would update the database
    return this.createResponse(`✅ Job ${jobId} has been assigned to ${driverName}.`)
  }

  private async handleFleetStatus(user: User | null): Promise<any> {
    const trucks = user?.vtcId ? await db.getTrucksByVTC(user.vtcId) : await db.getTrucks()

    const activeCount = trucks.filter((t) => t.isActive).length
    const maintenanceCount = trucks.filter((t) => !t.isActive).length

    const embed = {
      title: "🚛 Fleet Status",
      color: 0xf59e0b,
      fields: [
        {
          name: "Total Trucks",
          value: trucks.length.toString(),
          inline: true,
        },
        {
          name: "Active",
          value: activeCount.toString(),
          inline: true,
        },
        {
          name: "Maintenance",
          value: maintenanceCount.toString(),
          inline: true,
        },
      ],
    }

    if (trucks.length > 0) {
      const truckList = trucks
        .slice(0, 5)
        .map(
          (truck) =>
            `🚛 **${truck.brand} ${truck.model}** (${truck.licensePlate})\n` +
            `📍 ${truck.location.city} | 🔧 ${truck.condition}% condition`,
        )
        .join("\n\n")

      embed.fields.push({
        name: "Recent Trucks",
        value: truckList,
        inline: false,
      })
    }

    return this.createResponse("", [embed])
  }

  private async handleVTCApplication(discordId: string, discordUser: any, message: string): Promise<any> {
    // In a real implementation, this would create an application in the database
    const embed = {
      title: "📝 VTC Application Submitted",
      description: `Thank you for your interest in joining our VTC!`,
      color: 0x22c55e,
      fields: [
        {
          name: "Applicant",
          value: `${discordUser.username}#${discordUser.discriminator}`,
          inline: true,
        },
        {
          name: "Status",
          value: "Pending Review",
          inline: true,
        },
        {
          name: "Message",
          value: message.substring(0, 500),
          inline: false,
        },
      ],
      footer: {
        text: "You will be notified when your application is reviewed.",
      },
    }

    return this.createResponse("", [embed])
  }

  private getStatusEmoji(status: string): string {
    const emojis = {
      available: "🟢",
      assigned: "🟡",
      "in-progress": "🔵",
      completed: "✅",
      cancelled: "❌",
      failed: "🔴",
    }
    return emojis[status as keyof typeof emojis] || "⚪"
  }

  private getDriverStatusEmoji(status: string): string {
    const emojis = {
      ONLINE: "🟢",
      DRIVING: "🚛",
      RESTING: "😴",
      LOADING: "📦",
      UNLOADING: "📤",
      OFFLINE: "⚫",
    }
    return emojis[status as keyof typeof emojis] || "⚪"
  }

  private createResponse(content: string, embeds?: any[]): any {
    return {
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        content,
        embeds: embeds || [],
      },
    }
  }

  // Send webhook notification
  async sendWebhookNotification(webhookUrl: string, notification: any): Promise<void> {
    if (!webhookUrl) return

    try {
      // In production, this would make an actual HTTP request
      console.log("Sending Discord webhook:", notification)
    } catch (error) {
      console.error("Failed to send Discord webhook:", error)
    }
  }
}

export const discordBot = new DiscordBot(
  process.env.DISCORD_BOT_TOKEN || "mock-token",
  process.env.DISCORD_APPLICATION_ID || "mock-app-id",
)
