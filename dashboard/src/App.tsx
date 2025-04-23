import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import SettingsIcon from "@mui/icons-material/Settings";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet, useNavigate } from "react-router";
import { Authentication, type Navigation } from "@toolpad/core";
import { useCallback, useMemo, useState } from "react";
import SessionContext, { type Session } from "./SessionContext";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Menu",
  },
  {
    title: "Home",
    icon: <DashboardIcon />,
  },
  {
    segment: "locations",
    title: "Locations",
    icon: <ExploreIcon />,
  },
  {
    segment: "plants",
    title: "Plants",
    icon: <LocalFloristIcon />,
  },
  {
    segment: "health",
    title: "Health",
    icon: <MonitorHeartIcon />,
  },
  {
    segment: "routines",
    title: "Routines",
    icon: <EventRepeatIcon />,
  },
  {
    segment: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
  },
];

const BRANDING = {
  title: "Guarden",
};

// preview-start
const providers = [{ id: "credentials", name: "Email and Password" }];
// preview-end

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const AUTHENTICATION: Authentication = {
    signIn: useCallback(() => {
      navigate("/sign-in", { state: { providers } });
    }, [navigate]),
    signOut: useCallback(() => {
      setSession(null);
      navigate("/sign-in");
    }, [navigate]),
  };

  const sessionContextValue = useMemo(
    () => ({
      session,
      setSession,
      loading: false,
    }),
    [session],
  );

  return (
    <ReactRouterAppProvider
      session={session}
      navigation={NAVIGATION}
      branding={BRANDING}
      authentication={AUTHENTICATION}
    >
      <SessionContext.Provider value={sessionContextValue}>
        <Outlet />
      </SessionContext.Provider>
    </ReactRouterAppProvider>
  );
}
