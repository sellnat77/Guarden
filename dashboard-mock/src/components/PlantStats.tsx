import React from 'react';
import { Sprout, Droplets, Heart, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
export function PlantStats() {
  const stats = [{
    label: 'Total Plants',
    value: '12',
    icon: Sprout,
    color: 'text-[#4A5D4F]',
    bg: 'bg-[#8B9D83]/20'
  }, {
    label: 'Needs Water',
    value: '3',
    icon: Droplets,
    color: 'text-[#D4735E]',
    bg: 'bg-[#D4735E]/20'
  }, {
    label: 'Healthy',
    value: '92%',
    icon: Heart,
    color: 'text-[#8B9D83]',
    bg: 'bg-[#8B9D83]/20'
  }, {
    label: 'Growth Rate',
    value: '+15%',
    icon: Activity,
    color: 'text-[#8B6F47]',
    bg: 'bg-[#E8DCC4]'
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
    }} className="bg-white/80 backdrop-blur-sm p-6 rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#E8DCC4]/50 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-transform duration-300">
          <div className={`p-3 rounded-full ${stat.bg} mb-3`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <span className="text-3xl font-bold text-[#4A5D4F] font-serif mb-1">
            {stat.value}
          </span>
          <span className="text-sm text-[#8B6F47] font-medium">
            {stat.label}
          </span>
        </motion.div>)}
    </div>;
}