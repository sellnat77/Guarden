import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Layout from "./layouts/dashboard";
import LocationGrid from "./components/Location/LocationGrid";
import PlantGrid from "./components/Plant/PlantGrid";
import PlantCard from "./components/Plant/PlantCard";

const router = createBrowserRouter([
  {
    Component: App, // root layout route
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "locations",
            Component: LocationGrid,
          },
          {
            path: ":locationId/plants",
            Component: PlantGrid,
            children: [
              {
                path: ":id",
                Component: PlantCard,
              },
            ],
          },
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
