import {
  Refine,
  GitHubBanner,
  WelcomePage,
  Authenticated,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  useNotificationProvider,
  RefineSnackbarProvider,
  ThemedLayout,
} from "@refinedev/mui";

import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { PlantList, PlantCreate, PlantEdit, PlantShow } from "./pages/plants";
import {
  LocationList,
  LocationCreate,
  LocationEdit,
  LocationShow,
} from "./pages/locations";
import { AppIcon } from "./components/app-icon";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgotPassword";
import { authProvider } from "./authProvider";

function App() {
  const API_URL = "http://api-core:5000";
  const dataProvider = nestjsxCrudDataProvider(API_URL);

  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                notificationProvider={useNotificationProvider}
                authProvider={authProvider}
                routerProvider={routerProvider}
                resources={[
                  {
                    name: "plants",
                    list: "/plants",
                    create: "/plants/create",
                    edit: "/plants/edit/:id",
                    show: "/plants/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "locations",
                    list: "/locations",
                    create: "/locations/create",
                    edit: "/locations/edit/:id",
                    show: "/locations/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "LVBwED-Jhik9C-8JWcP7",
                  title: { text: "Refine Project", icon: <AppIcon /> },
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayout Header={Header}>
                          <Outlet />
                        </ThemedLayout>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="locations" />}
                    />
                    <Route path="/plants">
                      <Route index element={<PlantList />} />
                      <Route path="create" element={<PlantCreate />} />
                      <Route path="edit/:id" element={<PlantEdit />} />
                      <Route path="show/:id" element={<PlantShow />} />
                    </Route>
                    <Route path="/locations">
                      <Route index element={<LocationList />} />
                      <Route path="create" element={<LocationCreate />} />
                      <Route path="edit/:id" element={<LocationEdit />} />
                      <Route path="show/:id" element={<LocationShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
