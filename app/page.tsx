"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Brain, Calendar, ShoppingCart, BarChart3, Bell } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  if (user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">🍽️ AI Meal Planner</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your meal planning with AI-powered personalized recommendations. Save time, eat better, and never
            wonder "what's for dinner?" again.
          </p>
          <div className="space-x-4">
            <Link href="/register">
              <Button size="lg" className="px-8 py-3">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>AI-Powered Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get personalized meal suggestions based on your dietary preferences, allergies, and nutrition goals
                using advanced AI algorithms.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Weekly Meal Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Plan your entire week with our interactive calendar. Visualize your meals and track your progress
                effortlessly.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <ShoppingCart className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Smart Grocery Lists</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate optimized grocery lists with pricing in your local currency. Never forget an ingredient again.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Nutrition Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor your nutritional intake with detailed breakdowns of calories, macros, and micronutrients.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Bell className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Smart Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get timely reminders for meal prep, cooking times, and grocery shopping to stay on track.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <ChefHat className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Custom Meal Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Add your own recipes and meals to create a personalized database that grows with your preferences.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">30%</div>
              <div className="text-gray-600">Improved Meal Prep Efficiency</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15%</div>
              <div className="text-gray-600">Better Meal Plan Adherence</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Supported Cuisines</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Meal Planning?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who have revolutionized their eating habits with AI.
          </p>
          <Link href="/register">
            <Button size="lg" className="px-12 py-4 text-lg">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
