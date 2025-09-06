"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Truck, DollarSign, AlertTriangle } from "lucide-react"

const fleetEconomySchema = z.object({
  salaries: z.object({
    baseSalary: z.number().min(0),
    perKmRate: z.number().min(0),
    bonusMultiplier: z.number().min(0).max(5),
    experienceBonus: z.boolean(),
  }),
  penalties: z.object({
    speedingFine: z.number().min(0),
    crashPenalty: z.number().min(0),
    lateDeliveryPenalty: z.number().min(0),
    enableAutoPenalties: z.boolean(),
  }),
  expenses: z.object({
    fuelCostPerLiter: z.number().min(0),
    maintenanceCost: z.number().min(0),
    insuranceCost: z.number().min(0),
    tollCosts: z.boolean(),
  }),
  fleet: z.object({
    maxVehiclesPerDriver: z.number().min(1).max(20),
    requireLicenseForTruck: z.boolean(),
    allowPersonalVehicles: z.boolean(),
    maintenanceRequired: z.boolean(),
  }),
})

type FleetEconomyForm = z.infer<typeof fleetEconomySchema>

interface FleetEconomySettingsProps {
  vtcId: string
}

export function FleetEconomySettings({ vtcId }: FleetEconomySettingsProps) {
  const form = useForm<FleetEconomyForm>({
    resolver: zodResolver(fleetEconomySchema),
    defaultValues: {
      salaries: {
        baseSalary: 1000,
        perKmRate: 0.5,
        bonusMultiplier: 1.2,
        experienceBonus: true,
      },
      penalties: {
        speedingFine: 50,
        crashPenalty: 200,
        lateDeliveryPenalty: 100,
        enableAutoPenalties: true,
      },
      expenses: {
        fuelCostPerLiter: 1.2,
        maintenanceCost: 0.1,
        insuranceCost: 500,
        tollCosts: true,
      },
      fleet: {
        maxVehiclesPerDriver: 3,
        requireLicenseForTruck: true,
        allowPersonalVehicles: false,
        maintenanceRequired: true,
      },
    },
  })

  const onSubmit = async (data: FleetEconomyForm) => {
    try {
      console.log("[v0] Updating fleet & economy settings:", data)
    } catch (error) {
      console.error("[v0] Error updating fleet settings:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Fleet & Economy Settings</h2>
        <p className="text-muted-foreground">
          Configure salary structures, penalties, expenses, and fleet management rules.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Salary Structure */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Salary Structure
              </CardTitle>
              <CardDescription>Configure how drivers are compensated for their work.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="salaries.baseSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base Salary (Monthly)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>Fixed monthly salary for all drivers.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salaries.perKmRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Per KM Rate</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>Payment per kilometer driven.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="salaries.bonusMultiplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bonus Multiplier ({field.value}x)</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={5}
                        step={0.1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>Multiplier for perfect delivery bonuses.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaries.experienceBonus"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Experience Bonus</FormLabel>
                      <FormDescription>Increase pay based on driver experience level.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Penalties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Penalties & Fines
              </CardTitle>
              <CardDescription>Set penalties for traffic violations and poor performance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="penalties.speedingFine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speeding Fine</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="penalties.crashPenalty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crash Penalty</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="penalties.lateDeliveryPenalty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Late Delivery Penalty</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="penalties.enableAutoPenalties"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Auto-Apply Penalties</FormLabel>
                      <FormDescription>Automatically deduct penalties from driver salaries.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Fleet Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Fleet Management
              </CardTitle>
              <CardDescription>Configure vehicle assignment and management rules.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="fleet.maxVehiclesPerDriver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Vehicles per Driver ({field.value})</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={20}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>Maximum number of vehicles a driver can own.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fleet.requireLicenseForTruck"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">License Required</FormLabel>
                        <FormDescription>Require appropriate license for truck types.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fleet.allowPersonalVehicles"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Personal Vehicles</FormLabel>
                        <FormDescription>Allow drivers to use personal vehicles for jobs.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Save Fleet & Economy Settings
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
