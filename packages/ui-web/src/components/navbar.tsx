import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@ui/components/ui/button";
import { cn } from "../lib/utils";
import { ColoredLogo } from "./ColoredLogo";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 ease-in-out",
        isMenuOpen
        ? "bg-white duration-0"
        : scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-background/80"
          : "bg-white",
      )}
    >
      {/* <-- note grid-cols-2 here on mobile --> */}
      <div className="grid grid-cols-2 md:grid-cols-3 items-center h-16 px-6 md:px-10 lg:px-12">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-2 transition-transform duration-500 ease-in-out hover:scale-105"
          >
            <ColoredLogo className="h-8 w-auto fill-secondary-500" />
          </Link>
        </div>

        {/* Center: Desktop nav (hidden on mobile) */}
        <div className="hidden md:flex justify-center">
          <nav className="flex items-center gap-1">
            {[
              { name: "Students", path: "/students" },
              { name: "Organization", path: "/organization" },
              { name: "Universities", path: "/universities" },
              { name: "About", path: "/about" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-500 ease-in-out rounded-md hover:bg-accent-50 hover:text-primary-500",
                  isActive(item.path)
                    ? "text-primary-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary-500"
                    : "text-secondary-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: on mobile this is column #2 and will be full-width, pushing the button to the far right */}
        <div className="flex items-center justify-end gap-4">
          {/* desktop-only links */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="hidden md:block text-sm font-medium text-secondary-600 transition-colors duration-500 ease-in-out hover:text-primary-500 px-3 py-2 rounded-md hover:bg-accent-50 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="hidden md:block bg-primary-500/80 hover:bg-primary-500 text-white rounded-full px-6 transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer">
                Get Started
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          {/* mobile menu button */}
          <button
            className="md:hidden text-secondary-500 p-2 rounded-md hover:bg-accent-50 transition-colors duration-500 ease-in-out"
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div
        className={cn(
          "fixed inset-0 top-14 z-50 bg-white transition-opacity duration-500 ease-in-out",
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col p-6 space-y-4">
          {[
            { name: "Students", path: "/students" },
            { name: "Organization", path: "/organization" },
            { name: "Universities", path: "/universities" },
            { name: "About", path: "/about" },
            { name: "Sign In", path: "/signin" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center text-lg font-medium py-3 px-4 rounded-lg transition-colors duration-500 ease-in-out",
                isActive(item.path)
                  ? "bg-accent-50 text-primary-500"
                  : "text-secondary-600 hover:bg-accent-50 hover:text-primary-500"
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4">
            <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-full">
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
