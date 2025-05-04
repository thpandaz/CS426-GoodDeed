import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"

export function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth()
  if (!isLoaded) return null
  return isSignedIn ? <Outlet /> : <Navigate to="/sign-in" replace />
}
