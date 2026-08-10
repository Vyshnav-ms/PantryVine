import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-cream-200 border-t border-charcoal-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-herb-500 flex items-center justify-center text-white">
                <Leaf className="w-4 h-4 text-cream-100" />
              </div>
              <span className="font-serif font-bold text-2xl text-white tracking-tight">
                PantryVine
              </span>
            </div>
            <p className="text-sm text-charcoal-300 leading-relaxed max-w-md">
              Discover what you can cook, one connection at a time. Turn the ingredients in your kitchen into your next great meal with smart substitutions and culinary pairing intelligence.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-serif font-bold text-white text-base mb-4">Discover</h4>
            <ul className="space-y-2.5 text-sm text-charcoal-300">
              <li>
                <Link href="/" className="hover:text-terracotta-500 transition-colors">
                  Kitchen Finder
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-terracotta-500 transition-colors">
                  Browse Recipes
                </Link>
              </li>
              <li>
                <Link href="/ingredients" className="hover:text-terracotta-500 transition-colors">
                  Ingredient Directory
                </Link>
              </li>
              <li>
                <Link href="/cuisines" className="hover:text-terracotta-500 transition-colors">
                  Explore Cuisines
                </Link>
              </li>
            </ul>
          </div>

          {/* My Kitchen */}
          <div className="md:col-span-3">
            <h4 className="font-serif font-bold text-white text-base mb-4">My Kitchen</h4>
            <ul className="space-y-2.5 text-sm text-charcoal-300">
              <li>
                <Link href="/saved" className="hover:text-terracotta-500 transition-colors">
                  Saved Recipes
                </Link>
              </li>
              <li>
                <Link href="/ingredients" className="hover:text-terracotta-500 transition-colors">
                  Smart Substitutions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-charcoal-700 text-xs text-charcoal-300 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} PantryVine. All rights reserved.</p>
          <p className="text-charcoal-300">Crafted with care for food lovers</p>
        </div>
      </div>
    </footer>
  );
}
