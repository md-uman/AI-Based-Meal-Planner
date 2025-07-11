"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Home, TrendingUp, Target, Calendar } from "lucide-react"

export default function TrackerPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedWeek, setSelectedWeek] = useState("This Week")

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
  }, [user, router])

  if (!user) return null

  const weeklyData = {
    planned: 18,
    consumed: 15,
    calories: {
      target: (user.preferences?.calorieGoal || 2000) * 7,
      actual: 13650,
    },
    macros: {
      protein: { target: 140, actual: 125 },
      carbs: { target: 250, actual: 230 },
      fat: { target: 80, actual: 75 },
    },
    adherence: 83,
    streak: 7,
  }

  const dailyBreakdown = [
    { day: "Mon", planned: 3, consumed: 3, calories: 1950 },
    { day: "Tue", planned: 3, consumed: 2, calories: 1800 },
    { day: "Wed", planned: 2, consumed: 2, calories: 2100 },
    { day: "Thu", planned: 3, consumed: 3, calories: 1950 },
    { day: "Fri", planned: 3, consumed: 2, calories: 1850 },
    { day: "Sat", planned: 2, consumed: 2, calories: 2000 },
    { day: "Sun", planned: 2, consumed: 1, calories: 2000 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="h-8 w-8 text-primary mr-3" />
              Meal Tracker
            </h1>
            <p className="text-gray-600 mt-2">Track your meal plan adherence and nutrition goals</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              {selectedWeek}
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Adherence Rate</p>
                  <p className="text-2xl font-bold text-primary">{weeklyData.adherence}%</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
              <Progress value={weeklyData.adherence} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Meals Consumed</p>
                  <p className="text-2xl font-bold">
                    {weeklyData.consumed}/{weeklyData.planned}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <Progress value={(weeklyData.consumed / weeklyData.planned) * 100} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Weekly Calories</p>
                  <p className="text-2xl font-bold">{weeklyData.calories.actual.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">of {weeklyData.calories.target.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
              <Progress value={(weeklyData.calories.actual / weeklyData.calories.target) * 100} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-2xl font-bold text-orange-500">{weeklyData.streak}</p>
                  <p className="text-xs text-gray-500">days consistent</p>
                </div>
                <div className="text-2xl">🔥</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Daily Breakdown */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Breakdown</CardTitle>
                <CardDescription>Planned vs consumed meals this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyBreakdown.map((day, index) => (
                    <div key={day.day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 text-center">
                          <p className="font-medium">{day.day}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge variant={day.consumed === day.planned ? "default" : "secondary"}>
                            {day.consumed}/{day.planned} meals
                          </Badge>
                          <Badge variant="outline">{day.calories} cal</Badge>
                        </div>
                      </div>
                      <div className="w-24">
                        <Progress value={(day.consumed / day.planned) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nutrition Breakdown */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Goals</CardTitle>
                <CardDescription>Weekly macro targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Protein</span>
                    <span>
                      {weeklyData.macros.protein.actual}g / {weeklyData.macros.protein.target}g
                    </span>
                  </div>
                  <Progress
                    value={(weeklyData.macros.protein.actual / weeklyData.macros.protein.target) * 100}
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Carbohydrates</span>
                    <span>
                      {weeklyData.macros.carbs.actual}g / {weeklyData.macros.carbs.target}g
                    </span>
                  </div>
                  <Progress
                    value={(weeklyData.macros.carbs.actual / weeklyData.macros.carbs.target) * 100}
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Fat</span>
                    <span>
                      {weeklyData.macros.fat.actual}g / {weeklyData.macros.fat.target}g
                    </span>
                  </div>
                  <Progress
                    value={(weeklyData.macros.fat.actual / weeklyData.macros.fat.target) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <p className="font-medium text-green-800">Goal Achiever</p>
                      <p className="text-sm text-green-600">Hit 80%+ adherence</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl">🔥</div>
                    <div>
                      <p className="font-medium text-orange-800">Week Warrior</p>
                      <p className="text-sm text-orange-600">7-day consistency streak</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl">📊</div>
                    <div>
                      <p className="font-medium text-blue-800">Macro Master</p>
                      <p className="text-sm text-blue-600">Balanced nutrition week</p>
                    </div>
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
