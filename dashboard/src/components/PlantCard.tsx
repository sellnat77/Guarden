import { Menu } from "@base-ui/react";
import {
  AlertTriangleIcon,
  Calendar,
  Droplets,
  MoreVertical,
  Stethoscope,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ResponsiveContainer } from "recharts";
import { deletePlant } from "../data/plantsData";
import { VitalGraph } from "./VitalGraph";
import { getHealthColor, getLightIcon, isLightMismatch } from "./PlantDetail/util";
import type {DeletePlantInput, Plant} from "@/data/gql/graphql";
import {  GeneralHealthEnum  } from "@/data/gql/graphql";
import { client } from "@/util/graphqlClient";
import { getLocation } from "@/data/locationsData";
import { getVitalsForPlant } from "@/data/vitalsData";

const defaultPlantProps = {
  image:
    "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
  health: "Healthy",
};

interface PlantCardProps {
  plant: Partial<Plant>;
  index: number;
  onDeleteSettled: () => void;
}
export function PlantCard({
  plant: plantData,
  index,
  onDeleteSettled,
}: PlantCardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: fetchLocation } = useQuery({
    queryKey: [`fetchAllLocation`, plantData.locationId],
    queryFn: async () => {
      if (!plantData.locationId) return;

      return await client.request(getLocation, {
        id: plantData.locationId,
      });
    },
  });

  const { data: getAllVitalsForPlant } = useQuery({
    queryKey: [`getAllVitalsForPlant`, plantData.id],
    queryFn: async () => {
      if (!plantData.id) return;
      return await client.request(getVitalsForPlant, { plantId: plantData.id });
    },
  });

  const { mutate: delPlant } = useMutation({
    mutationKey: ["deletePlant"],
    onSettled: onDeleteSettled,
    mutationFn: async (payload: { deletePlantInput: DeletePlantInput }) =>
      await client.request(deletePlant, payload),
  });


  const plant = { ...defaultPlantProps, ...plantData };
  const waterDays = Math.floor(Math.random() * 5) + 1;
  const lightMismatch = isLightMismatch(
    plantData.lightRequirements,
    plantData.location?.lightProvided
  );
  const locationName =
    fetchLocation?.location.getLocations[0]?.name || "Default Location";

  const handleDeletePlant = () => {
    if (!plant.id) return;

    delPlant({ deletePlantInput: { id: plant.id } });
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
      }}
      whileHover={{
        y: -8,
        transition: {
          duration: 0.3,
        },
      }}
      className="group border-sand/50 testutil flex-col overflow-hidden rounded-4xl border bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)]"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          onClick={() => { navigate({to: `/plant/${plant.id}/detail`})}}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <Menu.Root>
            <Menu.Trigger className="text-forest rounded-full bg-white/90 p-2 shadow-sm backdrop-blur-sm transition-colors hover:bg-white">
              <MoreVertical className="h-4 w-4" />
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner className="outline-none" sideOffset={8}>
                <Menu.Popup className="origin--transform-origin rounded-4xl bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
                  <Menu.Item
                    onClick={handleDeletePlant}
                    className="data-highlighted:before:bg-terracotta flex cursor-default rounded-4xl py-2 pr-8 pl-4 text-sm leading-4 outline-none select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-4xl"
                  >
                    Delete Plant
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </div>
        <div className="absolute top-4 left-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-md ${getHealthColor(plant.generalHealth || GeneralHealthEnum.Healthy)}`}
          >
            {plant.generalHealth || GeneralHealthEnum.Healthy}
          </span>
        </div>
        <div className="absolute top-10 left-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-md bg-cream text-forest`}
          >
            {locationName}
          </span>
        </div>

        {/* Organic curve divider */}
        <div
          className="absolute right-0 bottom-0 left-0 h-8 bg-white"
          style={{
            clipPath: "ellipse(60% 100% at 50% 100%)",
          }}
        ></div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6 pt-2">
        <div className="mb-4 flex gap-2">
          <div className="flex-1">
            <h3 className="text-forest font-serif text-xl font-bold">
              {plant.name}
            </h3>
            <p className="text-brown text-sm italic">{plant.species}</p>
          </div>
          <div className="w-32">
            <ResponsiveContainer width="100%" height={50}>
              <VitalGraph
                data={getAllVitalsForPlant?.vital.getVitals}
                miniDisplay={true}
              />
            </ResponsiveContainer>
          </div>
        </div>



        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="bg-cream relative flex flex-col items-center rounded-2xl p-3">
            <Droplets className="text-water absolute left-3 top-3 h-4 w-4" />
            <span className="text-brown text-[10px] font-bold tracking-wider uppercase">
              {t("water")}
            </span>
            <span className="text-forest text-xs font-medium">
              {t("water_days", { count: waterDays })}
            </span>
          </div>

          <div className={`relative flex flex-col items-center rounded-2xl p-3 ${lightMismatch ? "bg-terracotta/20" : "bg-cream"}`}>
            <Sun className={`absolute left-3 top-3 h-4 w-4 ${lightMismatch ? "text-terracotta" : "text-sand fill-cream stroke-terracotta"}`} />
            {lightMismatch && (
              <AlertTriangleIcon className="absolute right-3 top-3 h-4 w-4 text-terracotta" />
            )}
            <span className="text-brown text-[10px] font-bold tracking-wider uppercase">
              {t("light")}
            </span>
            {lightMismatch ? (
              <div className="mt-1 flex gap-3">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-brown text-[9px] font-bold tracking-wider uppercase">
                    {t("wants")}
                  </span>
                  <span title={ plantData.lightRequirements}  className="text-forest text-xs font-medium">
                    {getLightIcon(plantData.lightRequirements)}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-brown text-[9px] font-bold tracking-wider uppercase">
                    {t("getting")}
                  </span>
                  <span title={plantData.location?.lightProvided} className="text-terracotta text-xs font-medium">
                    {getLightIcon(plantData.location?.lightProvided)}
                  </span>
                </div>
              </div>
            ) : (
              <span title={plantData.lightRequirements} className="text-forest text-xs font-medium">
                {getLightIcon(plantData.lightRequirements)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <button
            className="bg-forest hover:bg-dark-forest text-cream shadow-forest/20 flex flex-1 items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-medium shadow-lg transition-colors"
            onClick={() => {
              if (!plantData.id) return;
              navigate({ to: "/add-vital", state: { plantId: plantData.id } });
            }}
          >
            <Stethoscope className="h-4 w-4" />
            {t("add_vital")}
          </button>
          <button className="border-sand text-brown hover:bg-cream rounded-2xl border px-4 py-2.5 transition-colors">
            <Calendar className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
