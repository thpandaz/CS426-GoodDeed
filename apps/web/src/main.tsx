import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "@repo/ui-web";
import ExplorePage from "./pages/explorePage";
import LandingPage from "./pages/landingPage";
import ErrorPage from "./pages/errorPage";

import "./style.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/explorePage" element={<ExplorePage />} />
        <Route path="/main" element={<LandingPage />}/>

        <Route path="/error/:status" element={<ErrorPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      
    </BrowserRouter>
  </React.StrictMode>
);
