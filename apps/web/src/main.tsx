import { createRoot } from "react-dom/client";
import "./style.css";
import { Banner, NavBar } from "@repo/ui";

const App = () => (
  <div>
    <NavBar></NavBar>
    <Banner tagline="Connecting Hearts, Changing Lives"/>
  </div>
);

createRoot(document.getElementById("app")!).render(<App />);