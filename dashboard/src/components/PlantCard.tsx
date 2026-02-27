import {
  Calendar,
  Droplets,
  MoreVertical,
  Stethoscope,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import type { Plant } from "../data/plantsData";

const defaultPlantProps = {
  image:
    "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
  health: "healthy",
};

interface PlantCardProps {
  plant: Plant;
  index: number;
}
export function PlantCard({ plant: plantData, index }: PlantCardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getHealthColor = (health: string) => {
    switch (health) {
      case "healthy":
        return "bg-sage text-white";
      case "needs-attention":
        return "bg-terracotta text-white";
      case "critical":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400";
    }
  };

  const plant = { ...defaultPlantProps, ...plantData };
  const waterDays = Math.floor(Math.random() * 5) + 1;

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
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <button className="text-forest rounded-full bg-white/90 p-2 shadow-sm backdrop-blur-sm transition-colors hover:bg-white">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-md ${getHealthColor(plant.health)}`}
          >
            {plant.health.replace("-", " ")}
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
        <div className="mb-4">
          <h3 className="text-forest font-serif text-xl font-bold">
            {plant.name}
          </h3>
          <p className="text-brown text-sm italic">{plant.species}</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="bg-cream flex items-center gap-2 rounded-2xl p-3">
            <Droplets className="text-terracotta h-4 w-4" />
            <div className="flex flex-col">
              <span className="text-brown text-[10px] font-bold tracking-wider uppercase">
                {t("water")}
              </span>
              <span className="text-forest text-xs font-medium">
                {t("water_days", { count: waterDays })}
              </span>
            </div>
          </div>
          <div className="bg-cream flex items-center gap-2 rounded-2xl p-3">
            <Sun className="text-sand fill-cream stroke-brown h-4 w-4" />
            <div className="flex flex-col">
              <span className="text-brown text-[10px] font-bold tracking-wider uppercase">
                {t("light")}
              </span>
              <span className="text-forest text-xs font-medium">
                {plant.location.name}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <button
            className="bg-forest hover:bg-dark-forest text-cream shadow-forest/20 flex flex-1 items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-medium shadow-lg transition-colors"
            onClick={() =>
              navigate({ to: "/add-vital", state: { plantId: plantData.id } })
            }
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
