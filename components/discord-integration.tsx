"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bot, Webhook, Bell, Settings, CheckCircle, AlertCircle, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DiscordIntegration() {
  const [webhookUrl, setWebhookUrl] = useState("")
  const [botConnected, setBotConnected] = useState(true) // Mock connected state
  const [notifications, setNotifications] = useState({
    jobs: true,
    drivers: true,
    system: true,
  })
  const { toast } = useToast()

  const discordCommands = [
    {
      command: "/vtc-status",
      description: "Get VTC statistics and overview",
      usage: "/vtc-status",
    },
    {
      command: "/job-list",
      description: "List available or active jobs",
      usage: "/job-list [status]",
    },
    {
      command: "/driver-info",
      description: "Get driver information and status",
      usage: "/driver-info <driver_name>",
    },
    {
      command: "/job-assign",
      description: "Assign a job to a driver (Manager+ only)",
      usage: "/job-assign <job_id> <driver>",
    },
    {
      command: "/fleet-status",
      description: "Get fleet overview and truck status",
      usage: "/fleet-status",
    },
    {
      command: "/apply-vtc",
      description: "Apply to join the VTC",
      usage: "/apply-vtc <message>",
    },
  ]

  const handleSaveWebhook = () => {
    // In production, this would save to backend
    toast({
      title: "Webhook Updated",
      description: "Discord webhook URL has been saved successfully.",
    })
  }

  const handleTestWebhook = () => {
    // In production, this would send a test message
    toast({
      title: "Test Message Sent",
      description: "Check your Discord channel for the test message.",
    })
  }

  const handleRegisterCommands = async () => {
    try {
      // In production, this would call the register commands API
      toast({
        title: "Commands Registered",
        description: "Discord slash commands have been registered successfully.",
      })
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Failed to register Discord commands. Please try again.",
        variant: "destructive",
      })
    }
  }

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command)
    toast({
      title: "Copied",
      description: `Command "${command}" copied to clipboard.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Discord Integration</h2>
        <p className="text-muted-foreground">Connect your VTC with Discord for seamless communication</p>
      </div>

      {/* Bot Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Bot Status
          </CardTitle>
          <CardDescription>Discord bot connection and configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${botConnected ? "bg-green-500" : "bg-red-500"}`} />
              <div>
                <p className="font-medium">Trucky++ Bot</p>
                <p className="text-sm text-muted-foreground">
                  {botConnected ? "Connected and operational" : "Disconnected"}
                </p>
              </div>
            </div>
            <Badge variant={botConnected ? "default" : "destructive"}>
              {botConnected ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Online
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Offline
                </>
              )}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleRegisterCommands} className="bg-accent text-accent-foreground">
              Register Commands
            </Button>
            <Button variant="outline">Restart Bot</Button>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            Webhook Configuration
          </CardTitle>
          <CardDescription>Configure Discord webhook for notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Discord Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhook-url"
                placeholder="https://discord.com/api/webhooks/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                type="password"
              />
              <Button onClick={handleSaveWebhook}>Save</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Create a webhook in your Discord server settings to receive notifications
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notification Settings
            </h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Job Notifications</p>
                  <p className="text-sm text-muted-foreground">New jobs, assignments, and completions</p>
                </div>
                <Switch
                  checked={notifications.jobs}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, jobs: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Driver Notifications</p>
                  <p className="text-sm text-muted-foreground">Driver status changes and activities</p>
                </div>
                <Switch
                  checked={notifications.drivers}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, drivers: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Notifications</p>
                  <p className="text-sm text-muted-foreground">System alerts and member updates</p>
                </div>
                <Switch
                  checked={notifications.system}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, system: checked }))}
                />
              </div>
            </div>
          </div>

          <Button onClick={handleTestWebhook} variant="outline" className="w-full bg-transparent">
            Send Test Message
          </Button>
        </CardContent>
      </Card>

      {/* Available Commands */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Available Commands
          </CardTitle>
          <CardDescription>Discord slash commands available to your members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {discordCommands.map((cmd, index) => (
              <div key={index} className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">{cmd.command}</code>
                  <Button variant="ghost" size="sm" onClick={() => copyCommand(cmd.usage)}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{cmd.description}</p>
                <p className="text-xs text-muted-foreground">
                  Usage: <code>{cmd.usage}</code>
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
