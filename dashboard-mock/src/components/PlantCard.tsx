import React from 'react';
import { Droplets, Calendar, MoreVertical, Sun } from 'lucide-react';
import { Plant } from '../data/plantsData';
import { motion } from 'framer-motion';
interface PlantCardProps {
  plant: Plant;
  index: number;
}
export function PlantCard({
  plant,
  index
}: PlantCardProps) {
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy':
        return 'bg-[#8B9D83] text-white';
      case 'needs-attention':
        return 'bg-[#D4735E] text-white';
      case 'critical':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-400';
    }
  };
  return <motion.div initial={{
    opacity: 0,
    y: 30
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: index * 0.1,
    duration: 0.5
  }} whileHover={{
    y: -8,
    transition: {
      duration: 0.3
    }
  }} className="group bg-white rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] border border-[#E8DCC4]/50 transition-all duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img src={plant.image} alt={plant.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-[#4A5D4F] hover:bg-white transition-colors shadow-sm">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md shadow-sm ${getHealthColor(plant.health)}`}>
            {plant.health.replace('-', ' ')}
          </span>
        </div>

        {/* Organic curve divider */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white" style={{
        clipPath: 'ellipse(60% 100% at 50% 100%)'
      }}></div>
      </div>

      {/* Content Section */}
      <div className="p-6 pt-2 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-serif font-bold text-[#4A5D4F]">
            {plant.name}
          </h3>
          <p className="text-sm text-[#8B6F47] italic">{plant.species}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#F5F1E8] p-3 rounded-[16px] flex items-center gap-2">
            <Droplets className="w-4 h-4 text-[#D4735E]" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#8B6F47] font-bold">
                Water
              </span>
              <span className="text-xs font-medium text-[#4A5D4F]">
                In {Math.floor(Math.random() * 5) + 1} days
              </span>
            </div>
          </div>
          <div className="bg-[#F5F1E8] p-3 rounded-[16px] flex items-center gap-2">
            <Sun className="w-4 h-4 text-[#E8DCC4] fill-[#E8DCC4] stroke-[#8B6F47]" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#8B6F47] font-bold">
                Light
              </span>
              <span className="text-xs font-medium text-[#4A5D4F]">
                {plant.location}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <button className="flex-1 bg-[#4A5D4F] hover:bg-[#3a4a3e] text-[#F5F1E8] py-2.5 rounded-[16px] text-sm font-medium transition-colors shadow-lg shadow-[#4A5D4F]/20 flex items-center justify-center gap-2">
            <Droplets className="w-4 h-4" />
            Water
          </button>
          <button className="px-4 py-2.5 border border-[#E8DCC4] text-[#8B6F47] rounded-[16px] hover:bg-[#F5F1E8] transition-colors">
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>;
}