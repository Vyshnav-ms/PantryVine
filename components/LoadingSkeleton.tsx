export function RecipeCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-cream-300 shadow-card animate-pulse flex flex-col h-80">
      <div className="h-48 bg-cream-200 w-full" />
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-5 bg-cream-300 rounded-md w-3/4" />
          <div className="h-3 bg-cream-200 rounded-md w-full" />
          <div className="h-3 bg-cream-200 rounded-md w-2/3" />
        </div>
        <div className="pt-3 border-t border-cream-200 flex justify-between">
          <div className="h-4 bg-cream-200 rounded w-20" />
          <div className="h-4 bg-cream-200 rounded w-12" />
        </div>
      </div>
    </div>
  );
}

export function RecipeGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  );
}
