import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { HouseHeart, Leaf, Plus, Sprout } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { getLocations } from "../data/locationsData";
import { countPlants as getPlants } from "../data/plantsData";
import { PlantCard } from "./PlantCard";
import { PlantStats } from "./PlantStats";
import { CareReminders } from "./CareReminders";
import { HealthTracker } from "./HealthTracker";
import { WateringSchedule } from "./WateringSchedule";
import type { Plant } from "../data/plantsData";

export function PlantDashboard({ plantFilter }: { plantFilter: string }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isFabOpen, setIsFabOpen] = useState(false);

  const { data: fetchAllPlantsData, refetch: refetchPlants } = useQuery({
    queryKey: ["fetchAllPlants"],
    queryFn: async () =>
      await request(
        `${import.meta.env.VITE_GD_GRAPHQL_SERVER}/graphql`,
        getPlants,
      ),
  });

  const { data: fetchAllLocationsData } = useQuery({
    queryKey: ["fetchAllLocations"],
    queryFn: async () =>
      await request(
        `${import.meta.env.VITE_GD_GRAPHQL_SERVER}/graphql`,
        getLocations,
      ),
  });

  const allPlants =
    fetchAllPlantsData?.plants.filter((plant: Plant) => {
      return plantFilter.length > 0
        ? plant.name.toLowerCase().startsWith(plantFilter.toLowerCase())
        : plant;
    }) || [];

  const locationCount = fetchAllLocationsData?.locations?.length || 0;

  return (
    <div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column - Main Dashboard */}
        <div className="space-y-8 lg:col-span-8">
          <PlantStats
            totalLocations={locationCount}
            totalPlants={allPlants.length}
            needsWater={allPlants.length}
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
                    count: allPlants.length,
                  })}
                </p>
              </div>
              <button className="text-terracotta hover:text-dark-terracotta text-sm font-medium transition-colors">
                {t("button_view_all")}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {allPlants.map((plant: Plant, index: number) => {
                return (
                  <PlantCard
                    key={plant.id}
                    plant={plant}
                    index={index}
                    onDeleteSettled={refetchPlants}
                  />
                );
              })}
            </div>
          </div>

          <div className="h-80">{<HealthTracker />}</div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8 lg:col-span-4">
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
            <p className="text-brown relative z-10 text-sm leading-relaxed" />
          </motion.div>
          <WateringSchedule />
          <CareReminders />
        </div>
      </div>
      {/* Floating Action Button & Menu */}
      <div className="fixed right-8 bottom-8 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {isFabOpen && (
            <>
              <motion.button
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                  scale: 0.8,
                }}
                transition={{
                  delay: 0.05,
                }}
                onClick={() => navigate({ to: "/add-location" })}
                className="border-sand text-forest hover:bg-cream flex items-center gap-3 rounded-full border bg-white py-2 pr-2 pl-4 shadow-lg transition-colors"
              >
                <span className="text-sm font-medium">
                  {t("btn_add_location")}
                </span>
                <div className="bg-sand rounded-full p-2">
                  <HouseHeart className="text-forest h-5 w-5" />
                </div>
              </motion.button>

              <motion.button
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                  scale: 0.8,
                }}
                onClick={() => navigate({ to: "/add-plant" })}
                className="border-sand text-forest hover:bg-cream flex items-center gap-3 rounded-full border bg-white py-2 pr-2 pl-4 shadow-lg transition-colors"
              >
                <span className="text-sm font-medium">
                  {t("btn_add_plant")}
                </span>
                <div className="bg-sand rounded-full p-2">
                  <Sprout className="text-forest h-5 w-5" />
                </div>
              </motion.button>
            </>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => setIsFabOpen(!isFabOpen)}
          className={`rounded-full p-4 shadow-xl transition-colors duration-300 ${isFabOpen ? "bg-terracotta text-white" : "bg-forest text-white"}`}
        >
          <motion.div
            animate={{
              rotate: isFabOpen ? 45 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <Plus className="h-8 w-8" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
