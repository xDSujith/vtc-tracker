"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Shield, AlertTriangle, Activity, Eye, Ban, CheckCircle, XCircle } from "lucide-react"

interface AnalyticsMonitoringProps {
  vtcId: string
}

export function AnalyticsMonitoring({ vtcId }: AnalyticsMonitoringProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [detections, setDetections] = useState([
    {
      id: "1",
      driverId: "driver_123",
      driverName: "SpeedDemon",
      cheatType: "speed_hack",
      severity: "high",
      timestamp: new Date(),
      status: "detected",
      evidence: { reportedSpeed: 180, maxAllowedSpeed: 150 },
    },
    {
      id: "2",
      driverId: "driver_456",
      driverName: "TeleportMaster",
      cheatType: "teleport",
      severity: "critical",
      timestamp: new Date(Date.now() - 3600000),
      status: "investigating",
      evidence: { distance: 5000, timeFrame: "1 second" },
    },
  ])

  const analyticsData = {
    dailyStats: [
      { date: "Mon", jobs: 45, revenue: 12500, violations: 2 },
      { date: "Tue", jobs: 52, revenue: 14200, violations: 1 },
      { date: "Wed", jobs: 38, revenue: 10800, violations: 3 },
      { date: "Thu", jobs: 61, revenue: 16900, violations: 0 },
      { date: "Fri", jobs: 49, revenue: 13400, violations: 1 },
      { date: "Sat", jobs: 33, revenue: 9200, violations: 2 },
      { date: "Sun", jobs: 28, revenue: 7800, violations: 1 },
    ],
    cheatTypes: [
      { name: "Speed Hack", value: 35, color: "#ef4444" },
      { name: "Teleport", value: 25, color: "#f97316" },
      { name: "Fuel Hack", value: 20, color: "#eab308" },
      { name: "Route Deviation", value: 15, color: "#22c55e" },
      { name: "Other", value: 5, color: "#6366f1" },
    ],
  }

  const handleInvestigate = (detectionId: string) => {
    setDetections((prev) => prev.map((d) => (d.id === detectionId ? { ...d, status: "investigating" } : d)))
  }

  const handleConfirm = (detectionId: string) => {
    setDetections((prev) => prev.map((d) => (d.id === detectionId ? { ...d, status: "confirmed" } : d)))
  }

  const handleFalsePositive = (detectionId: string) => {
    setDetections((prev) => prev.map((d) => (d.id === detectionId ? { ...d, status: "false_positive" } : d)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics & Anti-Cheat</h2>
          <p className="text-gray-400">Monitor VTC performance and security</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-400 border-green-400">
            <Shield className="h-3 w-3 mr-1" />
            System Active
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-gray-900">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="detections">Detections</TabsTrigger>
          <TabsTrigger value="drivers">Driver Profiles</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Security Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Active Detections</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {detections.filter((d) => d.status === "detected").length}
                </div>
                <p className="text-xs text-gray-400">
                  <span className="text-red-400">+2</span> in last hour
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Risk Score</CardTitle>
                <Shield className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">Medium</div>
                <Progress value={45} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Clean Drivers</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">87%</div>
                <p className="text-xs text-gray-400">
                  <span className="text-green-400">+3%</span> this week
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">System Uptime</CardTitle>
                <Activity className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <p className="text-xs text-gray-400">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Security Events</CardTitle>
              <CardDescription>Latest anti-cheat detections and investigations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {detections.slice(0, 5).map((detection) => (
                <div
                  key={detection.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        detection.severity === "critical"
                          ? "bg-red-500"
                          : detection.severity === "high"
                            ? "bg-orange-500"
                            : detection.severity === "medium"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-white">{detection.driverName}</p>
                      <p className="text-sm text-gray-400">{detection.cheatType.replace("_", " ")}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        detection.status === "confirmed"
                          ? "destructive"
                          : detection.status === "investigating"
                            ? "secondary"
                            : detection.status === "false_positive"
                              ? "outline"
                              : "default"
                      }
                    >
                      {detection.status}
                    </Badge>
                    <p className="text-xs text-gray-400 mt-1">{detection.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Performance Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Daily Performance</CardTitle>
                <CardDescription>Jobs completed and revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="jobs" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Cheat Detection Types</CardTitle>
                <CardDescription>Distribution of detected violations</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.cheatTypes}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {analyticsData.cheatTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detections" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Active Detections</CardTitle>
              <CardDescription>Review and manage anti-cheat detections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {detections.map((detection) => (
                <div key={detection.id} className="p-4 rounded-lg border border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          detection.severity === "critical"
                            ? "destructive"
                            : detection.severity === "high"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {detection.severity}
                      </Badge>
                      <span className="font-medium text-white">{detection.driverName}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{detection.cheatType.replace("_", " ")}</span>
                    </div>
                    <Badge
                      variant={
                        detection.status === "confirmed"
                          ? "destructive"
                          : detection.status === "investigating"
                            ? "secondary"
                            : detection.status === "false_positive"
                              ? "outline"
                              : "default"
                      }
                    >
                      {detection.status}
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-400">
                    <p>Evidence: {JSON.stringify(detection.evidence)}</p>
                    <p>Detected: {detection.timestamp.toLocaleString()}</p>
                  </div>

                  {detection.status === "detected" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleInvestigate(detection.id)}
                        className="border-gray-700 text-white hover:bg-gray-800"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Investigate
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleConfirm(detection.id)}>
                        <Ban className="h-3 w-3 mr-1" />
                        Confirm Cheat
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleFalsePositive(detection.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        False Positive
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Driver Risk Profiles</CardTitle>
              <CardDescription>Monitor driver behavior and risk scores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "SpeedDemon", riskScore: 75, status: "flagged", violations: 3 },
                { name: "TeleportMaster", riskScore: 45, status: "suspicious", violations: 1 },
                { name: "CleanDriver", riskScore: 5, status: "clean", violations: 0 },
                { name: "RoadWarrior", riskScore: 20, status: "clean", violations: 0 },
              ].map((driver, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">{driver.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{driver.name}</p>
                      <p className="text-sm text-gray-400">{driver.violations} violations</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge
                      variant={
                        driver.status === "flagged"
                          ? "destructive"
                          : driver.status === "suspicious"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {driver.status}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Risk:</span>
                      <Progress value={driver.riskScore} className="h-2 w-16" />
                      <span className="text-xs text-white">{driver.riskScore}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
