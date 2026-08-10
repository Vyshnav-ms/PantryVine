"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

interface NodeItem {
  name: string;
  type: "recipe" | "ingredient" | "cuisine" | "substitution";
}

interface GraphMiniViewProps {
  centerNode: string;
  centerType?: "recipe" | "ingredient";
  connectedItems?: NodeItem[];
}

export function GraphMiniView({
  centerNode,
  connectedItems = [
    { name: "Chicken", type: "ingredient" },
    { name: "Tomato", type: "ingredient" },
    { name: "Indian", type: "cuisine" },
    { name: "Ghee", type: "substitution" },
  ],
}: GraphMiniViewProps) {
  return (
    <div className="bg-white border border-cream-300 rounded-3xl p-6 relative overflow-hidden my-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-herb-50 text-herb-600 rounded-xl">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-charcoal-900">
              Food Connections Map
            </h4>
            <span className="text-xs text-charcoal-500">
              Related ingredients, substitutions, and regional origins
            </span>
          </div>
        </div>
        <Link
          href="/explore"
          className="text-xs font-semibold text-herb-600 hover:text-herb-700 flex items-center gap-1"
        >
          Explore Connections Map <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Visual Connection Nodes */}
      <div className="relative py-8 flex flex-col items-center justify-center gap-6">
        <div className="px-6 py-3 bg-terracotta-500 text-white font-serif font-bold text-base rounded-2xl shadow-sm z-10">
          {centerNode}
        </div>

        <div className="flex flex-wrap justify-center gap-4 z-10 max-w-lg">
          {connectedItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div className="h-5 w-0.5 bg-cream-300 group-hover:bg-herb-500 transition-colors" />
              <div
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border shadow-xs transition-transform group-hover:scale-105 ${
                  item.type === "ingredient"
                    ? "bg-herb-50 border-herb-200 text-herb-800"
                    : item.type === "cuisine"
                    ? "bg-indigo-50 border-indigo-200 text-indigo-800"
                    : "bg-amber-50 border-amber-200 text-amber-800"
                }`}
              >
                <span className="text-[10px] block opacity-60 uppercase font-mono">
                  {item.type}
                </span>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
