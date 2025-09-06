"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Monitor,
  Download,
  Settings,
  Play,
  Square,
  Gauge,
  Navigation,
  Package,
  Fuel,
  AlertTriangle,
} from "lucide-react"

export function WindowsClientSimulator() {
  const [isRunning, setIsRunning] = useState(false)
  const [telemetryData, setTelemetryData] = useState({
    speed: 85,
    rpm: 1450,
    gear: 8,
    fuel: 65,
    damage: 2.5,
    fatigue: 15.5,
    eta: "2h 30m",
    distance: 425,
    job: {
      cargo: "Electronics",
      destination: "Amsterdam",
      income: 2500,
    },
  })

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTelemetryData((prev) => ({
          ...prev,
          speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 10),
          rpm: Math.max(800, Math.min(2000, prev.rpm + (Math.random() - 0.5) * 100)),
          fuel: Math.max(0, prev.fuel - 0.1),
          distance: Math.max(0, prev.distance - 1),
        }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Windows Client Interface</h2>
        <p className="text-muted-foreground">Trucky++ Windows client for ETS2/ATS integration</p>
      </div>

      {/* Client Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Client Status
          </CardTitle>
          <CardDescription>Windows application connection and status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${isRunning ? "bg-green-500" : "bg-gray-500"}`} />
              <div>
                <p className="font-medium">Trucky++ Client v1.0.0</p>
                <p className="text-sm text-muted-foreground">
                  {isRunning ? "Connected to ETS2 • Sending telemetry" : "Disconnected"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={isRunning ? "destructive" : "default"}
                size="sm"
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? (
                  <>
                    <Square className="h-3 w-3 mr-1" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-3 w-3 mr-1" />
                Settings
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="text-muted-foreground">Game</p>
              <p className="font-medium">Euro Truck Simulator 2</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Driver</p>
              <p className="font-medium">RoadWarrior</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">VTC</p>
              <p className="font-medium">EEL</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overlay Preview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Game Overlay Preview</CardTitle>
            <CardDescription>Real-time overlay displayed in-game</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-black/90 text-white p-4 rounded-lg font-mono text-sm space-y-3">
              {/* Speedometer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  <span>Speed</span>
                </div>
                <span className="text-green-400 font-bold">{Math.round(telemetryData.speed)} km/h</span>
              </div>

              {/* RPM */}
              <div className="flex items-center justify-between">
                <span>RPM</span>
                <span className="text-blue-400">{telemetryData.rpm}</span>
              </div>

              {/* Gear */}
              <div className="flex items-center justify-between">
                <span>Gear</span>
                <span className="text-yellow-400">{telemetryData.gear}</span>
              </div>

              <Separator className="bg-gray-600" />

              {/* Fuel */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4" />
                    <span>Fuel</span>
                  </div>
                  <span className="text-orange-400">{Math.round(telemetryData.fuel)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div
                    className="bg-orange-400 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${telemetryData.fuel}%` }}
                  />
                </div>
              </div>

              {/* Damage */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Damage</span>
                </div>
                <span className="text-red-400">{telemetryData.damage}%</span>
              </div>

              <Separator className="bg-gray-600" />

              {/* Job Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-400">
                  <Package className="h-4 w-4" />
                  <span>Current Job</span>
                </div>
                <div className="pl-6 space-y-1 text-xs">
                  <div>Cargo: {telemetryData.job.cargo}</div>
                  <div>To: {telemetryData.job.destination}</div>
                  <div>Income: ${telemetryData.job.income}</div>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Navigation className="h-4 w-4" />
                  <span>Navigation</span>
                </div>
                <div className="pl-6 space-y-1 text-xs">
                  <div>ETA: {telemetryData.eta}</div>
                  <div>Distance: {telemetryData.distance} km</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Client Features</CardTitle>
            <CardDescription>Available functionality in the Windows client</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium">Real-time Telemetry</p>
                  <p className="text-sm text-muted-foreground">Live data from ETS2/ATS</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium">In-game Overlay</p>
                  <p className="text-sm text-muted-foreground">Customizable HUD display</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium">Job Integration</p>
                  <p className="text-sm text-muted-foreground">Automatic job tracking</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium">Anti-cheat Protection</p>
                  <p className="text-sm text-muted-foreground">Violation detection</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium">Discord Integration</p>
                  <p className="text-sm text-muted-foreground">Rich presence & notifications</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div>
                  <p className="font-medium">Voice Chat</p>
                  <p className="text-sm text-muted-foreground">Built-in VTC communication</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">System Requirements</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Windows 10/11 (64-bit)</p>
                <p>• .NET Framework 4.8+</p>
                <p>• Euro Truck Simulator 2 or American Truck Simulator</p>
                <p>• Internet connection for VTC features</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download Client
          </CardTitle>
          <CardDescription>Get the Trucky++ Windows client application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <p className="font-medium">Trucky++ Client v1.0.0</p>
              <p className="text-sm text-muted-foreground">Latest stable release • 25.4 MB</p>
            </div>
            <div className="flex gap-2">
              <Button className="bg-accent text-accent-foreground">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline">Release Notes</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium mb-2">Installation</p>
              <ol className="text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Download the installer</li>
                <li>Run as administrator</li>
                <li>Follow setup wizard</li>
                <li>Login with VTC credentials</li>
              </ol>
            </div>
            <div>
              <p className="font-medium mb-2">Configuration</p>
              <ol className="text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Configure overlay settings</li>
                <li>Set telemetry preferences</li>
                <li>Test game integration</li>
                <li>Join VTC channel</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
