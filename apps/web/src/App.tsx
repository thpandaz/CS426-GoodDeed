// src/App.tsx
import { Routes, Route } from "react-router-dom"
import { ProtectedRoute }  from "@repo/ui-web/components/ProtectedRoute"
import { AuthRedirect }    from "@repo/ui-web/components/AuthRedirect"

import { PublicLayout }    from "./layouts/PublicLayout"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { PublicRoute }     from "./layouts/PublicRoute"

import LandingPage        from "./pages/landingPage"
import AboutPage          from "./pages/AboutPage"
import OrganizationPage   from "./pages/OrganizationsPage"
import StudentsPage       from "./pages/StudentsPage"
import UniversitiesPage   from "./pages/UniversititesPage"
import ExplorePage        from "./pages/explorePage"
import ErrorPage          from "./pages/errorPage"
import OpportunitiesDashboard from "./pages/OpportunitiesPage"

export default function App() {
  return (
    <>
      <AuthRedirect />

      <Routes>
        {/* Public (NavBar) */}
        <Route element={<PublicRoute redirectTo="/dashboard" />}>
            <Route element={<PublicLayout />}>
            <Route path="/"           element={<LandingPage />} />
            <Route path="/about"      element={<AboutPage />} />
            <Route path="/organization" element={<OrganizationPage />} />
            <Route path="/students"   element={<StudentsPage />} />
            <Route path="/universities" element={<UniversitiesPage />} />
            <Route path="/error/:status" element={<ErrorPage />} />
            <Route path="/error"      element={<ErrorPage />} />
            </Route>
        </Route>

        {/* Protected (Sidebar + Breadcrumbs) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<ExplorePage />} />
            <Route path="/opportunities"  element={<OpportunitiesDashboard />} />
            {/* add more protected routes here */}
          </Route>
        </Route>

        {/* fallback */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}
