"use client"

import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Truck, Users, TrendingUp, Calendar, Settings, BarChart3, Package, Bell, Search } from "lucide-react"
import { DashboardOverview } from "@/components/dashboard-overview"
import { JobsManagement } from "@/components/jobs-management"
import { DriversTracking } from "@/components/drivers-tracking"
import { FleetManagement } from "@/components/fleet-management"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { EventsManagement } from "@/components/events-management"
import { VTCSettingsShell } from "@/components/vtc-settings/settings-shell"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState(null)
  const [vtcData, setVtcData] = useState(null)

  useEffect(() => {
    // Mock authentication - in production this would check real auth
    const mockUser = null;
    setUser(mockUser)

    // Mock VTC data
    const mockVTC = null;
    setVtcData(mockVTC)
  }, [])

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "jobs", label: "Jobs", icon: Package },
    { id: "drivers", label: "Drivers", icon: Users },
    { id: "fleet", label: "Fleet", icon: Truck },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "events", label: "Events", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="glass border-r border-sidebar-border">
          <SidebarHeader className="border-b border-sidebar-border p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                <Truck className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">Trucky++</h2>
                <p className="text-sm text-sidebar-foreground/60">VTC Management</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-3">
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start rounded-lg px-3 py-2.5 hover-lift transition-all duration-200"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="glass border-b border-border px-6 py-4 sticky top-0 z-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover-lift" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{vtcData?.name || "VTC Dashboard"}</h1>
                  <p className="text-sm text-muted-foreground">Professional fleet management system</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                  <Bell className="h-4 w-4" />
                </Button>
                <Badge variant="secondary" className="gradient-border px-3 py-1">
                  {vtcData?.tag || "VTC"}
                </Badge>
                <Avatar className="hover-lift">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    {user?.username?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 animate-fade-in">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="overview" className="animate-slide-up">
                <DashboardOverview vtcData={vtcData} />
              </TabsContent>

              <TabsContent value="jobs" className="animate-slide-up">
                <JobsManagement />
              </TabsContent>

              <TabsContent value="drivers" className="animate-slide-up">
                <DriversTracking />
              </TabsContent>

              <TabsContent value="fleet" className="animate-slide-up">
                <FleetManagement />
              </TabsContent>

              <TabsContent value="analytics" className="animate-slide-up">
                <AnalyticsDashboard />
              </TabsContent>

              <TabsContent value="events" className="animate-slide-up">
                <EventsManagement />
              </TabsContent>

              <TabsContent value="settings" className="animate-slide-up">
                <VTCSettingsShell />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
