"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Plus, RotateCcw, Utensils } from "lucide-react";
import { IngredientChip } from "./IngredientChip";
import { INGREDIENTS } from "@/lib/seed-data";

interface IngredientSelectorProps {
  selectedIngredients: string[];
  onSelect: (ingredients: string[]) => void;
  onFindRecipes: () => void;
  loading?: boolean;
}

const STAPLE_INGREDIENTS = [
  "Chicken",
  "Tomato",
  "Onion",
  "Garlic",
  "Butter",
  "Paneer",
  "Basmati Rice",
  "Heavy Cream",
  "Eggs",
  "Spaghetti",
  "Avocado",
  "Spinach",
];

export function IngredientSelector({
  selectedIngredients,
  onSelect,
  onFindRecipes,
  loading = false,
}: IngredientSelectorProps) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.trim().length > 0) {
      const lower = inputValue.toLowerCase();
      const filtered = INGREDIENTS.filter(
        (i) =>
          i.name.toLowerCase().includes(lower) &&
          !selectedIngredients.includes(i.name)
      )
        .map((i) => i.name)
        .slice(0, 6);
      setSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [inputValue, selectedIngredients]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addIngredient = (name: string) => {
    if (!selectedIngredients.includes(name)) {
      onSelect([...selectedIngredients, name]);
    }
    setInputValue("");
    setShowDropdown(false);
  };

  const removeIngredient = (name: string) => {
    onSelect(selectedIngredients.filter((i) => i !== name));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (suggestions.length > 0) {
        addIngredient(suggestions[0]);
      } else {
        addIngredient(inputValue.trim());
      }
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Search Bar Input */}
      <div className="relative" ref={dropdownRef}>
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-4 text-charcoal-400 pointer-events-none" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue.trim() && setShowDropdown(true)}
            placeholder="Add ingredients you have (e.g. Chicken, Garlic, Tomato)..."
            className="w-full pl-12 pr-28 py-4 bg-white rounded-2xl border border-cream-300 focus:border-herb-500 focus:outline-none text-charcoal-900 placeholder:text-charcoal-500 shadow-card text-base font-medium transition-all"
          />
          {inputValue && (
            <button
              onClick={() => addIngredient(inputValue.trim())}
              className="absolute right-3 px-3.5 py-1.5 bg-herb-500 text-white text-xs font-semibold rounded-xl hover:bg-herb-600 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          )}
        </div>

        {/* Dropdown Suggestions */}
        {showDropdown && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-cream-300 z-50 overflow-hidden py-1">
            {suggestions.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => addIngredient(name)}
                className="w-full text-left px-4 py-3 hover:bg-cream-100 flex items-center justify-between text-sm text-charcoal-800 transition-colors"
              >
                <span className="font-medium">{name}</span>
                <span className="text-xs text-herb-600 font-semibold flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Select
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Ingredient Chips */}
      {selectedIngredients.length > 0 && (
        <div className="bg-white/80 rounded-2xl p-4 border border-cream-300 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
              Ingredients in Your Kitchen ({selectedIngredients.length})
            </span>
            <button
              onClick={() => onSelect([])}
              className="text-xs text-charcoal-500 hover:text-terracotta-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((name) => (
              <IngredientChip
                key={name}
                name={name}
                selected
                onRemove={() => removeIngredient(name)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Staple Pantry Pills */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider block">
          Pantry Staples
        </span>
        <div className="flex flex-wrap gap-1.5">
          {STAPLE_INGREDIENTS.map((name) => {
            const isSelected = selectedIngredients.includes(name);
            return (
              <IngredientChip
                key={name}
                name={name}
                selected={isSelected}
                size="sm"
                onClick={() => {
                  if (isSelected) removeIngredient(name);
                  else addIngredient(name);
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onFindRecipes}
          disabled={loading || selectedIngredients.length === 0}
          className={`flex-1 px-8 py-4 rounded-2xl text-base font-semibold shadow-sm flex items-center justify-center gap-2 transition-all ${
            selectedIngredients.length > 0 && !loading
              ? "bg-herb-500 text-white hover:bg-herb-600 hover:scale-[1.01]"
              : "bg-cream-300 text-charcoal-500 cursor-not-allowed"
          }`}
        >
          <Utensils className="w-5 h-5" />
          {loading ? "Searching recipes..." : "Find recipes"}
        </button>
      </div>
    </div>
  );
}
