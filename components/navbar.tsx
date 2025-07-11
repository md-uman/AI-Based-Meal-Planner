"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Home, LogOut, Settings, Calendar, ShoppingCart, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleHome = () => {
    router.push("/dashboard")
  }

  if (!user) return null

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-xl font-bold text-primary">
              🍽️ AI Meal Planner
            </Link>
            <Button variant="ghost" size="sm" onClick={handleHome}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Link href="/planner">
              <Button variant="ghost" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Planner
              </Button>
            </Link>
            <Link href="/grocery-list">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Grocery
              </Button>
            </Link>
            <Link href="/tracker">
              <Button variant="ghost" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Tracker
              </Button>
            </Link>
            <Link href="/preferences">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
