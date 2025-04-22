import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import SettingsIcon from "@mui/icons-material/Settings";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet } from "react-router";
import type { Navigation } from "@toolpad/core";

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
  title: "My Guarden App",
};

export default function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}
