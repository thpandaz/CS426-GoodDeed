"use client"

import type React from "react"
import { useEffect } from "react"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { AlertTriangle } from "@repo/ui-web"
import { Button } from "@repo/ui-web/components/ui/button"

const ErrorPage: React.FC = () => {
  const { status: urlStatus } = useParams<{ status?: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const status = urlStatus || searchParams.get("status") || "404"

  const errorMessages: Record<string, string> = {
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Page Not Found",
    "500": "Internal Server Error",
    "502": "Bad Gateway",
    "503": "Service Unavailable",
    "504": "Gateway Timeout",
  }

  const message = errorMessages[status] || "An error occurred"

  useEffect(() => {
    document.title = `Error ${status} | ${message}`

    console.log("ErrorPage rendered with status:", status)
  }, [status, message])

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="mb-8">
        <AlertTriangle className="h-24 w-24 text-primary mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-primary mb-2">{status}</h1>
        <h2 className="text-2xl font-semibold mb-4">{message}</h2>
      </div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="px-4 py-2 rounded"
          onClick={() => navigate("/")}
        >
          Return Home
        </Button>
        <Button
          variant="default"
          className="px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </div>
  )
}

export default ErrorPage

