import { Droplets, Heart, HouseHeart, Sprout } from "lucide-react";
import { motion } from "framer-motion";

export function PlantStats({
  totalLocations = 0,
  totalPlants = 0,
  needsWater = 0,
  overallHealth = 0,
}) {
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
      value: totalPlants,
      icon: Sprout,
      color: "text-forest",
      bg: "bg-forest/20",
    },
    {
      label: "Needs Water",
      value: needsWater,
      icon: Droplets,
      color: "text-water",
      bg: "bg-water/20",
    },
    {
      label: "Healthy",
      value: `${overallHealth}%`,
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
