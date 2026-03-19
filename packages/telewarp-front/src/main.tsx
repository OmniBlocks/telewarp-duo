import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
// @ts-expect-error this is a css only library below
import "modern-normalize";
import "./index.css";
import NotFound from "./views/NotFound";

import MainLayout from "./views/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <p>Oops! TeleWarp crashed</p>,
    children: [
      {
        index: true,
        lazy: () =>
          import("./views/home/Home").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "about",
        lazy: () =>
          import("./views/about/About").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

document.getElementById("telewarp-loading")?.remove();
const rootElement = document.createElement("div");
ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
document.body.appendChild(rootElement);
