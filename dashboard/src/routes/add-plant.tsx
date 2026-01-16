import { createFileRoute } from "@tanstack/react-router";
import { AddPlantForm } from "../components/Forms/AddPlantForm";

export const Route = createFileRoute("/add-plant")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AddPlantForm />;
}
