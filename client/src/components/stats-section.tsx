interface Stats {
  totalItems: number;
  completedItems: number;
  progressPercentage: number;
  progressText: string;
}

interface StatsSectionProps {
  stats: Stats;
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="app-card p-4 mb-6">
      <h3 className="text-lg font-semibold text-app-text mb-3">Shopping Progress</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-app-neutral">Total Items</span>
          <span className="font-semibold text-app-text">{stats.totalItems}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-app-neutral">Completed</span>
          <span className="font-semibold text-app-accent">{stats.completedItems}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${stats.progressPercentage}%` }}
          />
        </div>
        <div className="text-center text-sm text-app-neutral">
          <span>{stats.progressText}</span>
        </div>
      </div>
    </div>
  );
}
