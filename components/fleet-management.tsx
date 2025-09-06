"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Truck, Fuel, Wrench, MapPin, Calendar, Plus, Settings, CheckCircle } from "lucide-react"

export function FleetManagement() {
  const trucks = [
    {
      id: "1",
      brand: "Scania",
      model: "R 730",
      licensePlate: "EEL-001-DE",
      assignedTo: "RoadWarrior",
      status: "active",
      location: "Hannover, Germany",
      mileage: 125000,
      condition: 95,
      fuel: 78,
      lastMaintenance: "2024-11-15",
      nextMaintenance: "2024-12-15",
      specs: {
        engine: "DC16 V8",
        horsepower: 730,
        transmission: "Opticruise",
      },
    },
    {
      id: "2",
      brand: "Volvo",
      model: "FH16",
      licensePlate: "EEL-002-AT",
      assignedTo: "SpeedDemon",
      status: "maintenance",
      location: "Vienna Service Center",
      mileage: 98000,
      condition: 88,
      fuel: 45,
      lastMaintenance: "2024-12-08",
      nextMaintenance: "2025-01-08",
      specs: {
        engine: "D16K",
        horsepower: 700,
        transmission: "I-Shift",
      },
    },
    {
      id: "3",
      brand: "MAN",
      model: "TGX",
      licensePlate: "EEL-003-DE",
      assignedTo: "TruckMaster",
      status: "active",
      location: "Munich Depot",
      mileage: 156000,
      condition: 91,
      fuel: 92,
      lastMaintenance: "2024-10-20",
      nextMaintenance: "2024-12-20",
      specs: {
        engine: "D38",
        horsepower: 640,
        transmission: "TipMatic",
      },
    },
    {
      id: "4",
      brand: "Mercedes",
      model: "Actros",
      licensePlate: "EEL-004-DE",
      assignedTo: null,
      status: "available",
      location: "Frankfurt Depot",
      mileage: 89000,
      condition: 85,
      fuel: 67,
      lastMaintenance: "2024-11-01",
      nextMaintenance: "2025-01-01",
      specs: {
        engine: "OM471",
        horsepower: 625,
        transmission: "PowerShift",
      },
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "maintenance":
        return "bg-yellow-500"
      case "available":
        return "bg-blue-500"
      case "inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getConditionColor = (condition: number) => {
    if (condition >= 90) return "text-green-500"
    if (condition >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Fleet Management</h2>
          <p className="text-muted-foreground">Monitor and manage your truck fleet</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Fleet Settings
          </Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Truck
          </Button>
        </div>
      </div>

      {/* Fleet Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Trucks</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <Truck className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-500">14</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold text-yellow-500">2</p>
              </div>
              <Wrench className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-blue-500">2</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Truck className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Truck Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {trucks.map((truck) => (
          <Card key={truck.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    {truck.brand} {truck.model}
                  </CardTitle>
                  <CardDescription>{truck.licensePlate}</CardDescription>
                </div>

                <Badge variant="outline" className="flex items-center gap-1">
                  <div className={`h-2 w-2 rounded-full ${getStatusColor(truck.status)}`} />
                  {truck.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Assignment */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Assigned to:</span>
                {truck.assignedTo ? (
                  <Badge variant="secondary">{truck.assignedTo}</Badge>
                ) : (
                  <Badge variant="outline">Unassigned</Badge>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{truck.location}</span>
              </div>

              {/* Condition & Fuel */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Condition</span>
                    <span className={`text-sm font-medium ${getConditionColor(truck.condition)}`}>
                      {truck.condition}%
                    </span>
                  </div>
                  <Progress value={truck.condition} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Fuel className="h-3 w-3" />
                      Fuel
                    </span>
                    <span className="text-sm font-medium">{truck.fuel}%</span>
                  </div>
                  <Progress value={truck.fuel} className="h-2" />
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-muted-foreground">Engine</p>
                  <p className="font-medium">{truck.specs.engine}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Power</p>
                  <p className="font-medium">{truck.specs.horsepower} HP</p>
                </div>
              </div>

              {/* Maintenance */}
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Next Maintenance</span>
                  </div>
                  <span className="text-sm font-medium">{new Date(truck.nextMaintenance).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Mileage: {truck.mileage.toLocaleString()} km</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Schedule Service
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
