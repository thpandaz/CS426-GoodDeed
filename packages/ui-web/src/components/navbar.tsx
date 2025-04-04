import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@ui/components/ui/button";
import { cn } from "../lib/utils";
import { ColoredLogo } from "./ColoredLogo";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-background/80" : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
          <ColoredLogo className="h-8 w-auto fill-secondary-500" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { name: "Explore", path: "/explore" },
            { name: "Employers", path: "/employers" },
            { name: "Universities", path: "/universities" },
            { name: "About", path: "/about" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-accent-50 hover:text-primary-500",
                isActive(item.path)
                  ? "text-primary-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary-500"
                  : "text-secondary-600",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/signin"
            className="hidden md:block text-sm font-medium text-secondary-600 hover:text-primary-500 transition-colors px-3 py-2 rounded-md hover:bg-accent-50"
          >
            Sign In
          </Link>
          <Button className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-6 transition-transform hover:scale-105">
            Get Started
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-secondary-500 p-2 rounded-md hover:bg-accent-50"
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
          "fixed inset-0 top-14 z-50 bg-white md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none",
        )}
      >
        <nav className="flex flex-col p-6 space-y-4">
          {[
            { name: "Students", path: "/students" },
            { name: "Employers", path: "/employers" },
            { name: "Universities", path: "/universities" },
            { name: "About", path: "/about" },
            { name: "Sign In", path: "/signin" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center text-lg font-medium py-3 px-4 rounded-lg transition-colors",
                isActive(item.path)
                  ? "bg-accent-50 text-primary-500"
                  : "text-secondary-600 hover:bg-accent-50 hover:text-primary-500",
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4">
            <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-full ">
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default NavBar;

