import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { CheckCircle2 } from "lucide-react";

interface FilterSectionProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onToggleOption: (option: string) => void;
}

export function FilterSection({ title, options, selectedOptions, onToggleOption }: FilterSectionProps) {
  return (
    <div className="space-y-3">
      <Label className="text-lg font-semibold text-gray-900">{title}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option);
          return (
            <Badge
              key={option}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2.5 text-sm transition-all hover:scale-105 ${
                isSelected
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                  : "hover:border-blue-400 hover:bg-blue-50"
              }`}
              onClick={() => onToggleOption(option)}
            >
              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />}
              {option}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}