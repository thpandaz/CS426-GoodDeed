import React from 'react';
// import "../css/footer.css";
import { Link } from "react-router-dom";
import { ColoredLogo } from './ColoredLogo';

export default function Footer() {
    return (
        <footer className="w-full bg-foreground text-background py-12 font-family-display">
            <div className="px-4 md:px-6">
                <div className="grid grid-cols-2 gap-50 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <ColoredLogo className="h-8 w-auto fill-background"/>
                        </div>
                        <p className="text-white/80 mb-4 max-w-xs">
                            Connecting passionate volunteers with meaningful opportunities since 2025.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/" className="text-white/80 hover:text-white">
                                <span className="sr-only">Twitter</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                </svg>
                            </Link>
                            <Link to="/" className="text-white/80 hover:text-white">
                                <span className="sr-only">LinkedIn</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect width="4" height="12" x="2" y="9" />
                                <circle cx="4" cy="4" r="2" />
                                </svg>
                            </Link>
                            <Link to="/" className="text-white/80 hover:text-white">
                                <span className="sr-only">Instagram</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-4">For Volunteers</h3>
                        <ul className="space-y-2">
                        <li>
                            <Link to="/opportunities" className="text-white/80 hover:text-white">
                            Find Opportunities
                            </Link>
                        </li>
                        <li>
                            <Link to="/volunteers/resources" className="text-white/80 hover:text-white">
                            Volunteer Resources
                            </Link>
                        </li>
                        <li>
                            <Link to="/events" className="text-white/80 hover:text-white">
                            Events
                            </Link>
                        </li>
                        <li>
                            <Link to="/impact" className="text-white/80 hover:text-white">
                            Track Impact
                            </Link>
                        </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-4">For Organizations</h3>
                        <ul className="space-y-2">
                        <li>
                            <Link to="/organizations/post" className="text-white/80 hover:text-white">
                            Post Opportunities
                            </Link>
                        </li>
                        <li>
                            <Link to="/organizations/solutions" className="text-white/80 hover:text-white">
                            Volunteer Management
                            </Link>
                        </li>
                        <li>
                            <Link to="/organizations/pricing" className="text-white/80 hover:text-white">
                            Pricing
                            </Link>
                        </li>
                        <li>
                            <Link to="/organizations/success-stories" className="text-white/80 hover:text-white">
                            Success Stories
                            </Link>
                        </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-4">Company</h3>
                        <ul className="space-y-2">
                        <li>
                            <Link to="/about" className="text-white/80 hover:text-white">
                            About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog" className="text-white/80 hover:text-white">
                            Blog
                            </Link>
                        </li>
                        <li>
                            <Link to="/careers" className="text-white/80 hover:text-white">
                            Careers
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-white/80 hover:text-white">
                            Contact
                            </Link>
                        </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-secondary-600 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-white/80">© {new Date().getFullYear()} GoodDeed. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link to="/privacy" className="text-sm text-white/80 hover:text-white">
                        Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-sm text-white/80 hover:text-white">
                        Terms of Service
                        </Link>
                        <Link to="/cookies" className="text-sm text-white/80 hover:text-white">
                        Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
