import { createFileRoute, redirect } from "@tanstack/react-router";

import "../App.css";
import { Landing } from "@/components/Landing";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      console.log("testing auith");
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Landing />;
}
