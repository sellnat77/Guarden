import { createFileRoute } from "@tanstack/react-router";
import { AddLocationForm } from "../../components/Forms/AddLocationForm";

export const Route = createFileRoute("/_authenticated/add-location")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AddLocationForm />;
}
