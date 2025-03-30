import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "@repo/ui-web";
import ExplorePage from "./pages/explorePage";
import LandingPage from "./pages/landingPage";
import "./style.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/explorePage" element={<ExplorePage />} />
        <Route path="/main" element={<LandingPage />}/>
      </Routes>
      
    </BrowserRouter>
  </React.StrictMode>
);
