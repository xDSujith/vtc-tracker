"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Truck,
  Package,
  DollarSign,
  TrendingUp,
  MapPin,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

interface DashboardOverviewProps {
  vtcData: any
}

export function DashboardOverview({ vtcData }: DashboardOverviewProps) {
  const stats = vtcData?.stats || {}

  const quickStats = [
    {
      title: "Total Members",
      value: stats.totalMembers || 0,
      icon: Users,
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Active Jobs",
      value: "23",
      icon: Package,
      change: "+5%",
      changeType: "positive",
    },
    {
      title: "Fleet Size",
      value: "18",
      icon: Truck,
      change: "+2",
      changeType: "positive",
    },
    {
      title: "Monthly Revenue",
      value: `$${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      change: "+18%",
      changeType: "positive",
    },
  ]

  const recentJobs = [
    {
      id: "JOB-001",
      title: "Electronics to Amsterdam",
      driver: "RoadWarrior",
      status: "in-progress",
      progress: 65,
      eta: "2h 30m",
    },
    {
      id: "JOB-002",
      title: "Machinery to Prague",
      driver: "Unassigned",
      status: "available",
      progress: 0,
      eta: "N/A",
    },
    {
      id: "JOB-003",
      title: "Food Delivery to Vienna",
      driver: "SpeedDemon",
      status: "completed",
      progress: 100,
      eta: "Delivered",
    },
  ]

  const onlineDrivers = [
    {
      name: "RoadWarrior",
      status: "driving",
      location: "Berlin → Amsterdam",
      truck: "Scania R730",
    },
    {
      name: "SpeedDemon",
      status: "resting",
      location: "Vienna Service Station",
      truck: "Volvo FH16",
    },
    {
      name: "TruckMaster",
      status: "loading",
      location: "Munich Depot",
      truck: "MAN TGX",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Recent Jobs
            </CardTitle>
            <CardDescription>Latest job assignments and progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{job.title}</span>
                    <Badge
                      variant={
                        job.status === "completed" ? "default" : job.status === "in-progress" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {job.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                      {job.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {job.status === "available" && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Driver: {job.driver} • ETA: {job.eta}
                  </p>
                  {job.status === "in-progress" && <Progress value={job.progress} className="h-2 w-32" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Online Drivers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Online Drivers
            </CardTitle>
            <CardDescription>Currently active drivers and their status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {onlineDrivers.map((driver, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-xs font-medium">{driver.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{driver.name}</p>
                    <p className="text-xs text-muted-foreground">{driver.truck}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={driver.status === "driving" ? "default" : "secondary"} className="text-xs mb-1">
                    {driver.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {driver.location}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Company Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Company Performance
          </CardTitle>
          <CardDescription>Key performance indicators for your VTC</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                <span className="text-sm font-medium">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Driver Satisfaction</span>
                <span className="text-sm font-medium flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  {stats.averageRating || 4.7}
                </span>
              </div>
              <Progress value={(stats.averageRating || 4.7) * 20} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Fleet Utilization</span>
                <span className="text-sm font-medium">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
