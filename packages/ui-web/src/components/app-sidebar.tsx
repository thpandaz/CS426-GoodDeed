"use client"

import React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Home,
  User as UserIcon,
  Calendar,
  Briefcase,
  Settings,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@ui/components/ui/sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "@ui/components/ui/avatar"
import { Badge } from "@ui/components/ui/badge"
import { getIntials } from "@repo/utils/render"
import { useUser } from "@clerk/clerk-react"

// Navigation item type
interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string | number;
}

// Primary navigation items
const navigationItems: NavigationItem[] = [
  { name: "Dashboard",     href: "/dashboard",     icon: Home       },
  // { name: "Explore",       href: "/explore",       icon: Search     },
  { name: "Profile",       href: "/profile",       icon: UserIcon   },
  { name: "Events",        href: "/events",        icon: Calendar },
  { name: "Opportunities", href: "/opportunities", icon: Briefcase  },
  // { name: "Messages",      href: "/messages",      icon: MessageSquare},
  // { name: "Notifications", href: "/notifications", icon: Bell  },
  // { name: "Communities",   href: "/communities",   icon: Users      },
  { name: "Impact",        href: "/impact",        icon: Heart      },
]

// Secondary navigation items
const secondaryNavItems: NavigationItem[] = [
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const { pathname } = useLocation()
  const { user } = useUser()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar 
      className="shadow-sm border-r border-sidebar-border/10 bg-sidebar/95 font-sans" 
      {...props}
    >
      <SidebarHeader className="py-4 px-3">
        {/* Logo & Collapse */}
        <div className="flex items-center h-14 px-2 mb-4">
          <Link to="/dashboard" className="flex items-center gap-3.5 group">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold shadow-sm group-hover:shadow-md transition-all duration-300">
              GD
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg bg-gradient-to-r from-secondary-600 to-secondary-800 text-transparent bg-clip-text tracking-tight">
                GoodDeed
              </span>
            )}
          </Link>
          <CollapseButton />
        </div>

        {/* User Profile */}
        <div className={`px-2 py-3 mb-1 rounded-lg bg-sidebar-accent/5 ${isCollapsed ? "flex justify-center" : ""}`}>
          <Link to="/profile" className={`flex items-center gap-3 ${isCollapsed ? "" : "px-1"}`}>
            <Avatar className="h-10 w-10 border-2 border-sidebar-accent/10 shadow-sm">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
              <AvatarFallback className="bg-primary-50 text-primary-700">
                {getIntials(user?.fullName || "User")}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-sidebar-foreground truncate leading-tight">
                  {user?.fullName || "User"}
                </div>
                <p className="text-xs text-sidebar-foreground/60 truncate mt-0.5">
                  {user?.primaryEmailAddress?.emailAddress || "user@example.com"}
                </p>
              </div>
            )}
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2">
        <div className={`mb-3.5 px-2 ${isCollapsed ? "sr-only" : "text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider"}`}>
          Main Menu
        </div>
        <SidebarMenu className="space-y-1.5">
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.name}
                className={`transition-all duration-200 rounded-lg ${
                  pathname === item.href 
                    ? "bg-sidebar-accent/15 shadow-sm" 
                    : "hover:bg-sidebar-accent/10"
                }`}
              >
                <Link to={item.href} className="flex items-center gap-3.5 py-2.5">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-md ${
                    pathname === item.href 
                      ? "bg-primary-500/15 text-primary-500" 
                      : "text-sidebar-foreground/70"
                  }`}>
                    <item.icon className="h-[18px] w-[18px]" />
                  </div>
                  {!isCollapsed && <span className={`text-[14.5px] leading-none ${pathname === item.href ? "font-medium" : "font-normal"}`}>{item.name}</span>}
                  {item.badge && !isCollapsed && (
                    <Badge className="ml-auto bg-primary-500/90 text-white shadow-sm text-[10px] px-2 min-w-6 flex items-center justify-center">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Secondary Navigation - Settings */}
      <SidebarFooter className="mt-auto border-t border-sidebar-border/8 py-4 px-3">
        <div className={`mb-3.5 px-2 ${isCollapsed ? "sr-only" : "text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider"}`}>
          Settings
        </div>
        <SidebarMenu className="space-y-1.5">
          {secondaryNavItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.name}
                className={`transition-all duration-200 rounded-lg ${
                  pathname === item.href 
                    ? "bg-sidebar-accent/15 shadow-sm" 
                    : "hover:bg-sidebar-accent/10"
                }`}
              >
                <Link to={item.href} className="flex items-center gap-3.5 py-2.5">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-md ${
                    pathname === item.href 
                      ? "bg-secondary-500/15 text-secondary-500" 
                      : "text-sidebar-foreground/70"
                  }`}>
                    <item.icon className="h-[18px] w-[18px]" />
                  </div>
                  {!isCollapsed && <span className={`text-[14.5px] leading-none ${pathname === item.href ? "font-medium" : "font-normal"}`}>{item.name}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>

      {/* Rail / Collapsed View */}
      <SidebarRail className="hover:after:bg-sidebar-border/20" />
    </Sidebar>
  )
}

function CollapseButton() {
  const { state, toggleSidebar } = useSidebar()

  return (
    <button
      onClick={toggleSidebar}
      aria-label={
        state === "expanded" ? "Collapse sidebar" : "Expand sidebar"
      }
      className="ml-auto p-2 rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent/10 hover:text-sidebar-accent-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/10"
    >
      {state === "expanded" ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </button>
  )
}

