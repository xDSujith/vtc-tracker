"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Settings, Palette, Truck, Shield, Plug, Bell, Lock, Code, Building2 } from "lucide-react"
import { GeneralSettings } from "./general-settings"
import { BrandingSettings } from "./branding-settings"
import { FleetEconomySettings } from "./fleet-economy-settings"
import { RolesPermissionsSettings } from "./roles-permissions-settings"
import { IntegrationsSettings } from "./integrations-settings"
import { NotificationsSettings } from "./notifications-settings"
import { PrivacySecuritySettings } from "./privacy-security-settings"
import { DeveloperSettings } from "./developer-settings"

interface SettingsShellProps {
  vtcId?: string
}

const settingsTabs = [
  {
    id: "general",
    label: "General",
    icon: Building2,
    description: "Basic VTC information and contact details",
  },
  {
    id: "branding",
    label: "Branding",
    icon: Palette,
    description: "Visual identity and theme customization",
  },
  {
    id: "fleet-economy",
    label: "Fleet & Economy",
    icon: Truck,
    description: "Fleet management and economic settings",
  },
  {
    id: "roles-permissions",
    label: "Roles & Permissions",
    icon: Shield,
    description: "User roles and access control",
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Plug,
    description: "Third-party services and APIs",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Communication templates and alerts",
  },
  {
    id: "privacy-security",
    label: "Privacy & Security",
    icon: Lock,
    description: "Security settings and data protection",
  },
  {
    id: "developer",
    label: "Developer",
    icon: Code,
    description: "Advanced settings and customization",
    badge: "Beta",
  },
]

export function SettingsShell({ vtcId = "default" }: SettingsShellProps) {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="flex h-screen bg-background animate-fade-in">
      {/* Sidebar */}
      <div className="w-80 border-r border-sidebar-border glass">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Settings className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">VTC Settings</h1>
              <p className="text-sm text-muted-foreground">Configure your company</p>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-140px)]">
            <div className="space-y-2">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 hover-lift ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
                        : "hover:bg-muted/50 glass"
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{tab.label}</span>
                        {tab.badge && (
                          <Badge variant="secondary" className="text-xs gradient-border">
                            {tab.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs opacity-80 mt-1 line-clamp-2">{tab.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6 animate-slide-up">
            {activeTab === "general" && <GeneralSettings vtcId={vtcId} />}
            {activeTab === "branding" && <BrandingSettings vtcId={vtcId} />}
            {activeTab === "fleet-economy" && <FleetEconomySettings vtcId={vtcId} />}
            {activeTab === "roles-permissions" && <RolesPermissionsSettings vtcId={vtcId} />}
            {activeTab === "integrations" && <IntegrationsSettings vtcId={vtcId} />}
            {activeTab === "notifications" && <NotificationsSettings />}
            {activeTab === "privacy-security" && <PrivacySecuritySettings />}
            {activeTab === "developer" && <DeveloperSettings />}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export { SettingsShell as VTCSettingsShell }
