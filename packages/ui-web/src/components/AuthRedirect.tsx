// src/components/AuthRedirect.tsx
import { useEffect, useRef } from "react"
import { useAuth } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"

export function AuthRedirect() {
  const { isLoaded, isSignedIn } = useAuth()
  const navigate = useNavigate()
  const prevSignedIn = useRef(isSignedIn)

  useEffect(() => {
    if (
      isLoaded &&
      prevSignedIn.current === false &&
      isSignedIn === true
    ) {
      navigate("/dashboard")  // ← your post-auth landing page
    }
    prevSignedIn.current = isSignedIn
  }, [isLoaded, isSignedIn, navigate])

  return null
}
