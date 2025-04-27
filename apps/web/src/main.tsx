import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const CLERK_SIGN_IN_FALLBACK_REDIRECT_URL = import.meta.env.VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
const CLERK_SIGN_UP_FALLBACK_REDIRECT_URL = import.meta.env.VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
if (!CLERK_SIGN_IN_FALLBACK_REDIRECT_URL) {
  throw new Error("Missing Sign In Fallback Redirect URL")
}
if (!CLERK_SIGN_UP_FALLBACK_REDIRECT_URL) {
  throw new Error("Missing Sign Up Fallback Redirect URL")
}

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} signInFallbackRedirectUrl={CLERK_SIGN_IN_FALLBACK_REDIRECT_URL} signUpFallbackRedirectUrl={CLERK_SIGN_UP_FALLBACK_REDIRECT_URL} afterSignOutUrl="/">
    <App />
    </ClerkProvider>
  </React.StrictMode>
);
