import { useState } from "react";
import { X, Plus, ChefHat } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

export function IngredientInput({ ingredients, onIngredientsChange }: IngredientInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      onIngredientsChange([...ingredients, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    onIngredientsChange(ingredients.filter((i) => i !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <ChefHat className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Add an ingredient (e.g., chicken, tomatoes)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 h-12 border-2 focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>
        <Button 
          onClick={addIngredient} 
          disabled={!inputValue.trim()}
          size="lg"
          className="h-12 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
      
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-100">
          {ingredients.map((ingredient) => (
            <Badge key={ingredient} variant="secondary" className="text-sm px-4 py-2 bg-white hover:bg-gray-50 transition-colors shadow-sm">
              {ingredient}
              <button
                onClick={() => removeIngredient(ingredient)}
                className="ml-2 hover:bg-red-100 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3 text-red-500" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}