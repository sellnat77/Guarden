import { createFileRoute, redirect } from "@tanstack/react-router";
import { RegisterForm } from "@/components/Forms/RegisterForm";

export const Route = createFileRoute("/register")({
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterForm />;
}
