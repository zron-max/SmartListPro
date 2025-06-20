import { type ShoppingItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShoppingItemProps {
  item: ShoppingItem;
  onToggle: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

export function ShoppingItemComponent({ item, onToggle, onDelete, isLoading }: ShoppingItemProps) {
  return (
    <div className="app-card p-4 flex items-center space-x-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        disabled={isLoading}
        className={cn(
          "checkbox-button touch-friendly p-0",
          item.completed ? "checked" : "unchecked"
        )}
        aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {item.completed && <Check className="w-3 h-3 text-white" />}
      </Button>
      
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 
            className={cn(
              "font-medium",
              item.completed
                ? "text-app-neutral line-through"
                : "text-app-text"
            )}
          >
            {item.name}
          </h4>
          <span className="text-sm text-app-neutral ml-2">
            {item.quantity}
          </span>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        disabled={isLoading}
        className="text-app-neutral hover:text-red-500 transition-colors p-2 touch-friendly"
        aria-label="Delete item"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
