"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Home, Save } from "lucide-react"

const dietaryTypes = [
  "Standard",
  "Vegetarian",
  "Vegan",
  "Keto",
  "Paleo",
  "Mediterranean",
  "Low-Carb",
  "High-Protein",
  "Gluten-Free",
  "Dairy-Free",
]

const cuisineTypes = [
  "Italian",
  "Mexican",
  "Chinese",
  "Indian",
  "Japanese",
  "Thai",
  "Mediterranean",
  "American",
  "French",
  "Korean",
  "Middle Eastern",
]

const commonAllergies = ["Nuts", "Shellfish", "Dairy", "Eggs", "Soy", "Gluten", "Fish", "Sesame"]

const countries = [
  { code: "US", name: "United States", currency: "USD" },
  { code: "CA", name: "Canada", currency: "CAD" },
  { code: "GB", name: "United Kingdom", currency: "GBP" },
  { code: "EU", name: "European Union", currency: "EUR" },
  { code: "AU", name: "Australia", currency: "AUD" },
  { code: "IN", name: "India", currency: "INR" },
  { code: "JP", name: "Japan", currency: "JPY" },
]

export default function PreferencesPage() {
  const { user, updatePreferences } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [dietaryType, setDietaryType] = useState("Standard")
  const [calorieGoal, setCalorieGoal] = useState(2000)
  const [allergies, setAllergies] = useState<string[]>([])
  const [cuisinePreferences, setCuisinePreferences] = useState<string[]>([])
  const [country, setCountry] = useState("US")
  const [currency, setCurrency] = useState("USD")

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.preferences) {
      setDietaryType(user.preferences.dietaryType)
      setCalorieGoal(user.preferences.calorieGoal)
      setAllergies(user.preferences.allergies)
      setCuisinePreferences(user.preferences.cuisinePreferences)
      setCountry(user.preferences.country)
      setCurrency(user.preferences.currency)
    }
  }, [user, router])

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    if (checked) {
      setAllergies([...allergies, allergy])
    } else {
      setAllergies(allergies.filter((a) => a !== allergy))
    }
  }

  const handleCuisineChange = (cuisine: string, checked: boolean) => {
    if (checked) {
      setCuisinePreferences([...cuisinePreferences, cuisine])
    } else {
      setCuisinePreferences(cuisinePreferences.filter((c) => c !== cuisine))
    }
  }

  const handleCountryChange = (countryCode: string) => {
    const selectedCountry = countries.find((c) => c.code === countryCode)
    if (selectedCountry) {
      setCountry(countryCode)
      setCurrency(selectedCountry.currency)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const preferences = {
      dietaryType,
      calorieGoal,
      allergies,
      cuisinePreferences,
      country,
      currency,
    }

    updatePreferences(preferences)

    toast({
      title: "Preferences saved!",
      description: "Your meal preferences have been updated successfully.",
    })

    router.push("/dashboard")
  }

  const handleHome = () => {
    router.push("/dashboard")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Meal Preferences</h1>
            <Button variant="outline" onClick={handleHome}>
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personalize Your Experience</CardTitle>
              <CardDescription>
                Tell us about your dietary preferences to get personalized meal recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Dietary Type</Label>
                    <Select value={dietaryType} onValueChange={setDietaryType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dietaryTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="calories">Daily Calorie Goal</Label>
                    <Input
                      id="calories"
                      type="number"
                      value={calorieGoal}
                      onChange={(e) => setCalorieGoal(Number(e.target.value))}
                      min="1000"
                      max="5000"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select value={country} onValueChange={handleCountryChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Input value={currency} disabled className="bg-gray-100" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Allergies & Restrictions</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {commonAllergies.map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-2">
                        <Checkbox
                          id={allergy}
                          checked={allergies.includes(allergy)}
                          onCheckedChange={(checked) => handleAllergyChange(allergy, checked as boolean)}
                        />
                        <Label htmlFor={allergy} className="text-sm">
                          {allergy}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Preferred Cuisines</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {cuisineTypes.map((cuisine) => (
                      <div key={cuisine} className="flex items-center space-x-2">
                        <Checkbox
                          id={cuisine}
                          checked={cuisinePreferences.includes(cuisine)}
                          onCheckedChange={(checked) => handleCuisineChange(cuisine, checked as boolean)}
                        />
                        <Label htmlFor={cuisine} className="text-sm">
                          {cuisine}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                  <Button type="button" variant="outline" onClick={handleHome}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
