import * as reactRouter from "@tanstack/react-router";
import LoginForm from "@/components/Forms/LoginForm";

export const Route = reactRouter.createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
