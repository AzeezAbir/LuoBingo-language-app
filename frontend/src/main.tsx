import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.match";

createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
  // <StrictMode>
  //   <App />
  // </StrictMode>,
);
