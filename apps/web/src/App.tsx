import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@repo/ui-web/components/ProtectedRoute";
import NavBar from "@repo/ui-web/components/navbar";
import ExplorePage from "./pages/explorePage";
import LandingPage from "./pages/landingPage";
import ErrorPage from "./pages/errorPage";
import AboutPage from "./pages/AboutPage";
import OrganizationPage from "./pages/OrganizationsPage";
import StudentsPage from "./pages/StudentsPage";
import UniversitiesPage from "./pages/UniversititesPage";

function App() {
    return (
        <div>
            <NavBar />
            <div className="flex min-h-screen flex-col">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signin" element={<div>Sign In Page</div>} />
                    <Route path="/about" element={<AboutPage/>} />
                    <Route path="/organization" element={<OrganizationPage/>} />
                    <Route path="/students" element={<StudentsPage/>} />
                    <Route path="/universities" element={<UniversitiesPage/>} />


                    <Route path="/error/:status" element={<ErrorPage />} />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route element={<ProtectedRoute />}>
                        {/* <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<DashboardIndex />} />
                        <Route path="projects/:id" element={<ProjectPage />} /> */}
                        {/* </Route> */}
                    </Route>`
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/error/:status" element={<ErrorPage />} />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="*" element={<ErrorPage />} />                
                </Routes>
            </div>
        </div>
    );
}

export default App;