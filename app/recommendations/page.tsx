"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, Clock, Users, Heart, Plus, Home, RefreshCw } from "lucide-react"

export default function RecommendationsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    generateRecommendations()
  }, [user, router])

  const generateRecommendations = async () => {
    setLoading(true)

    // Simulate AI recommendation generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockRecommendations = [
      {
        id: 1,
        name: "Mediterranean Quinoa Bowl",
        description: "A nutritious bowl with quinoa, chickpeas, cucumber, tomatoes, and tahini dressing",
        calories: 420,
        prepTime: 25,
        servings: 2,
        difficulty: "Easy",
        tags: ["Vegetarian", "High-Protein", "Mediterranean"],
        ingredients: ["Quinoa", "Chickpeas", "Cucumber", "Cherry tomatoes", "Red onion", "Tahini", "Lemon"],
        price: 8.5,
      },
      {
        id: 2,
        name: "Grilled Salmon with Asparagus",
        description: "Fresh salmon fillet grilled to perfection with roasted asparagus and lemon",
        calories: 380,
        prepTime: 20,
        servings: 1,
        difficulty: "Medium",
        tags: ["High-Protein", "Keto-Friendly", "Omega-3"],
        ingredients: ["Salmon fillet", "Asparagus", "Olive oil", "Lemon", "Garlic", "Herbs"],
        price: 12.75,
      },
      {
        id: 3,
        name: "Thai Coconut Curry",
        description: "Aromatic coconut curry with vegetables and your choice of protein",
        calories: 350,
        prepTime: 30,
        servings: 4,
        difficulty: "Medium",
        tags: ["Thai", "Coconut", "Spicy", "Dairy-Free"],
        ingredients: ["Coconut milk", "Red curry paste", "Bell peppers", "Bamboo shoots", "Thai basil"],
        price: 15.2,
      },
      {
        id: 4,
        name: "Avocado Toast Supreme",
        description: "Multigrain toast topped with smashed avocado, poached egg, and microgreens",
        calories: 290,
        prepTime: 15,
        servings: 1,
        difficulty: "Easy",
        tags: ["Breakfast", "Healthy Fats", "Quick"],
        ingredients: ["Multigrain bread", "Avocado", "Egg", "Microgreens", "Cherry tomatoes"],
        price: 6.25,
      },
    ]

    setRecommendations(mockRecommendations)
    setLoading(false)
  }

  const addToMealPlan = (meal: any) => {
    toast({
      title: "Added to meal plan!",
      description: `${meal.name} has been added to your weekly meal plan.`,
    })
  }

  const getCurrencySymbol = () => {
    const currency = user?.preferences?.currency || "USD"
    const symbols: { [key: string]: string } = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      CAD: "C$",
      AUD: "A$",
      INR: "₹",
      JPY: "¥",
    }
    return symbols[currency] || "$"
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Sparkles className="h-8 w-8 text-primary mr-3" />
              AI Meal Recommendations
            </h1>
            <p className="text-gray-600 mt-2">Personalized meal suggestions based on your preferences</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button onClick={generateRecommendations} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Generating..." : "New Recommendations"}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((meal) => (
              <Card key={meal.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{meal.name}</CardTitle>
                      <CardDescription className="mt-2">{meal.description}</CardDescription>
                    </div>
                    <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {meal.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-500" />
                        {meal.prepTime}m
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-500" />
                        {meal.servings} serving{meal.servings > 1 ? "s" : ""}
                      </div>
                      <div className="font-medium">{meal.calories} cal</div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-primary">
                        {getCurrencySymbol()}
                        {meal.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">{meal.difficulty}</div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Ingredients:</p>
                      <p className="text-xs text-gray-600">{meal.ingredients.join(", ")}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1" onClick={() => addToMealPlan(meal)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Plan
                      </Button>
                      <Button variant="outline" size="sm">
                        View Recipe
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && recommendations.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations yet</h3>
            <p className="text-gray-600 mb-4">Click "New Recommendations" to get personalized meal suggestions</p>
            <Button onClick={generateRecommendations}>Generate Recommendations</Button>
          </div>
        )}
      </div>
    </div>
  )
}
