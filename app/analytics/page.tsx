import { AnalyticsMonitoring } from "@/components/analytics-monitoring"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto p-6">
        <AnalyticsMonitoring vtcId="vtc_123" />
      </div>
    </div>
  )
}
