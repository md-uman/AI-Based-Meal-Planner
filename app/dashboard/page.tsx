"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar, ChefHat, ShoppingCart, BarChart3, Plus, Sparkles, Home } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [todaysMeals] = useState([
    { name: "Greek Yogurt Bowl", type: "Breakfast", calories: 320 },
    { name: "Quinoa Salad", type: "Lunch", calories: 450 },
    { name: "Grilled Salmon", type: "Dinner", calories: 380 },
  ])

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  const totalCalories = todaysMeals.reduce((sum, meal) => sum + meal.calories, 0)
  const calorieGoal = user.preferences?.calorieGoal || 2000
  const calorieProgress = (totalCalories / calorieGoal) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}! 👋</h1>
              <p className="text-gray-600 mt-2">Here's your personalized meal planning dashboard</p>
            </div>
            <Button onClick={() => router.push("/")}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Calories</p>
                  <p className="text-2xl font-bold">{totalCalories}</p>
                  <p className="text-xs text-gray-500">of {calorieGoal} goal</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <Progress value={calorieProgress} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Meals Planned</p>
                  <p className="text-2xl font-bold">21</p>
                  <p className="text-xs text-gray-500">this week</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Grocery Items</p>
                  <p className="text-2xl font-bold">34</p>
                  <p className="text-xs text-gray-500">in your list</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Streak</p>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-xs text-gray-500">days consistent</p>
                </div>
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Meals */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Today's Meals</CardTitle>
                    <CardDescription>Your planned meals for today</CardDescription>
                  </div>
                  <Link href="/recommendations">
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Meal
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysMeals.map((meal, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <ChefHat className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{meal.name}</p>
                          <p className="text-sm text-gray-600">{meal.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{meal.calories} cal</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with these actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/recommendations">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get AI Recommendations
                  </Button>
                </Link>
                <Link href="/planner">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Plan This Week
                  </Button>
                </Link>
                <Link href="/grocery-list">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Grocery List
                  </Button>
                </Link>
                <Link href="/tracker">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Track Progress
                  </Button>
                </Link>
                {!user.preferences && (
                  <Link href="/preferences">
                    <Button className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Set Preferences
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Meal Plan Adherence</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Nutrition Goals</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Grocery Efficiency</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
