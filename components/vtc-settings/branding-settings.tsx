"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Palette, Eye, Monitor } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const brandingSettingsSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
  fontFamily: z.string(),
  overlayDefaults: z.object({
    opacity: z.number().min(0).max(100),
    draggableWindows: z.boolean(),
    defaultLayout: z.string(),
    showBranding: z.boolean(),
  }),
  customCSS: z.string().optional(),
})

type BrandingSettingsForm = z.infer<typeof brandingSettingsSchema>

const fontOptions = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "open-sans", label: "Open Sans" },
  { value: "lato", label: "Lato" },
  { value: "montserrat", label: "Montserrat" },
]

const layoutOptions = [
  { value: "minimal", label: "Minimal" },
  { value: "standard", label: "Standard" },
  { value: "detailed", label: "Detailed" },
  { value: "compact", label: "Compact" },
]

export function BrandingSettings() {
  const { toast } = useToast()
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("dark")

  const form = useForm<BrandingSettingsForm>({
    resolver: zodResolver(brandingSettingsSchema),
    defaultValues: {
      primaryColor: "#8B5CF6",
      secondaryColor: "#06B6D4",
      accentColor: "#F59E0B",
      fontFamily: "inter",
      overlayDefaults: {
        opacity: 85,
        draggableWindows: true,
        defaultLayout: "standard",
        showBranding: true,
      },
      customCSS: "",
    },
  })

  const onSubmit = async (data: BrandingSettingsForm) => {
    try {
      console.log("[v0] Updating branding settings:", data)
      toast({
        title: "Branding Settings Saved",
        description: "Your VTC's branding has been successfully updated.",
      })
    } catch (error) {
      console.error("[v0] Error updating branding:", error)
      toast({
        title: "Error",
        description: "Failed to save branding settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "Feature Not Implemented",
      description: `${featureName} is not yet available in preview.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Branding Settings</h2>
        <p className="text-muted-foreground">Customize your VTC's visual identity and overlay appearance.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Color Scheme */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Scheme
              </CardTitle>
              <CardDescription>Define your VTC's brand colors used across all interfaces.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Color</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input type="color" {...field} className="w-16 h-10 p-1 border rounded" />
                        </FormControl>
                        <Input {...field} placeholder="#8B5CF6" className="flex-1" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secondaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Color</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input type="color" {...field} className="w-16 h-10 p-1 border rounded" />
                        </FormControl>
                        <Input {...field} placeholder="#06B6D4" className="flex-1" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accentColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accent Color</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input type="color" {...field} className="w-16 h-10 p-1 border rounded" />
                        </FormControl>
                        <Input {...field} placeholder="#F59E0B" className="flex-1" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-2 pt-4">
                <Button
                  type="button"
                  variant={previewMode === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("light")}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Light Preview
                </Button>
                <Button
                  type="button"
                  variant={previewMode === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("dark")}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Dark Preview
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Choose fonts for your VTC's interface and overlays.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="fontFamily"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Font Family</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fontOptions.map(font => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Overlay Defaults */}
          <Card>
            <CardHeader>
              <CardTitle>Overlay Defaults</CardTitle>
              <CardDescription>Configure default settings for Windows client overlays.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="overlayDefaults.opacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Opacity ({field.value}%)</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={[field.value]}
                        onValueChange={value => field.onChange(value[0])}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>Controls the transparency of overlay windows.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="overlayDefaults.draggableWindows"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Draggable Windows</FormLabel>
                        <FormDescription>Allow users to move overlay windows around the screen.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="overlayDefaults.showBranding"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Show VTC Branding</FormLabel>
                        <FormDescription>Display VTC logo and colors in overlays.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="overlayDefaults.defaultLayout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Layout</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select default layout" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {layoutOptions.map(layout => (
                          <SelectItem key={layout.value} value={layout.value}>
                            {layout.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>The initial layout configuration for new overlay users.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Save Branding Settings
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
