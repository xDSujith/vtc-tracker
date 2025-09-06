"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Monitor, Book, Webhook, Key, Play } from "lucide-react"

interface IntegrationsSettingsProps {
  vtcId: string
}

export function IntegrationsSettings({ vtcId }: IntegrationsSettingsProps) {
  const [discordConnected, setDiscordConnected] = useState(true)
  const [obsConnected, setObsConnected] = useState(false)
  const [trucksBookConnected, setTrucksBookConnected] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Integrations</h2>
        <p className="text-muted-foreground">Connect third-party services and configure API access.</p>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          {/* Discord Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Discord Integration
                {discordConnected && <Badge className="bg-green-500">Connected</Badge>}
              </CardTitle>
              <CardDescription>Connect your Discord server for automated notifications and role sync.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Bot Token</label>
                  <Input
                    type="password"
                    placeholder="Bot token"
                    defaultValue={discordConnected ? "••••••••••••••••" : ""}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Server ID</label>
                  <Input placeholder="Discord server ID" defaultValue="123456789012345678" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Job Notifications</div>
                    <div className="text-sm text-muted-foreground">Send job updates to Discord</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Event Announcements</div>
                    <div className="text-sm text-muted-foreground">Announce convoy events</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Role Synchronization</div>
                    <div className="text-sm text-muted-foreground">Sync VTC roles with Discord</div>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant={discordConnected ? "outline" : "default"}>
                  {discordConnected ? "Reconnect" : "Connect"} Discord
                </Button>
                {discordConnected && (
                  <Button variant="destructive" onClick={() => setDiscordConnected(false)}>
                    Disconnect
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* OBS Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                OBS Overlay Integration
                {obsConnected && <Badge className="bg-green-500">Connected</Badge>}
              </CardTitle>
              <CardDescription>Enable browser source overlays for streaming.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Overlay URL</label>
                  <Input readOnly value="https://vtc-tracker.app/overlay/123456" className="bg-muted" />
                </div>
                <div>
                  <label className="text-sm font-medium">Refresh Rate (seconds)</label>
                  <Input type="number" defaultValue="5" min="1" max="60" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Job Information</div>
                    <div className="text-sm text-muted-foreground">Show current job details</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Speed & Location</div>
                    <div className="text-sm text-muted-foreground">Display telemetry data</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">VTC Branding</div>
                    <div className="text-sm text-muted-foreground">Show VTC logo and colors</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button onClick={() => setObsConnected(!obsConnected)}>
                {obsConnected ? "Disable" : "Enable"} OBS Overlay
              </Button>
            </CardContent>
          </Card>

          {/* TrucksBook Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                TrucksBook Integration
                {trucksBookConnected && <Badge className="bg-green-500">Connected</Badge>}
              </CardTitle>
              <CardDescription>Sync job data with TrucksBook for enhanced tracking.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">API Key</label>
                <Input
                  type="password"
                  placeholder="TrucksBook API key"
                  defaultValue={trucksBookConnected ? "••••••••••••••••" : ""}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Auto Job Import</div>
                    <div className="text-sm text-muted-foreground">Import jobs from TrucksBook</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Export Completed Jobs</div>
                    <div className="text-sm text-muted-foreground">Send completed jobs to TrucksBook</div>
                  </div>
                  <Switch />
                </div>
              </div>

              <Button onClick={() => setTrucksBookConnected(!trucksBookConnected)}>
                {trucksBookConnected ? "Disconnect" : "Connect"} TrucksBook
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Webhook Configuration
              </CardTitle>
              <CardDescription>Configure webhooks for real-time event notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Webhook URL</label>
                  <Input placeholder="https://your-app.com/webhook" />
                </div>
                <div>
                  <label className="text-sm font-medium">Secret Key</label>
                  <Input type="password" placeholder="Webhook secret for verification" />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Event Types</h4>
                {[
                  "Job Started",
                  "Job Completed",
                  "Driver Joined",
                  "Driver Left",
                  "Event Created",
                  "Penalty Issued",
                ].map((event) => (
                  <div key={event} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="font-medium">{event}</div>
                    <Switch />
                  </div>
                ))}
              </div>

              <Button>Save Webhook Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Access
              </CardTitle>
              <CardDescription>Manage API keys and access tokens for external integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">API Key</label>
                  <div className="flex gap-2">
                    <Input readOnly value="vtc_123456789abcdef" className="bg-muted" />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Rate Limit</label>
                  <Input readOnly value="1000 requests/hour" className="bg-muted" />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">API Permissions</h4>
                {["Read VTC Data", "Read Job Data", "Read Driver Data", "Write Job Data", "Manage Events"].map(
                  (permission) => (
                    <div key={permission} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="font-medium">{permission}</div>
                      <Switch defaultChecked />
                    </div>
                  ),
                )}
              </div>

              <Button>
                <Play className="h-4 w-4 mr-2" />
                Open API Playground
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
