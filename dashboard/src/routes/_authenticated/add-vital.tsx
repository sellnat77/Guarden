import { createFileRoute } from "@tanstack/react-router";
import { AddVitalForm } from "@/components/Forms/AddVitalForm";

export const Route = createFileRoute("/_authenticated/add-vital")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AddVitalForm />;
}
