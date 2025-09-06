"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, MessageSquare, Smartphone, Plus, Trash2, Edit, Save, TestTube } from "lucide-react"

export function NotificationsSettings() {
  const [settings, setSettings] = useState({
    email: {
      enabled: true,
      jobAssignments: true,
      jobCompletions: true,
      newApplications: true,
      systemAlerts: true,
      weeklyReports: false,
    },
    discord: {
      enabled: true,
      jobNotifications: true,
      memberJoined: true,
      eventReminders: true,
      systemMessages: false,
    },
    push: {
      enabled: false,
      jobUpdates: false,
      emergencyAlerts: true,
    },
  })

  const [templates, setTemplates] = useState([
    {
      id: "1",
      name: "Job Assignment",
      type: "email",
      subject: "New Job Assignment - {{jobTitle}}",
      content:
        "Hello {{driverName}}, you have been assigned a new job: {{jobTitle}}. Please check your dashboard for details.",
      variables: ["driverName", "jobTitle", "pickupLocation", "deliveryLocation"],
    },
    {
      id: "2",
      name: "Welcome Message",
      type: "discord",
      subject: "Welcome to {{vtcName}}!",
      content: "Welcome {{memberName}} to our VTC! Please read our rules and feel free to ask questions.",
      variables: ["memberName", "vtcName", "rulesChannel"],
    },
  ])

  const updateSetting = (category: string, setting: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold text-foreground">Notification Settings</h3>
        <p className="text-muted-foreground">Configure how and when your VTC receives notifications</p>
      </div>

      <Tabs defaultValue="channels" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="channels">Notification Channels</TabsTrigger>
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
          <TabsTrigger value="rules">Notification Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="channels" className="space-y-6">
          {/* Email Notifications */}
          <Card className="glass hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Configure email notification preferences</CardDescription>
                </div>
                <div className="ml-auto">
                  <Switch
                    checked={settings.email.enabled}
                    onCheckedChange={(checked) => updateSetting("email", "enabled", checked)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Job Assignments</Label>
                    <p className="text-sm text-muted-foreground">Notify when jobs are assigned to drivers</p>
                  </div>
                  <Switch
                    checked={settings.email.jobAssignments}
                    onCheckedChange={(checked) => updateSetting("email", "jobAssignments", checked)}
                    disabled={!settings.email.enabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Job Completions</Label>
                    <p className="text-sm text-muted-foreground">Notify when jobs are completed</p>
                  </div>
                  <Switch
                    checked={settings.email.jobCompletions}
                    onCheckedChange={(checked) => updateSetting("email", "jobCompletions", checked)}
                    disabled={!settings.email.enabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Applications</Label>
                    <p className="text-sm text-muted-foreground">Notify when new members apply</p>
                  </div>
                  <Switch
                    checked={settings.email.newApplications}
                    onCheckedChange={(checked) => updateSetting("email", "newApplications", checked)}
                    disabled={!settings.email.enabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Send weekly performance summaries</p>
                  </div>
                  <Switch
                    checked={settings.email.weeklyReports}
                    onCheckedChange={(checked) => updateSetting("email", "weeklyReports", checked)}
                    disabled={!settings.email.enabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discord Notifications */}
          <Card className="glass hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10">
                  <MessageSquare className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <CardTitle>Discord Notifications</CardTitle>
                  <CardDescription>Configure Discord bot notifications</CardDescription>
                </div>
                <div className="ml-auto">
                  <Switch
                    checked={settings.discord.enabled}
                    onCheckedChange={(checked) => updateSetting("discord", "enabled", checked)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Job Notifications</Label>
                    <p className="text-sm text-muted-foreground">Post job updates to Discord channels</p>
                  </div>
                  <Switch
                    checked={settings.discord.jobNotifications}
                    onCheckedChange={(checked) => updateSetting("discord", "jobNotifications", checked)}
                    disabled={!settings.discord.enabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Member Joined</Label>
                    <p className="text-sm text-muted-foreground">Welcome new members automatically</p>
                  </div>
                  <Switch
                    checked={settings.discord.memberJoined}
                    onCheckedChange={(checked) => updateSetting("discord", "memberJoined", checked)}
                    disabled={!settings.discord.enabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Event Reminders</Label>
                    <p className="text-sm text-muted-foreground">Send convoy and event reminders</p>
                  </div>
                  <Switch
                    checked={settings.discord.eventReminders}
                    onCheckedChange={(checked) => updateSetting("discord", "eventReminders", checked)}
                    disabled={!settings.discord.enabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card className="glass hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Smartphone className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <CardTitle>Push Notifications</CardTitle>
                  <CardDescription>Mobile and desktop push notifications</CardDescription>
                </div>
                <div className="ml-auto">
                  <Switch
                    checked={settings.push.enabled}
                    onCheckedChange={(checked) => updateSetting("push", "enabled", checked)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Job Updates</Label>
                    <p className="text-sm text-muted-foreground">Real-time job status updates</p>
                  </div>
                  <Switch
                    checked={settings.push.jobUpdates}
                    onCheckedChange={(checked) => updateSetting("push", "jobUpdates", checked)}
                    disabled={!settings.push.enabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Emergency Alerts</Label>
                    <p className="text-sm text-muted-foreground">Critical system alerts</p>
                  </div>
                  <Switch
                    checked={settings.push.emergencyAlerts}
                    onCheckedChange={(checked) => updateSetting("push", "emergencyAlerts", checked)}
                    disabled={!settings.push.enabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">Message Templates</h4>
              <p className="text-sm text-muted-foreground">Customize notification message templates</p>
            </div>
            <Button className="gradient-border hover-lift">
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>

          <div className="grid gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="glass hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className={
                            template.type === "email"
                              ? "border-blue-500/20 text-blue-500"
                              : template.type === "discord"
                                ? "border-indigo-500/20 text-indigo-500"
                                : "border-green-500/20 text-green-500"
                          }
                        >
                          {template.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                        <TestTube className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Subject</Label>
                    <p className="text-sm text-muted-foreground mt-1">{template.subject}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Content</Label>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{template.content}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Available Variables</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {template.variables.map((variable) => (
                        <Badge key={variable} variant="secondary" className="text-xs">
                          {`{{${variable}}}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle>Notification Rules</CardTitle>
              <CardDescription>Set up conditional notification rules and filters</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Advanced notification rules coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" className="hover-lift bg-transparent">
          Cancel
        </Button>
        <Button className="gradient-border hover-lift">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
