import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "@repo/ui-web/components/navbar";
import ExplorePage from "./pages/explorePage";
import LandingPage from "./pages/landingPage";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <div className="flex min-h-screen flex-col">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/students" element={<div>Students Page</div>} />
                    <Route path="/employers" element={<div>Employers Page</div>} />
                    <Route path="/universities" element={<div>Universities Page</div>} />
                    <Route path="/about" element={<div>About Page</div>} />
                    <Route path="/signin" element={<div>Sign In Page</div>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;