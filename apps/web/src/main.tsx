import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter  } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'
import reportWebVitals from "./reportWebVitals";

import "./style.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY!
const SIGN_IN_REDIRECT = import.meta.env.VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL!
const SIGN_UP_REDIRECT = import.meta.env.VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL!

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
if (!SIGN_IN_REDIRECT) {
  throw new Error("Missing Sign In Fallback Redirect URL")
}
if (!SIGN_UP_REDIRECT) {
  throw new Error("Missing Sign Up Fallback Redirect URL")
}

console.log(
  'Mode:', import.meta.env.MODE,
  'Clerk Key:', import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
)

// const navigate = useNavigate()

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        signInFallbackRedirectUrl={SIGN_IN_REDIRECT}
        signUpFallbackRedirectUrl={SIGN_UP_REDIRECT}
        afterSignOutUrl="/"
        // routerPush={(to) => navigate(to)}
        // routerReplace={(to) => navigate(to, { replace: true })}
      >
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);

reportWebVitals(console.log);

// TODO: Uncomment when in production and set up analytics endpoint
// reportWebVitals(metric => {
//   fetch('/analytics', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(metric),
//   });
// });