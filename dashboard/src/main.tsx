import { StrictMode } from "react";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

import "./i18n/config.tsx";
import reportWebVitals from "./reportWebVitals.ts";
import { AuthProvider, useAuth } from "./auth.tsx";
import { router } from "./router.tsx";

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
interface PlantState {
  plantId: number;
}

declare module "@tanstack/react-router" {
  interface HistoryState extends PlantState {}
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <InnerApp />
          </QueryClientProvider>
        </AuthProvider>
      </CookiesProvider>
    </StrictMode>,
  );
}

reportWebVitals();
