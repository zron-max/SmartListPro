import { type ShoppingItem } from "@shared/schema";
import { ShoppingItemComponent } from "./shopping-item";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Category {
  key: string;
  name: string;
  emoji: string;
}

interface CategorySectionProps {
  category: Category;
  items: ShoppingItem[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onToggleItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
  isLoading: boolean;
}

export function CategorySection({
  category,
  items,
  isCollapsed,
  onToggleCollapse,
  onToggleItem,
  onDeleteItem,
  isLoading,
}: CategorySectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-app-text flex items-center space-x-2">
          <span className="category-emoji">{category.emoji}</span>
          <span>{category.name}</span>
          <Badge 
            variant="secondary" 
            className="bg-app-secondary text-white text-xs px-2 py-1"
          >
            {items.length}
          </Badge>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="text-app-neutral hover:text-app-text transition-colors p-1"
          aria-label={isCollapsed ? 'Expand category' : 'Collapse category'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>
      
      {!isCollapsed && (
        <div className="space-y-2">
          {items.map((item) => (
            <ShoppingItemComponent
              key={item.id}
              item={item}
              onToggle={() => onToggleItem(item.id)}
              onDelete={() => onDeleteItem(item.id)}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
}
