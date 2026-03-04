import { createFileRoute } from "@tanstack/react-router";

import "../App.css";
import { Landing } from "@/components/Landing";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Landing />;
}
