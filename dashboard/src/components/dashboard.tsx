import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { PlantCard } from "../components/PlantCard";
import { PlantStats } from "./PlantStats";
import { CareReminders } from "./CareReminders";
import { HealthTracker } from "./HealthTracker";
import { WateringSchedule } from "./WateringSchedule";
import type { Plant } from "@/data/plantsData";
import { countPlants } from "@/data/plantsData";
import { countLocations } from "@/data/locationsData";

export function PlantDashboard({ plantFilter }: { plantFilter: string }) {
  const { t } = useTranslation();
  const { data: fetchAllPlantsData } = useQuery({
    queryKey: ["fetchAllPlants"],
    queryFn: async () =>
      request(`${import.meta.env.VITE_GD_GRAPHQL_SERVER}/graphql`, countPlants),
  });

  const { data: fetchAllLocationsData } = useQuery({
    queryKey: ["fetchAllLocations"],
    queryFn: async () =>
      request(
        `${import.meta.env.VITE_GD_GRAPHQL_SERVER}/graphql`,
        countLocations,
      ),
  });

  const allPlants = fetchAllPlantsData?.getAllPlants || [];

  const plantCount = fetchAllPlantsData?.getAllPlants?.count || 0;
  const plantList = allPlants.plants || [];
  const locationCount = fetchAllLocationsData?.getAllLocations?.count || 0;
  return (
    <div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column - Main Dashboard */}
        <div className="space-y-8 lg:col-span-8">
          <PlantStats
            totalLocations={locationCount}
            totalPlants={plantCount}
            needsWater={plantCount}
            overallHealth={67}
          />

          <div className="mb-8">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="text-forest font-serif text-2xl">
                  {t("welcome_jungle")}
                </h2>
                <p className="text-brown">
                  {t("thriving_plant", {
                    count: plantCount,
                  })}
                </p>
              </div>
              <button className="text-terracotta hover:text-dark-terracotta text-sm font-medium transition-colors">
                {t("button_view_all")}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {plantList.map((plant: Plant, index: number) => {
                return <PlantCard key={plant.id} plant={plant} index={index} />;
              })}
            </div>
          </div>

          <div className="h-80">{<HealthTracker />}</div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8 lg:col-span-4">
          <WateringSchedule />
          <CareReminders />

          {/* Daily Tip Card */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.6,
            }}
            className="bg-sand/30 border-sand relative overflow-hidden rounded-4xl border p-6"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Leaf className="text-forest h-32 w-32" />
            </div>
            <h3 className="text-forest mb-2 font-serif text-lg font-bold">
              {t("daily_tip_title")}
            </h3>
            <p className="text-brown relative z-10 text-sm leading-relaxed">
              {t("sample_tip_text")}
            </p>
            <p className="text-brown relative z-10 text-sm leading-relaxed">
              {plantFilter}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
