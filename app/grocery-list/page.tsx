"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Home, Download, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface GroceryItem {
  id: string
  name: string
  category: string
  quantity: string
  price: number
  checked: boolean
  essential: boolean
}

const groceryCategories = [
  "Produce",
  "Meat & Seafood",
  "Dairy & Eggs",
  "Pantry",
  "Frozen",
  "Beverages",
  "Snacks",
  "Other",
]

export default function GroceryListPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Sample grocery items
    const sampleItems: GroceryItem[] = [
      {
        id: "1",
        name: "Greek Yogurt",
        category: "Dairy & Eggs",
        quantity: "2 containers",
        price: 6.99,
        checked: false,
        essential: true,
      },
      { id: "2", name: "Quinoa", category: "Pantry", quantity: "1 bag", price: 4.5, checked: false, essential: true },
      {
        id: "3",
        name: "Salmon Fillet",
        category: "Meat & Seafood",
        quantity: "1 lb",
        price: 12.99,
        checked: false,
        essential: true,
      },
      {
        id: "4",
        name: "Avocados",
        category: "Produce",
        quantity: "3 pieces",
        price: 3.99,
        checked: true,
        essential: false,
      },
      {
        id: "5",
        name: "Cherry Tomatoes",
        category: "Produce",
        quantity: "1 container",
        price: 2.99,
        checked: false,
        essential: false,
      },
      {
        id: "6",
        name: "Asparagus",
        category: "Produce",
        quantity: "1 bunch",
        price: 3.49,
        checked: false,
        essential: true,
      },
      {
        id: "7",
        name: "Coconut Milk",
        category: "Pantry",
        quantity: "2 cans",
        price: 3.98,
        checked: false,
        essential: true,
      },
      {
        id: "8",
        name: "Olive Oil",
        category: "Pantry",
        quantity: "1 bottle",
        price: 8.99,
        checked: true,
        essential: false,
      },
    ]
    setGroceryItems(sampleItems)
  }, [user, router])

  const toggleItemCheck = (id: string) => {
    setGroceryItems((items) => items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const removeItem = (id: string) => {
    setGroceryItems((items) => items.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "Item has been removed from your grocery list.",
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

  const filteredItems =
    selectedCategory === "All" ? groceryItems : groceryItems.filter((item) => item.category === selectedCategory)

  const totalPrice = groceryItems.reduce((sum, item) => sum + item.price, 0)
  const checkedItems = groceryItems.filter((item) => item.checked).length
  const completionPercentage = groceryItems.length > 0 ? Math.round((checkedItems / groceryItems.length) * 100) : 0

  const downloadList = () => {
    const listContent = groceryItems
      .map(
        (item) =>
          `${item.checked ? "✓" : "☐"} ${item.name} - ${item.quantity} (${getCurrencySymbol()}${item.price.toFixed(2)})`,
      )
      .join("\n")

    const blob = new Blob([listContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "grocery-list.txt"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "List downloaded",
      description: "Your grocery list has been downloaded as a text file.",
    })
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <ShoppingCart className="h-8 w-8 text-primary mr-3" />
              Grocery List
            </h1>
            <p className="text-gray-600 mt-2">
              Your smart shopping list with pricing in {user.preferences?.currency || "USD"}
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="outline" onClick={downloadList}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button onClick={() => router.push("/recommendations")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Items
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{groceryItems.length}</p>
                <p className="text-sm text-gray-600">Total Items</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{checkedItems}</p>
                <p className="text-sm text-gray-600">Items Collected</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{completionPercentage}%</p>
                <p className="text-sm text-gray-600">Completion</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {getCurrencySymbol()}
                  {totalPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Estimated Total</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Category Filter */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === "All" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory("All")}
                  >
                    All Items ({groceryItems.length})
                  </Button>
                  {groceryCategories.map((category) => {
                    const count = groceryItems.filter((item) => item.category === category).length
                    if (count === 0) return null
                    return (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="w-full justify-between"
                        onClick={() => setSelectedCategory(category)}
                      >
                        <span>{category}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grocery Items */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>{selectedCategory === "All" ? "All Items" : selectedCategory}</CardTitle>
                <CardDescription>
                  {filteredItems.length} items • {getCurrencySymbol()}
                  {filteredItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)} total
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        item.checked ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox checked={item.checked} onCheckedChange={() => toggleItemCheck(item.id)} />
                        <div className={item.checked ? "line-through text-gray-500" : ""}>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.quantity}</p>
                        </div>
                        {item.essential && (
                          <Badge variant="outline" className="text-xs">
                            Essential
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">
                          {getCurrencySymbol()}
                          {item.price.toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {filteredItems.length === 0 && (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No items in this category</h3>
                      <p className="text-gray-600 mb-4">Add some meals to your planner to generate grocery items</p>
                      <Button onClick={() => router.push("/planner")}>Go to Meal Planner</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
