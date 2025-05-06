// src/components/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"

export function PublicRoute({ redirectTo = "/dashboard" }: { redirectTo?: string }) {
  const { isLoaded, isSignedIn } = useAuth()

  // don’t render anything until Clerk is initialized
  if (!isLoaded) return null

  // if they’re signed in, send them away from public pages
  if (isSignedIn) {
    return <Navigate to={redirectTo} replace />
  }

  // otherwise render the nested routes
  return <Outlet />
}
