import { Toggle, ToggleGroup } from "@base-ui/react";
import type { Location } from "@/data/gql/graphql";

interface ItemToggleGroupProps {
  locations: Array<Partial<Location>>;
  setSelectedLocation: (value: number) => void;
}

const DEFAULT_LOCATION_ID = "0";
const ALL_LOCATIONS = { id: 0, name: "All Locations" };

export function LocationFilter({
  locations,
  setSelectedLocation,
}: ItemToggleGroupProps) {
  const locationsWithDefault = [ALL_LOCATIONS, ...locations];

  const handleLocationChange = (newId: Array<string>) => {
    setSelectedLocation(parseInt(newId[0]));
  };

  return (
    <ToggleGroup
      defaultValue={[DEFAULT_LOCATION_ID]}
      onValueChange={handleLocationChange}
      multiple={false}
      className="inline-flex items-center"
      aria-label="Location selection"
    >
      {locationsWithDefault.map((item) => (
        <Toggle
          key={item.id ? item.id.toString() : DEFAULT_LOCATION_ID}
          value={item.id ? item.id.toString() : DEFAULT_LOCATION_ID}
          aria-label={item.name}
          className="text-terracotta hover:text-dark-terracotta data-pressed:bg-terracotta data-pressed:text-cream mx-1 rounded-full px-3 text-sm font-medium outline-1 transition-all duration-200"
        >
          {item.name}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
