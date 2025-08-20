"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, BookOpen } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-8 h-8 bg-accent rounded-lg group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
              ByteThoughts
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-muted-foreground hover:text-accent transition-colors font-medium"
            >
              Home
            </Link>

            <Link
              href="/blog"
              className="text-muted-foreground hover:text-accent transition-colors font-medium"
            >
              Blog
            </Link>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="w-4 h-4" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Dark Mode Toggle Button */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              <Link
                href="/"
                className="text-muted-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/blog"
                className="text-muted-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>

              <div className="pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                {/* Dark Mode Toggle in Mobile Menu */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
