// Discord webhook notifications for VTC events
import { discordBot } from "./discord-bot"
import type { Job, Driver, User } from "./types"

export interface NotificationConfig {
  webhookUrl?: string
  enableJobNotifications: boolean
  enableDriverNotifications: boolean
  enableSystemNotifications: boolean
}

export class DiscordNotifications {
  private config: NotificationConfig

  constructor(config: NotificationConfig) {
    this.config = config
  }

  async notifyJobCreated(job: Job, creator: User): Promise<void> {
    if (!this.config.enableJobNotifications || !this.config.webhookUrl) return

    const embed = {
      title: "📦 New Job Available",
      description: job.title,
      color: 0x22c55e,
      fields: [
        {
          name: "Route",
          value: `📍 ${job.route.origin.city} → ${job.route.destination.city}`,
          inline: true,
        },
        {
          name: "Payment",
          value: `💰 $${job.payment}`,
          inline: true,
        },
        {
          name: "Cargo",
          value: `📦 ${job.cargo.type} (${job.cargo.weight}kg)`,
          inline: true,
        },
        {
          name: "Deadline",
          value: `⏰ ${new Date(job.deadline).toLocaleString()}`,
          inline: false,
        },
        {
          name: "Created by",
          value: creator.username,
          inline: true,
        },
      ],
      footer: {
        text: `Job ID: ${job.id}`,
      },
      timestamp: new Date().toISOString(),
    }

    await discordBot.sendWebhookNotification(this.config.webhookUrl, {
      embeds: [embed],
    })
  }

  async notifyJobAssigned(job: Job, driver: Driver, assignedBy: User): Promise<void> {
    if (!this.config.enableJobNotifications || !this.config.webhookUrl) return

    const embed = {
      title: "🚛 Job Assigned",
      description: `${job.title} has been assigned to ${driver.employeeId}`,
      color: 0x3b82f6,
      fields: [
        {
          name: "Driver",
          value: driver.employeeId,
          inline: true,
        },
        {
          name: "Route",
          value: `📍 ${job.route.origin.city} → ${job.route.destination.city}`,
          inline: true,
        },
        {
          name: "Assigned by",
          value: assignedBy.username,
          inline: true,
        },
      ],
      footer: {
        text: `Job ID: ${job.id}`,
      },
      timestamp: new Date().toISOString(),
    }

    await discordBot.sendWebhookNotification(this.config.webhookUrl, {
      embeds: [embed],
    })
  }

  async notifyJobCompleted(job: Job, driver: Driver, rating?: number): Promise<void> {
    if (!this.config.enableJobNotifications || !this.config.webhookUrl) return

    const embed = {
      title: "✅ Job Completed",
      description: `${job.title} has been successfully delivered!`,
      color: 0x22c55e,
      fields: [
        {
          name: "Driver",
          value: driver.employeeId,
          inline: true,
        },
        {
          name: "Payment",
          value: `💰 $${job.payment}`,
          inline: true,
        },
        {
          name: "Distance",
          value: `📏 ${job.route.distance}km`,
          inline: true,
        },
      ],
      footer: {
        text: `Job ID: ${job.id}`,
      },
      timestamp: new Date().toISOString(),
    }

    if (rating) {
      embed.fields.push({
        name: "Rating",
        value: `⭐ ${rating}/5`,
        inline: true,
      })
    }

    await discordBot.sendWebhookNotification(this.config.webhookUrl, {
      embeds: [embed],
    })
  }

  async notifyDriverOnline(driver: Driver): Promise<void> {
    if (!this.config.enableDriverNotifications || !this.config.webhookUrl) return

    const embed = {
      title: "🟢 Driver Online",
      description: `${driver.employeeId} is now online and available`,
      color: 0x22c55e,
      fields: [
        {
          name: "Location",
          value: `📍 ${driver.location.city}, ${driver.location.country}`,
          inline: true,
        },
        {
          name: "Status",
          value: driver.status,
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
    }

    await discordBot.sendWebhookNotification(this.config.webhookUrl, {
      embeds: [embed],
    })
  }

  async notifyDriverOffline(driver: Driver): Promise<void> {
    if (!this.config.enableDriverNotifications || !this.config.webhookUrl) return

    const embed = {
      title: "⚫ Driver Offline",
      description: `${driver.employeeId} has gone offline`,
      color: 0x6b7280,
      fields: [
        {
          name: "Last Location",
          value: `📍 ${driver.location.city}, ${driver.location.country}`,
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
    }

    await discordBot.sendWebhookNotification(this.config.webhookUrl, {
      embeds: [embed],
    })
  }

  async notifyNewMember(user: User): Promise<void> {
    if (!this.config.enableSystemNotifications || !this.config.webhookUrl) return

    const embed = {
      title: "👋 New Member Joined",
      description: `Welcome ${user.username} to the VTC!`,
      color: 0x8b5cf6,
      fields: [
        {
          name: "Username",
          value: user.username,
          inline: true,
        },
        {
          name: "Role",
          value: user.role,
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
    }

    await discordBot.sendWebhookNotification(this.config.webhookUrl, {
      embeds: [embed],
    })
  }

  async notifySystemAlert(
    title: string,
    message: string,
    severity: "info" | "warning" | "error" = "info",
  ): Promise<void> {
    if (!this.config.enableSystemNotifications || !this.config.webhookUrl) return

    const colors = {
      info: 0x3b82f6,
      warning: 0xf59e0b,
      error: 0xef4444,
    }

    const emojis = {
      info: "ℹ️",
      warning: "⚠️",
      error: "🚨",
    }

    const embed = {
      title: `${emojis[severity]} ${title}`,
      description: message,
      color: colors[severity],
      timestamp: new Date().toISOString(),
    }

    await discordBot.sendWebhookNotification(this.config.webhookUrl, {
      embeds: [embed],
    })
  }
}

// Default notification instance
export const discordNotifications = new DiscordNotifications({
  webhookUrl: process.env.DISCORD_WEBHOOK_URL,
  enableJobNotifications: true,
  enableDriverNotifications: true,
  enableSystemNotifications: true,
})
