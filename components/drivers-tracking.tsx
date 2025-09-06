"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Users, MapPin, Truck, Clock, Star, Navigation, Fuel, AlertTriangle, CheckCircle, Circle } from "lucide-react"

export function DriversTracking() {
  const drivers = []

  const getStatusColor = (status: string) => {
    switch (status) {
      case "driving":
        return "bg-green-500"
      case "resting":
        return "bg-yellow-500"
      case "loading":
        return "bg-blue-500"
      case "unloading":
        return "bg-purple-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "driving":
        return <Navigation className="h-3 w-3" />
      case "resting":
        return <Clock className="h-3 w-3" />
      case "loading":
        return <Circle className="h-3 w-3" />
      case "unloading":
        return <CheckCircle className="h-3 w-3" />
      case "offline":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <Circle className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Driver Tracking</h2>
          <p className="text-muted-foreground">Monitor your drivers in real-time</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Manage Drivers
          </Button>
        </div>
      </div>

      {/* Driver Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Online</p>
                <p className="text-2xl font-bold text-green-500">0</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <Circle className="h-4 w-4 text-green-500 fill-current" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Driving</p>
                <p className="text-2xl font-bold text-blue-500">0</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Navigation className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resting</p>
                <p className="text-2xl font-bold text-yellow-500">0</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Offline</p>
                <p className="text-2xl font-bold text-gray-500">0</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-500/20 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Driver Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {drivers.length === 0 ? (
          <div className="md:col-span-2 text-center py-12">
            <p className="text-lg font-medium text-muted-foreground">No drivers found.</p>
            <p className="text-sm text-muted-foreground">Add new drivers to begin tracking.</p>
          </div>
        ) : (
          drivers.map((driver) => (
            <Card key={driver.id} className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={driver.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{driver.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{driver.name}</CardTitle>
                      <CardDescription>ID: {driver.employeeId}</CardDescription>
                    </div>
                  </div>

                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(driver.status)}`} />
                    {getStatusIcon(driver.status)}
                    {driver.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Current Job */}
                {driver.currentJob ? (
                  <div className="p-3 rounded-lg bg-accent/50 border border-accent">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{driver.currentJob.title}</p>
                      <Badge variant="secondary" className="text-xs">
                        ETA: {driver.currentJob.eta}
                      </Badge>
                    </div>
                    <Progress value={driver.currentJob.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Progress: {driver.currentJob.progress}%</p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg border border-dashed border-border">
                    <p className="text-sm text-muted-foreground text-center">No active job</p>
                  </div>
                )}

                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{driver.location.current}</p>
                    {driver.location.route && <p className="text-xs text-muted-foreground">{driver.location.route}</p>}
                  </div>
                </div>

                {/* Truck Info */}
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{driver.truck.model}</p>
                    <p className="text-xs text-muted-foreground">{driver.truck.licensePlate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Fuel className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs">{driver.truck.fuel}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Condition: {driver.truck.condition}%</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                  <div className="text-center">
                    <p className="text-lg font-bold">{driver.stats.totalJobs}</p>
                    <p className="text-xs text-muted-foreground">Total Jobs</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span className="text-lg font-bold">{driver.stats.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
