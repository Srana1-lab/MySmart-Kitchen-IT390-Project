import { Clock, Users, ChefHat } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";

interface Recipe {
  id: string;
  title: string;
  description: string;
  cuisine: string;
  dietary: string[];
  cookTime: string;
  servings: number;
  image: string;
  ingredients: string[];
  instructions: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-200 group">
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge className="absolute top-4 right-4 bg-white text-blue-600 hover:bg-white shadow-lg font-semibold">
          {recipe.cuisine}
        </Badge>
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 text-white text-sm font-medium">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Users className="w-4 h-4" />
            <span>{recipe.servings}</span>
          </div>
        </div>
      </div>
      
      <CardHeader className="space-y-2">
        <CardTitle className="line-clamp-1 text-xl">{recipe.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-base">{recipe.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {recipe.dietary.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {recipe.dietary.map((diet) => (
              <Badge key={diet} variant="secondary" className="text-xs bg-green-100 text-green-700 hover:bg-green-200">
                {diet}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <ChefHat className="w-4 h-4 text-blue-600" />
            <span>Your ingredients:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {recipe.ingredients.slice(0, 4).map((ingredient, idx) => (
              <Badge key={idx} variant="outline" className="text-xs border-blue-200 text-blue-700">
                {ingredient}
              </Badge>
            ))}
            {recipe.ingredients.length > 4 && (
              <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 font-semibold">
                +{recipe.ingredients.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}