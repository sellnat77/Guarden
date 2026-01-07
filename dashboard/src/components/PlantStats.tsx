
import { Sprout, Droplets, Heart, HouseHeart } from 'lucide-react';
import { motion } from 'framer-motion';
export function PlantStats({ totalLocations=0, totalPlants=0, needsWater=0, overallHealth=0}) {
  const stats = [{
    label: 'Total Locations',
    value: totalLocations,
    icon: HouseHeart,
    color: 'text-dark-terracotta',
    bg: 'bg-dark-terracotta/20'
  },{
    label: 'Total Plants',
    value: totalPlants,
    icon: Sprout,
    color: 'text-forest',
    bg: 'bg-forest/20'
  }, {
    label: 'Needs Water',
    value: needsWater,
    icon: Droplets,
    color: 'text-water',
    bg: 'bg-water/20'
  }, {
    label: 'Healthy',
    value: `${overallHealth}%`,
    icon: Heart,
    color: 'text-terracotta',
    bg: 'bg-terracotta/20'
  }];
  return <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => <motion.div key={stat.label} initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: index * 0.1,
      duration: 0.5
    }} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-sand/50 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-transform duration-300">
          <div className={`p-3 rounded-full ${stat.bg} mb-3`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <span className="text-3xl font-bold text-forest font-serif mb-1">
            {stat.value}
          </span>
          <span className="text-sm text-brown font-medium">
            {stat.label}
          </span>
        </motion.div>)}
    </div>;
}
