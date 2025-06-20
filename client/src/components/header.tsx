import { ShoppingCart, Cloud, CloudOff, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  syncStatus: 'synced' | 'syncing' | 'offline';
}

export function Header({ syncStatus }: HeaderProps) {
  const getSyncIcon = () => {
    switch (syncStatus) {
      case 'synced':
        return <Cloud className="w-4 h-4" />;
      case 'syncing':
        return <Cloud className="w-4 h-4 animate-pulse" />;
      case 'offline':
        return <CloudOff className="w-4 h-4" />;
    }
  };

  const getSyncText = () => {
    switch (syncStatus) {
      case 'synced':
        return 'Synced';
      case 'syncing':
        return 'Syncing...';
      case 'offline':
        return 'Offline';
    }
  };

  const getSyncColor = () => {
    switch (syncStatus) {
      case 'synced':
        return 'text-app-accent';
      case 'syncing':
        return 'text-app-secondary';
      case 'offline':
        return 'text-app-neutral';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-app-accent rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-app-text">ShopSmart</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 ${getSyncColor()}`}>
              {getSyncIcon()}
              <span className="text-xs font-medium">{getSyncText()}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="p-2 rounded-full hover:bg-gray-50 transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4 text-app-neutral" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
