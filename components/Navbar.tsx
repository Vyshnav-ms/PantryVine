"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bookmark, Menu, X, UtensilsCrossed } from "lucide-react";
import { GlobalSearchModal } from "./GlobalSearchModal";
import { useSavedRecipes } from "@/lib/favorites";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { count } = useSavedRecipes();

  const navLinks = [
    { href: "/", label: "Discover" },
    { href: "/recipes", label: "Recipes" },
    { href: "/ingredients", label: "Ingredients" },
    { href: "/cuisines", label: "Cuisines" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Editorial Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-[#2B533F] flex items-center justify-center text-white shadow-xs group-hover:bg-[#203E2F] transition-colors">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#FAF7F2]" />
              </div>
              <span className="font-serif text-2xl tracking-tight text-[#1A1816]">
                <span className="font-bold">Pantry</span>
                <span className="italic font-normal text-[#C85A32]">Vine</span>
              </span>
            </Link>

            {/* Desktop Center Navigation */}
            <nav className="hidden md:flex items-center gap-9">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                      isActive
                        ? "text-[#2B533F] font-semibold"
                        : "text-[#635E59] hover:text-[#2B533F]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2B533F] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons: Search & My Kitchen */}
            <div className="hidden md:flex items-center gap-5">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 rounded-full text-[#635E59] hover:text-[#2B533F] hover:bg-[#F3EEE6] transition-colors flex items-center gap-2 text-xs font-medium"
                title="Search recipes & ingredients"
              >
                <Search className="w-4 h-4 text-[#635E59]" />
                <span className="hidden lg:inline text-[#635E59]">Search recipes...</span>
              </button>

              <Link
                href="/saved"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3EEE6] hover:bg-[#E9E2D7] text-[#1A1816] text-xs font-semibold tracking-wide transition-colors border border-[#E8E0D2]"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>My Kitchen {count > 0 ? `(${count})` : ""}</span>
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 rounded-lg text-[#1A1816] hover:bg-[#F3EEE6]"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#1A1816] hover:bg-[#F3EEE6] focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#E8E0D2] bg-[#FAF7F2] px-6 pt-2 pb-6 space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 text-lg font-serif ${
                    isActive ? "text-[#2B533F] font-bold" : "text-[#1A1816]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[#E8E0D2] flex justify-between items-center">
              <Link
                href="/saved"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2B533F] text-white text-xs font-semibold"
              >
                <Bookmark className="w-3.5 h-3.5" /> My Kitchen {count > 0 ? `(${count})` : ""}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {searchModalOpen && (
        <GlobalSearchModal onClose={() => setSearchModalOpen(false)} />
      )}
    </>
  );
}
