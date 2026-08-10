import { SearchX, RefreshCw } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
}

export function EmptyState({
  title = "No matching recipes found",
  description = "Try selecting different ingredients, removing filters, or searching our popular recipes.",
  onReset,
  resetLabel = "Reset Ingredients",
}: EmptyStateProps) {
  return (
    <div className="bg-white rounded-3xl p-10 border border-cream-300 shadow-card text-center max-w-md mx-auto space-y-4 my-8">
      <div className="w-16 h-16 rounded-full bg-cream-200 text-forest-600 flex items-center justify-center mx-auto">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="font-serif font-bold text-xl text-charcoal-900">{title}</h3>
      <p className="text-sm text-charcoal-500 leading-relaxed">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-500 text-white text-sm font-semibold hover:bg-forest-600 transition-colors shadow-sm"
        >
          <RefreshCw className="w-4 h-4" /> {resetLabel}
        </button>
      )}
    </div>
  );
}
