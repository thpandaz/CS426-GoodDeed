import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Counter, NavBar } from "@repo/ui";
import ExplorePage from "./pages/explorePage";
import "./style.css";
import typescriptLogo from "/typescript.svg";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/explorePage" element={<ExplorePage />} />
        <Route path="/main" />
      </Routes>

      <div className="main-center-content">
        <div className="logo-row">
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://www.typescriptlang.org/" target="_blank">
            <img
              src={typescriptLogo}
              className="logo vanilla"
              alt="TypeScript logo"
            />
          </a>
        </div>
        <Header title="Web" />
        <div className="card">
          <Counter />
        </div>
      </div>
      
    </BrowserRouter>
  </React.StrictMode>
);
