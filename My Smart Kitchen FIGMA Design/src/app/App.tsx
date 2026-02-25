import { useState } from "react";
import { Cloud, Sparkles, Search } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { IngredientInput } from "./components/IngredientInput";
import { FilterSection } from "./components/FilterSection";
import { RecipeCard } from "./components/RecipeCard";

const CUISINES = [
  "Italian",
  "Mexican",
  "Chinese",
  "Indian",
  "Japanese",
  "Thai",
  "Mediterranean",
  "American",
];

const DIETARY_PREFERENCES = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Paleo",
  "Low-Carb",
  "Nut-Free",
];

// Mock recipe data
const MOCK_RECIPES = [
  {
    id: "1",
    title: "Creamy Tomato Pasta",
    description: "A rich and comforting pasta dish with a creamy tomato sauce",
    cuisine: "Italian",
    dietary: ["Vegetarian"],
    cookTime: "25 mins",
    servings: 4,
    image: "https://images.unsplash.com/photo-1529042355636-0f06afe127a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGl0YWxpYW4lMjBjdWlzaW5lJTIwZGlzaHxlbnwxfHx8fDE3NzE4MTYwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ingredients: ["pasta", "tomatoes", "cream", "garlic", "basil"],
    instructions: ["Boil pasta", "Make sauce", "Combine and serve"],
  },
  {
    id: "2",
    title: "Grilled Chicken Salad",
    description: "Fresh and healthy salad with perfectly grilled chicken breast",
    cuisine: "Mediterranean",
    dietary: ["Gluten-Free", "Low-Carb"],
    cookTime: "20 mins",
    servings: 2,
    image: "https://images.unsplash.com/photo-1605034298551-baacf17591d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwYm93bCUyMGhlYWx0aHl8ZW58MXx8fHwxNzcxNzQ5MDU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ingredients: ["chicken", "lettuce", "cucumber", "olive oil", "lemon"],
    instructions: ["Grill chicken", "Prepare salad", "Dress and toss"],
  },
  {
    id: "3",
    title: "Spicy Thai Curry",
    description: "Aromatic and spicy curry with coconut milk and fresh vegetables",
    cuisine: "Thai",
    dietary: ["Vegan", "Gluten-Free", "Dairy-Free"],
    cookTime: "30 mins",
    servings: 4,
    image: "https://images.unsplash.com/photo-1716801551616-c458ec2a9b92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwY3VycnklMjBjb2NvbnV0JTIwYXNpYW58ZW58MXx8fHwxNzcxODE2MDMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ingredients: ["coconut milk", "curry paste", "vegetables", "tofu", "rice"],
    instructions: ["Prepare curry paste", "Cook vegetables", "Add coconut milk and simmer"],
  },
];

export default function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]
    );
  };

  const toggleDietary = (dietary: string) => {
    setSelectedDietary((prev) =>
      prev.includes(dietary) ? prev.filter((d) => d !== dietary) : [...prev, dietary]
    );
  };

  const handleGenerateRecipes = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 1500);
  };

  const filteredRecipes = MOCK_RECIPES.filter((recipe) => {
    const cuisineMatch = selectedCuisines.length === 0 || selectedCuisines.includes(recipe.cuisine);
    const dietaryMatch =
      selectedDietary.length === 0 ||
      selectedDietary.every((diet) => recipe.dietary.includes(diet));
    return cuisineMatch && dietaryMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-30 animate-pulse" />
                <Cloud className="w-10 h-10 text-blue-500 relative" />
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  My Smart Kitchen
                </h1>
                <p className="text-sm text-muted-foreground">
                  Transform your ingredients into delicious recipes
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-blue-700 font-medium">
                🤖 AI Powered
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <Card className="border-2 shadow-xl bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm">
            <CardHeader className="space-y-2 pb-4">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                What's in your kitchen?
              </CardTitle>
              <CardDescription className="text-base">
                Add your available ingredients and let AI generate personalized recipes for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <IngredientInput ingredients={ingredients} onIngredientsChange={setIngredients} />

              <Separator className="my-6" />

              {/* Filters */}
              <div className="space-y-6">
                <FilterSection
                  title="Cuisine Preferences"
                  options={CUISINES}
                  selectedOptions={selectedCuisines}
                  onToggleOption={toggleCuisine}
                />

                <FilterSection
                  title="Dietary Preferences"
                  options={DIETARY_PREFERENCES}
                  selectedOptions={selectedDietary}
                  onToggleOption={toggleDietary}
                />
              </div>

              <Button
                onClick={handleGenerateRecipes}
                disabled={ingredients.length === 0 || isSearching}
                size="lg"
                className="w-full text-lg h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Generating Recipes with AI...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Generate Recipes with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          {showResults && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white rounded-xl shadow-md border-2 border-blue-100">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? "s" : ""} Found
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your ingredients and preferences
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">Google Gemini AI</span>
                </div>
              </div>

              {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center border-2 border-dashed">
                  <div className="text-muted-foreground space-y-3">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-xl font-semibold">No recipes found matching your filters</p>
                    <p className="text-sm">Try adjusting your cuisine or dietary preferences</p>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Empty State */}
          {!showResults && ingredients.length === 0 && (
            <Card className="p-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-dashed border-2 border-blue-200 shadow-lg">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-20 animate-pulse" />
                    <Cloud className="w-24 h-24 text-blue-400 opacity-60 relative" />
                    <Sparkles className="w-10 h-10 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-700">
                    Start by adding your ingredients
                  </h3>
                  <p className="text-base text-muted-foreground max-w-lg mx-auto">
                    Tell us what you have in your kitchen and we'll generate personalized recipes
                    using advanced AI technology
                  </p>
                </div>
                <div className="flex justify-center gap-8 pt-4">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🥗</div>
                    <p className="text-xs text-muted-foreground">Fresh Ideas</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <p className="text-xs text-muted-foreground">Instant Results</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎯</div>
                    <p className="text-xs text-muted-foreground">Perfect Match</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-gradient-to-br from-white to-blue-50/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 My Smart Kitchen. Recipe generation powered by Google Gemini.</p>
          <p className="mt-1 text-xs">Making cooking easier, one ingredient at a time 🍳</p>
        </div>
      </footer>
    </div>
  );
}