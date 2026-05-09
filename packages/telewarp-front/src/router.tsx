import MainLayout from "./views/Layout";
import NotFound from "./views/NotFound";

export const routes = [
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        lazy: () => import("./views/home/Home").then((m) => ({ Component: m.default })),
      },
      {
        path: "about",
        lazy: () => import("./views/about/About").then((m) => ({ Component: m.default })),
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
];