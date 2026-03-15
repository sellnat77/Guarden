import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginForm from "@/components/Forms/LoginForm";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
