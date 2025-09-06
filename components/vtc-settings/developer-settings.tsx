"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Code,
  Webhook,
  Database,
  Zap,
  Bug,
  TestTube,
  Copy,
  ExternalLink,
  RefreshCw,
  Save,
  AlertTriangle,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type SettingsCategory = "api" | "webhooks" | "logging"

export function DeveloperSettings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    api: {
      enabled: true,
      rateLimit: 1000,
      debugMode: false,
      cors: true,
    },
    webhooks: {
      enabled: true,
      retryAttempts: 3,
      timeout: 30,
    },
    logging: {
      level: "info",
      apiCalls: true,
      errors: true,
      performance: false,
    },
  })

  const [webhooks, setWebhooks] = useState([
    {
      id: "1",
      name: "Job Completion Webhook",
      url: "https://api.example.com/webhooks/jobs",
      events: ["job.completed", "job.cancelled"],
      status: "active",
      lastTriggered: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Member Events",
      url: "https://discord.com/api/webhooks/...",
      events: ["member.joined", "member.left"],
      status: "active",
      lastTriggered: "2024-01-14T15:45:00Z",
    },
  ])

  const apiEndpoints = [
    {
      method: "GET",
      path: "/api/v1/vtc/stats",
      description: "Get VTC statistics",
    },
    { method: "GET", path: "/api/v1/jobs", description: "List all jobs" },
    { method: "POST", path: "/api/v1/jobs", description: "Create new job" },
    { method: "GET", path: "/api/v1/drivers", description: "List all drivers" },
    { method: "GET", path: "/api/v1/fleet", description: "Get fleet information" },
    {
      method: "POST",
      path: "/api/v1/telemetry",
      description: "Submit telemetry data",
    },
  ]

  const updateSetting = (
    category: SettingsCategory,
    setting: string,
    value: string | number | boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }))
  }

  const handleSaveSettings = () => {
    console.log("Saving settings:", settings)
    toast({
      title: "Settings Saved",
      description: "Your developer settings have been successfully updated.",
    })
  }

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "Feature Not Implemented",
      description: `${featureName} is not yet available.`,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold text-foreground">
          Developer Settings
        </h3>
        <p className="text-muted-foreground">
          API configuration, webhooks, and development tools
        </p>
      </div>

      <Alert className="glass border-yellow-500/20">
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <AlertDescription>
          Developer settings are for advanced users. Incorrect configuration may
          affect system functionality.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="api" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="api">API Configuration</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="logging">Logging & Debug</TabsTrigger>
          <TabsTrigger value="testing">Testing Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-6">
          <Card className="glass hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Code className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle>API Settings</CardTitle>
                  <CardDescription>
                    Configure API access and behavior
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable API</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow external API access
                  </p>
                </div>
                <Switch
                  checked={settings.api.enabled}
                  onCheckedChange={checked =>
                    updateSetting("api", "enabled", checked)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Rate Limit (requests/hour)</Label>
                <Input
                  type="number"
                  value={settings.api.rateLimit}
                  onChange={e =>
                    updateSetting("api", "rateLimit", parseInt(e.target.value))
                  }
                  className="w-32"
                  disabled={!settings.api.enabled}
                />
                <p className="text-sm text-muted-foreground">
                  Maximum API requests per hour per key
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Include debug information in responses
                  </p>
                </div>
                <Switch
                  checked={settings.api.debugMode}
                  onCheckedChange={checked =>
                    updateSetting("api", "debugMode", checked)
                  }
                  disabled={!settings.api.enabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>CORS Enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow cross-origin requests
                  </p>
                </div>
                <Switch
                  checked={settings.api.cors}
                  onCheckedChange={checked =>
                    updateSetting("api", "cors", checked)
                  }
                  disabled={!settings.api.enabled}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>
                Available API endpoints and documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {apiEndpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          endpoint.method === "GET" ? "secondary" : "default"
                        }
                        className="font-mono"
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono">{endpoint.path}</code>
                      <span className="text-sm text-muted-foreground">
                        {endpoint.description}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover-lift"
                      onClick={() => {
                        navigator.clipboard.writeText(endpoint.path)
                        toast({
                          title: "Copied to Clipboard",
                          description: "API endpoint path has been copied.",
                        })
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <a
                  href="/docs/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button variant="outline" className="hover-lift bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Documentation
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">Webhooks</h4>
              <p className="text-sm text-muted-foreground">
                Configure webhooks for real-time event notifications
              </p>
            </div>
            <Button
              className="gradient-border hover-lift"
              onClick={() => handleFeatureClick("Add Webhook")}
            >
              <Webhook className="h-4 w-4 mr-2" />
              Add Webhook
            </Button>
          </div>

          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle>Webhook Settings</CardTitle>
              <CardDescription>Global webhook configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Webhooks</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow webhook notifications
                  </p>
                </div>
                <Switch
                  checked={settings.webhooks.enabled}
                  onCheckedChange={checked =>
                    updateSetting("webhooks", "enabled", checked)
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Retry Attempts</Label>
                  <Input
                    type="number"
                    value={settings.webhooks.retryAttempts}
                    onChange={e =>
                      updateSetting(
                        "webhooks",
                        "retryAttempts",
                        parseInt(e.target.value)
                      )
                    }
                    disabled={!settings.webhooks.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Timeout (seconds)</Label>
                  <Input
                    type="number"
                    value={settings.webhooks.timeout}
                    onChange={e =>
                      updateSetting(
                        "webhooks",
                        "timeout",
                        parseInt(e.target.value)
                      )
                    }
                    disabled={!settings.webhooks.enabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {webhooks.map(webhook => (
              <Card key={webhook.id} className="glass hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{webhook.name}</h4>
                        <Badge
                          variant={
                            webhook.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {webhook.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">
                        {webhook.url}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {webhook.events.map(event => (
                          <Badge
                            key={event}
                            variant="outline"
                            className="text-xs"
                          >
                            {event}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last triggered:{" "}
                        {new Date(webhook.lastTriggered).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover-lift bg-transparent"
                        onClick={() =>
                          handleFeatureClick("Test Webhook")
                        }
                      >
                        <TestTube className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover-lift bg-transparent"
                        onClick={() =>
                          handleFeatureClick("Refresh Webhook")
                        }
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logging" className="space-y-6">
          <Card className="glass hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Bug className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <CardTitle>Logging Configuration</CardTitle>
                  <CardDescription>
                    Configure system logging and debugging
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Log Level</Label>
                <Select
                  value={settings.logging.level}
                  onValueChange={value =>
                    updateSetting("logging", "level", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select log level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Log API Calls</Label>
                  <p className="text-sm text-muted-foreground">
                    Record all API requests and responses
                  </p>
                </div>
                <Switch
                  checked={settings.logging.apiCalls}
                  onCheckedChange={checked =>
                    updateSetting("logging", "apiCalls", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Log Errors</Label>
                  <p className="text-sm text-muted-foreground">
                    Record application errors and exceptions
                  </p>
                </div>
                <Switch
                  checked={settings.logging.errors}
                  onCheckedChange={checked =>
                    updateSetting("logging", "errors", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Performance Logging</Label>
                  <p className="text-sm text-muted-foreground">
                    Track performance metrics and timing
                  </p>
                </div>
                <Switch
                  checked={settings.logging.performance}
                  onCheckedChange={checked =>
                    updateSetting("logging", "performance", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle>Testing Tools</CardTitle>
              <CardDescription>
                Tools for testing and debugging your VTC system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="hover-lift bg-transparent"
                  onClick={() => handleFeatureClick("Test API Endpoints")}
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  Test API Endpoints
                </Button>
                <Button
                  variant="outline"
                  className="hover-lift bg-transparent"
                  onClick={() => handleFeatureClick("Test Webhooks")}
                >
                  <Webhook className="h-4 w-4 mr-2" />
                  Test Webhooks
                </Button>
                <Button
                  variant="outline"
                  className="hover-lift bg-transparent"
                  onClick={() => handleFeatureClick("Database Health Check")}
                >
                  <Database className="h-4 w-4 mr-2" />
                  Database Health Check
                </Button>
                <Button
                  variant="outline"
                  className="hover-lift bg-transparent"
                  onClick={() => handleFeatureClick("Performance Test")}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Performance Test
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                Current system status and configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">API Version</Label>
                  <p className="font-mono">v1.2.3</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">
                    Database Version
                  </Label>
                  <p className="font-mono">PostgreSQL 15.4</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Uptime</Label>
                  <p className="font-mono">7d 12h 34m</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Environment</Label>
                  <p className="font-mono">Production</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          className="hover-lift bg-transparent"
          onClick={() => handleFeatureClick("Cancel")}
        >
          Cancel
        </Button>
        <Button
          className="gradient-border hover-lift"
          onClick={handleSaveSettings}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
