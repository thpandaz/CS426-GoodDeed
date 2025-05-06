// components/DashboardLayout.tsx
import { Outlet, useLocation, Link } from "react-router-dom"
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react"

import AppSidebar  from "@repo/ui-web/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@repo/ui-web/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@repo/ui-web/components/ui/breadcrumb"
import { Separator } from "@repo/ui-web/components/ui/separator"

export function DashboardLayout() {
  const { pathname } = useLocation()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <>
      <SignedIn>
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset className="flex flex-col">
            <header className="flex h-16 items-center px-4 border-b">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mx-4 h-4" />

              <Breadcrumb>
                <BreadcrumbList>
                  {segments.map((seg, i) => {
                    const href = "/" + segments.slice(0, i + 1).join("/")
                    const label = decodeURIComponent(seg).replace(/-/g, " ")
                    return (
                      <BreadcrumbItem key={href}>
                        <BreadcrumbLink asChild>
                          <Link to={href}>
                            {label.charAt(0).toUpperCase() + label.slice(1)}
                          </Link>
                        </BreadcrumbLink>
                        {i < segments.length - 1 && <BreadcrumbSeparator />}
                      </BreadcrumbItem>
                    )
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </header>

            <main className="flex-1 overflow-auto p-4">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}
