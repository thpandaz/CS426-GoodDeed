import { useState } from "react"
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";


export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
  
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <Briefcase className="h-6 w-6 text-highlight" /> */}
            <span className="text-xl font-bold text-red-600">CareerConnect</span>
          </div>
  
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link to="#" className="text-sm font-medium text-secondary-600 hover:ui-text-primary-500 transition-colors">
              Students
            </Link>
            <Link to="#" className="text-sm font-medium text-secondary-600 hover:ui-text-primary-500 transition-colors">
              Employers
            </Link>
            <Link to="#" className="text-sm font-medium text-secondary-600 hover:ui-text-primary-500 transition-colors">
              Universities
            </Link>
            <Link to="#" className="text-sm font-medium text-secondary-600 hover:ui-text-primary-500 transition-colors">
              About
            </Link>
          </nav>
  
          <div className="flex items-center gap-4">
            <Link
              to="#"
              className="text-sm font-medium text-secondary-600 hover:text-primary-500 transition-colors hidden md:block"
            >
              Sign In
            </Link>
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">Get Started</Button>
  
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-secondary-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
  
        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 top-16 z-50 bg-background md:hidden transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <nav className="flex flex-col p-6 space-y-6">
            <Link
              to="#"
              className="text-lg font-medium text-secondary-600 hover:text-primary-500 transition-colors border-b border-muted pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Students
            </Link>
            <Link
              to="#"
              className="text-lg font-medium text-secondary-600 hover:text-primary-500 transition-colors border-b border-muted pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Employers
            </Link>
            <Link
              to="#"
              className="text-lg font-medium text-secondary-600 hover:text-primary-500 transition-colors border-b border-muted pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Universities
            </Link>
            <Link
              to="#"
              className="text-lg font-medium text-secondary-600 hover:text-primary-500 transition-colors border-b border-muted pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="#"
              className="text-lg font-medium text-secondary-600 hover:text-primary-500 transition-colors border-b border-muted pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>
    )
    }
    
  
  

