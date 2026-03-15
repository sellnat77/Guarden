import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated || !context.auth.user) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Outlet,
});
