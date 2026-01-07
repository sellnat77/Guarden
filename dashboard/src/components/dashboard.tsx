import { Leaf } from "lucide-react";
import { countPlants, plants } from "../data/plantsData";
// import { PlantCard } from "../components/PlantCard";
// import { PlantStats } from "../components/PlantStats";
// import { CareReminders } from "../components/CareReminders";
// import { GrowthTracker } from "../components/GrowthTracker";
// import { WateringSchedule } from "../components/WateringSchedule";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export function PlantDashboard() {
  const { t } = useTranslation();
  const { data } = useQuery({
    queryKey: ["fetchAllPlants"],
    queryFn: async () =>
      request(`${import.meta.env.VITE_GRAPHQL_SERVER}/graphql`, countPlants),
  });
  return (
    <div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Main Dashboard */}
        <div className="lg:col-span-8 space-y-8">
          {/*<PlantStats />*/}

          <div className="mb-8">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-serif text-forest">
                  {t("welcome_jungle")}
                </h2>
                <p className="text-brown">
                  {t("thriving_plant", {
                    count: data?.getAllPlants?.count || 0,
                  })}
                </p>
              </div>
              <button className="text-terracotta font-medium hover:text-dark-terracotta transition-colors text-sm">
                {t("button_view_all")}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {plants.map((plant, index) => {
                // TODO   <PlantCard key={plant.id} plant={plant} index={index} />
                console.log({ plant, index });
                console.log(data);
                return true;
              })}
            </div>
          </div>

          <div className="h-80">{/* TODO <GrowthTracker />*/}</div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* TODO <WateringSchedule />*/}
          {/* TODO <CareReminders />*/}

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
            className="bg-sand/30 rounded-4xl p-6 border border-sand relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Leaf className="w-32 h-32 text-forest" />
            </div>
            <h3 className="text-lg font-serif font-bold text-forest mb-2">
              {t("daily_tip_title")}
            </h3>
            <p className="text-brown text-sm leading-relaxed relative z-10">
              {t("sample_tip_text")}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
