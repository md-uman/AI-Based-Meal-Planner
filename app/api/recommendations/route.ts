import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { preferences } = await request.json()

    const prompt = `Generate 4 personalized meal recommendations based on these preferences:
    - Dietary Type: ${preferences.dietaryType}
    - Calorie Goal: ${preferences.calorieGoal}
    - Allergies: ${preferences.allergies.join(", ") || "None"}
    - Cuisine Preferences: ${preferences.cuisinePreferences.join(", ") || "Any"}
    - Country: ${preferences.country}

    For each meal, provide:
    1. Name
    2. Description (1-2 sentences)
    3. Estimated calories
    4. Prep time in minutes
    5. Number of servings
    6. Difficulty level (Easy/Medium/Hard)
    7. 3-5 relevant tags
    8. Main ingredients list
    9. Estimated cost in local currency

    Format as JSON array with these exact fields: name, description, calories, prepTime, servings, difficulty, tags, ingredients, price`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      temperature: 0.7,
    })

    // Parse the AI response and return structured data
    let recommendations
    try {
      recommendations = JSON.parse(text)
    } catch {
      // Fallback to mock data if parsing fails
      recommendations = [
        {
          name: "AI-Generated Healthy Bowl",
          description: "A nutritious bowl tailored to your preferences",
          calories: 400,
          prepTime: 25,
          servings: 2,
          difficulty: "Easy",
          tags: ["Healthy", "Balanced", "AI-Recommended"],
          ingredients: ["Mixed vegetables", "Protein source", "Whole grains"],
          price: 10.0,
        },
      ]
    }

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
