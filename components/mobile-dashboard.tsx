"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, Users, MapPin, TrendingUp, AlertTriangle } from "lucide-react"

export function MobileDashboard() {
  return (
    <div className="space-y-4 p-4">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Active Drivers</p>
                <p className="text-xl font-bold text-white">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Active Jobs</p>
                <p className="text-xl font-bold text-white">18</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Fleet Size</p>
                <p className="text-xl font-bold text-white">45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Revenue</p>
                <p className="text-xl font-bold text-white">€45.2K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div>
                <p className="text-sm text-white">Job completed</p>
                <p className="text-xs text-gray-400">Berlin → Hamburg</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              2m ago
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div>
                <p className="text-sm text-white">Driver online</p>
                <p className="text-xs text-gray-400">TruckMaster_42</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              5m ago
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div>
                <p className="text-sm text-white">New application</p>
                <p className="text-xs text-gray-400">SpeedyDriver99</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              12m ago
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12 border-gray-700 text-white hover:bg-gray-800 bg-transparent">
            <MapPin className="h-4 w-4 mr-2" />
            New Job
          </Button>
          <Button variant="outline" className="h-12 border-gray-700 text-white hover:bg-gray-800 bg-transparent">
            <Users className="h-4 w-4 mr-2" />
            Manage Drivers
          </Button>
          <Button variant="outline" className="h-12 border-gray-700 text-white hover:bg-gray-800 bg-transparent">
            <Truck className="h-4 w-4 mr-2" />
            Fleet Status
          </Button>
          <Button variant="outline" className="h-12 border-gray-700 text-white hover:bg-gray-800 bg-transparent">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Alerts
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
