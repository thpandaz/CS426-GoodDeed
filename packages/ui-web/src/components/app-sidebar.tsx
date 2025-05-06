"use client"

import React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Home,
  Search,
  User as UserIcon,
  Calendar,
  Briefcase,
  MessageSquare,
  Bell,
  Settings,
  Heart,
  Users,
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

// Primary navigation items
const navigationItems = [
  { name: "Dashboard",     href: "/dashboard",     icon: Home       },
  { name: "Explore",       href: "/explore",       icon: Search     },
  { name: "Profile",       href: "/profile",       icon: UserIcon   },
  { name: "Events",        href: "/events",        icon: Calendar,  badge: "3" },
  { name: "Opportunities", href: "/opportunities", icon: Briefcase  },
  { name: "Messages",      href: "/messages",      icon: MessageSquare, badge: "5" },
  { name: "Notifications", href: "/notifications", icon: Bell,      badge: "12" },
  { name: "Communities",   href: "/communities",   icon: Users      },
  { name: "Impact",        href: "/impact",        icon: Heart      },
]

// Secondary navigation items
const secondaryNavItems = [
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
    <Sidebar {...props}>
      <SidebarHeader>
        {/* Logo & Collapse */}
        <div className="flex items-center h-16 px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary-500 flex items-center justify-center text-white font-bold">
              GD
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg text-secondary-800">
                GoodDeed
              </span>
            )}
          </Link>
          <CollapseButton />
        </div>

        {/* Clerk-powered User Profile */}
        {user && (
          <div className="flex items-center gap-3 p-4 border-t border-sidebar-border">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user.imageUrl ?? `https://placehold.co/400?text=${getIntials(user.fullName ? user.fullName : "")}`}
                alt={user.fullName ?? "User"}
              />
              <AvatarFallback>
                {user.fullName?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>

            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.fullName}
                </p>
                <p className="text-xs text-sidebar-foreground/70 truncate">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            )}
          </div>
        )}
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.name}
              >
                <Link to={item.href} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.name}</span>}
                  {item.badge && (
                    <Badge className="ml-auto bg-primary-500 text-white">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Secondary Navigation */}
      <SidebarFooter>
        <SidebarMenu>
          {secondaryNavItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.name}
              >
                <Link to={item.href} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>

      {/* Rail / Collapsed View */}
      <SidebarRail />
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
      className="ml-auto p-2 rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    >
      {state === "expanded" ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </button>
  )
}

