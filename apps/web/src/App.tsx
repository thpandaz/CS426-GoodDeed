import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBar } from "@repo/ui-web/components/navbar";
import ExplorePage from "./pages/explorePage";
import LandingPage from "./pages/landingPage";



function App(){
    return (
        <BrowserRouter>
        <NavBar />
        
        <Routes>
            <Route path="/explorePage" element={<ExplorePage />} />
            <Route path="/main" element={<LandingPage />}/>
        </Routes>
        
        </BrowserRouter>
    )
}

export default App;