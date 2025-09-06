"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Package, Clock, Star, Target } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

export function AnalyticsDashboard() {
  const monthlyRevenue = [
    { month: "Jan", revenue: 185000, jobs: 98 },
    { month: "Feb", revenue: 210000, jobs: 112 },
    { month: "Mar", revenue: 195000, jobs: 105 },
    { month: "Apr", revenue: 225000, jobs: 118 },
    { month: "May", revenue: 240000, jobs: 125 },
    { month: "Jun", revenue: 235000, jobs: 122 },
    { month: "Jul", revenue: 255000, jobs: 135 },
    { month: "Aug", revenue: 270000, jobs: 142 },
    { month: "Sep", revenue: 265000, jobs: 138 },
    { month: "Oct", revenue: 280000, jobs: 148 },
    { month: "Nov", revenue: 295000, jobs: 155 },
    { month: "Dec", revenue: 310000, jobs: 162 },
  ]

  const driverPerformance = [
    { name: "RoadWarrior", jobs: 145, rating: 4.8, onTime: 96 },
    { name: "SpeedDemon", jobs: 98, rating: 4.6, onTime: 94 },
    { name: "TruckMaster", jobs: 203, rating: 4.9, onTime: 98 },
    { name: "HighwayKing", jobs: 76, rating: 4.4, onTime: 89 },
    { name: "CargoExpert", jobs: 134, rating: 4.7, onTime: 95 },
  ]

  const jobStatusData = [
    { name: "Completed", value: 1180, color: "#22c55e" },
    { name: "In Progress", value: 23, color: "#3b82f6" },
    { name: "Available", value: 12, color: "#f59e0b" },
    { name: "Cancelled", value: 35, color: "#ef4444" },
  ]

  const routePopularity = [
    { route: "Berlin → Amsterdam", jobs: 45, revenue: 112500 },
    { route: "Munich → Prague", jobs: 38, revenue: 95000 },
    { route: "Frankfurt → Vienna", jobs: 42, revenue: 105000 },
    { route: "Hamburg → Copenhagen", jobs: 29, revenue: 72500 },
    { route: "Cologne → Paris", jobs: 35, revenue: 87500 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Comprehensive insights into your VTC performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">$310,000</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+5.1% from last month</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Jobs Completed</p>
                <p className="text-2xl font-bold">162</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+4.5% from last month</span>
                </div>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">4.7</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-muted-foreground">Excellent performance</span>
                </div>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                <p className="text-2xl font-bold">94%</p>
                <div className="flex items-center gap-1 mt-1">
                  <Target className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">Above target (90%)</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Jobs Trend</CardTitle>
            <CardDescription>Monthly performance over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
                <Line
                  type="monotone"
                  dataKey="jobs"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Jobs Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Job Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Job Status Distribution</CardTitle>
            <CardDescription>Current status of all jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jobStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {jobStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Driver Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Driver Performance</CardTitle>
            <CardDescription>Jobs completed and ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {driverPerformance.map((driver, index) => (
                <div
                  key={driver.name}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-xs font-medium">{driver.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{driver.name}</p>
                      <p className="text-xs text-muted-foreground">{driver.jobs} jobs completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span className="text-sm font-medium">{driver.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{driver.onTime}% on-time</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Routes */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Routes</CardTitle>
            <CardDescription>Most frequently used delivery routes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={routePopularity} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-muted-foreground" />
                <YAxis dataKey="route" type="category" width={120} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="jobs" fill="hsl(var(--chart-3))" name="Jobs" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
