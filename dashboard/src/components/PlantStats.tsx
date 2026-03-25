import { Droplets, Heart, HouseHeart, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Plant } from "@/data/gql/graphql";
import { client } from "@/util/graphqlClient";
import { getVitalsForPlantGroup } from "@/data/vitalsData";

export function PlantStats({
  allPlants = [],
  totalLocations = 0,
}: {
  allPlants: Array<Partial<Plant>>;
  totalLocations: number;
}) {
  const plantIds = allPlants
    .map((plant) => plant.id)
    .filter((id) => id !== undefined);
  const { data: getVitalsForGroup } = useQuery({
    queryKey: [`getAllVitalsForPlants`, plantIds],
    queryFn: async () => {
      if (plantIds.length == 0) return;
      const {
        vital: { getVitals },
      } = await client.request(getVitalsForPlantGroup, {
        plantIds: plantIds,
      });
      const avgHealth =
        getVitals.reduce((acc, curr) => acc + curr.healthPct, 0) /
        getVitals.length;
      return avgHealth.toFixed(2);
    },
  });

  const averageHealth = getVitalsForGroup;
  const stats = [
    {
      label: "Total Locations",
      value: totalLocations,
      icon: HouseHeart,
      color: "text-dark-terracotta",
      bg: "bg-dark-terracotta/20",
    },
    {
      label: "Total Plants",
      value: allPlants.length,
      icon: Sprout,
      color: "text-forest",
      bg: "bg-forest/20",
    },
    {
      label: "Needs Water",
      value: allPlants.length,
      icon: Droplets,
      color: "text-water",
      bg: "bg-water/20",
    },
    {
      label: "Healthy",
      value: `${averageHealth}%`,
      icon: Heart,
      color: "text-terracotta",
      bg: "bg-terracotta/20",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
          }}
          className="border-sand/50 flex flex-col items-center rounded-xl border bg-white/80 p-6 text-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:transform"
        >
          <div className={`rounded-full p-3 ${stat.bg} mb-3`}>
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
          </div>
          <span className="text-forest mb-1 font-serif text-3xl font-bold">
            {stat.value}
          </span>
          <span className="text-brown text-sm font-medium">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
