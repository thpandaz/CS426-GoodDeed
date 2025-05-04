import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, useNavigate  } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'
import reportWebVitals from "./reportWebVitals";

import "./style.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY!
const SIGN_IN_REDIRECT = import.meta.env.VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL!
const SIGN_UP_REDIRECT = import.meta.env.VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL!

const ClerkWrapper = () => {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInFallbackRedirectUrl={SIGN_IN_REDIRECT}
      signUpFallbackRedirectUrl={SIGN_UP_REDIRECT}
      afterSignOutUrl="/"
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      <App />
    </ClerkProvider>
  )
}

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
     <BrowserRouter>
      <ClerkWrapper />
    </BrowserRouter>
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