import { Droplets, Calendar, MoreVertical, Sun } from 'lucide-react';
import { type Plant } from '@/data/plantsData';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const defaultPlantProps = {
  image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
  health: 'healthy',

}

interface PlantCardProps {
  plant: Plant;
  index: number;
}
export function PlantCard({
  plant: plantData,
  index
}: PlantCardProps) {
  const { t } = useTranslation();
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy':
        return 'bg-sage text-white';
      case 'needs-attention':
        return 'bg-terracotta text-white';
      case 'critical':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-400';
    }
  };
  const plant = { ...plantData, ...defaultPlantProps };
  const waterDays = Math.floor(Math.random() * 5) + 1;
  console.log(plant)
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
  }} className="group bg-white rounded-4xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] border border-sand/50 transition-all duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img src={plant.image} alt={plant.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-forest hover:bg-white transition-colors shadow-sm">
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
          <h3 className="text-xl font-serif font-bold text-forest">
            {plant.name}
          </h3>
          <p className="text-sm text-brown italic">{plant.species}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-cream p-3 rounded-2xl flex items-center gap-2">
            <Droplets className="w-4 h-4 text-terracotta" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-brown font-bold">
              {t('water')}
              </span>
              <span className="text-xs font-medium text-forest">
              {t('water_days', { count: waterDays })}
              </span>
            </div>
          </div>
          <div className="bg-cream p-3 rounded-2xl flex items-center gap-2">
            <Sun className="w-4 h-4 text-sand fill-cream stroke-brown" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-brown font-bold">
              {t('light')}
              </span>
              <span className="text-xs font-medium text-forest">
                {plant.location.name}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <button className="flex-1 bg-forest hover:bg-dark-forest text-cream py-2.5 rounded-2xl text-sm font-medium transition-colors shadow-lg shadow-forest/20 flex items-center justify-center gap-2">
            <Droplets className="w-4 h-4" />
            {t('water')}
          </button>
          <button className="px-4 py-2.5 border border-sand text-brown rounded-2xl hover:bg-cream transition-colors">
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>;
}
