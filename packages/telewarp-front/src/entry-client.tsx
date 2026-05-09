import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./router";
import "./index.css";

const router = createBrowserRouter(routes);

// Remove loading indicator after hydration or before
document.getElementById("telewarp-loading")?.remove();

ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);