"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

interface DatabaseErrorBannerProps {
  error?: string;
  onRetry?: () => void;
}

export function DatabaseErrorBanner({
  onRetry,
}: DatabaseErrorBannerProps) {
  return (
    <div className="bg-cream-200 border border-cream-300 rounded-2xl p-4 sm:p-5 my-4 max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-terracotta-50 text-terracotta-600 rounded-xl shrink-0 mt-0.5 sm:mt-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-serif font-bold text-charcoal-900 text-sm">
            We couldn't load recipes right now
          </h4>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Please refresh or try again in a moment.
          </p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-herb-500 text-white rounded-xl text-xs font-semibold hover:bg-herb-600 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Try Again
        </button>
      )}
    </div>
  );
}
