import { MobileDashboard } from "@/components/mobile-dashboard"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function MobilePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Header */}
      <header className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">VTC Tracker</h1>
            <p className="text-sm text-gray-400">TransEuro Logistics</p>
          </div>
          <MobileNavigation />
        </div>
      </header>

      {/* Mobile Content */}
      <main>
        <MobileDashboard />
      </main>
    </div>
  )
}
