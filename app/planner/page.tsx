"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Home, ChefHat, Clock } from "lucide-react"

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"]

export default function PlannerPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [mealPlan, setMealPlan] = useState<any>({})

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Initialize with some sample meals
    const samplePlan = {
      Monday: {
        Breakfast: { name: "Greek Yogurt Bowl", calories: 320, time: "8:00 AM" },
        Lunch: { name: "Quinoa Salad", calories: 450, time: "12:30 PM" },
        Dinner: { name: "Grilled Salmon", calories: 380, time: "7:00 PM" },
      },
      Tuesday: {
        Breakfast: { name: "Avocado Toast", calories: 290, time: "8:00 AM" },
        Lunch: { name: "Thai Curry", calories: 350, time: "12:30 PM" },
      },
      Wednesday: {
        Breakfast: { name: "Smoothie Bowl", calories: 280, time: "8:00 AM" },
        Dinner: { name: "Pasta Primavera", calories: 420, time: "7:00 PM" },
      },
    }
    setMealPlan(samplePlan)
  }, [user, router])

  const addMealSlot = (day: string, mealType: string) => {
    // In a real app, this would open a meal selection modal
    router.push("/recommendations")
  }

  const getDayCalories = (day: string) => {
    const dayMeals = mealPlan[day] || {}
    return Object.values(dayMeals).reduce((total: number, meal: any) => total + (meal?.calories || 0), 0)
  }

  const getWeeklyStats = () => {
    let totalMeals = 0
    let totalCalories = 0

    daysOfWeek.forEach((day) => {
      const dayMeals = mealPlan[day] || {}
      totalMeals += Object.keys(dayMeals).length
      totalCalories += getDayCalories(day)
    })

    return { totalMeals, totalCalories, avgCalories: Math.round(totalCalories / 7) }
  }

  if (!user) return null

  const stats = getWeeklyStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Calendar className="h-8 w-8 text-primary mr-3" />
              Weekly Meal Planner
            </h1>
            <p className="text-gray-600 mt-2">Plan and organize your meals for the week</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button onClick={() => router.push("/recommendations")}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Meal
            </Button>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{stats.totalMeals}</p>
                <p className="text-sm text-gray-600">Meals Planned</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{stats.avgCalories}</p>
                <p className="text-sm text-gray-600">Avg Daily Calories</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{Math.round((stats.totalMeals / 28) * 100)}%</p>
                <p className="text-sm text-gray-600">Week Completion</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Day Selector */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {daysOfWeek.map((day) => (
                    <Button
                      key={day}
                      variant={selectedDay === day ? "default" : "outline"}
                      className="w-full justify-between"
                      onClick={() => setSelectedDay(day)}
                    >
                      <span>{day}</span>
                      <Badge variant="secondary" className="ml-2">
                        {getDayCalories(day)}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Meal Plan for Selected Day */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{selectedDay} Meal Plan</CardTitle>
                    <CardDescription>{getDayCalories(selectedDay)} calories planned</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => addMealSlot(selectedDay, "Breakfast")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Meal
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {mealTypes.map((mealType) => (
                    <div key={mealType} className="space-y-3">
                      <h3 className="font-semibold text-lg text-gray-800">{mealType}</h3>
                      {mealPlan[selectedDay]?.[mealType] ? (
                        <Card className="bg-green-50 border-green-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <ChefHat className="h-5 w-5 text-green-600" />
                                <div>
                                  <p className="font-medium text-green-800">{mealPlan[selectedDay][mealType].name}</p>
                                  <div className="flex items-center space-x-2 text-sm text-green-600">
                                    <Clock className="h-3 w-3" />
                                    <span>{mealPlan[selectedDay][mealType].time}</span>
                                  </div>
                                </div>
                              </div>
                              <Badge variant="secondary">{mealPlan[selectedDay][mealType].calories} cal</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
                          <CardContent className="p-6">
                            <div className="text-center">
                              <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-500 mb-3">No {mealType.toLowerCase()} planned</p>
                              <Button variant="outline" size="sm" onClick={() => addMealSlot(selectedDay, mealType)}>
                                Add {mealType}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
