import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Layout from "./layouts/dashboard";
import LocationGrid from "./components/Location/LocationGrid";
import PlantGrid from "./components/Plant/PlantGrid";
import WIP from "./components/wip";
import Home from "./components/Home/Home";
import Stats from "./components/Stats/Stats";

const router = createBrowserRouter([
  {
    Component: App, // root layout route
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "",
            Component: Home,
          },
          {
            path: "locations",
            Component: LocationGrid,
          },
          {
            path: ":locationId/plants",
            Component: PlantGrid,
          },
          { path: "plants", Component: WIP },
          { path: "health", Component: Stats },
          { path: "routines", Component: WIP },
          { path: "settings", Component: WIP },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
