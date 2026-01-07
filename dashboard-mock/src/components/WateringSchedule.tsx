import React from 'react';
import { Droplets } from 'lucide-react';
import { motion } from 'framer-motion';
export function WateringSchedule() {
  const days = [{
    day: 'Mon',
    date: '23',
    plants: []
  }, {
    day: 'Tue',
    date: '24',
    plants: ['Monstera', 'Pothos']
  }, {
    day: 'Wed',
    date: '25',
    plants: []
  }, {
    day: 'Thu',
    date: '26',
    plants: ['Snake Plant']
  }, {
    day: 'Fri',
    date: '27',
    plants: ['Fiddle Leaf', 'Rubber Plant'],
    active: true
  }, {
    day: 'Sat',
    date: '28',
    plants: []
  }, {
    day: 'Sun',
    date: '29',
    plants: ['Peace Lily']
  }];
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: 0.3
  }} className="bg-[#4A5D4F] text-[#F5F1E8] rounded-[32px] p-8 shadow-[0_8px_30px_rgb(74,93,79,0.2)] relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B9D83] rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-serif mb-1">Watering Schedule</h3>
            <p className="text-[#E8DCC4] opacity-80 text-sm">October 23 - 29</p>
          </div>
          <button className="bg-[#D4735E] hover:bg-[#c26652] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-[#D4735E]/30">
            View Month
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => <div key={day.day} className="flex flex-col items-center">
              <span className="text-xs opacity-60 mb-2">{day.day}</span>
              <div className={`w-full aspect-[3/4] rounded-[20px] flex flex-col items-center justify-start pt-3 transition-all duration-300 ${day.active ? 'bg-[#F5F1E8] text-[#4A5D4F] shadow-lg scale-105' : 'bg-[#8B9D83]/20 hover:bg-[#8B9D83]/30'}`}>
                <span className={`text-lg font-bold mb-2 ${day.active ? 'text-[#4A5D4F]' : 'text-[#F5F1E8]'}`}>
                  {day.date}
                </span>

                <div className="flex flex-col gap-1 w-full px-2">
                  {day.plants.map((plant, i) => <div key={i} className={`w-full h-1.5 rounded-full ${day.active ? 'bg-[#D4735E]' : 'bg-[#E8DCC4]/40'}`} title={plant} />)}
                  {day.plants.length > 0 && <div className="mt-1 flex justify-center">
                      <Droplets className={`w-3 h-3 ${day.active ? 'text-[#D4735E]' : 'text-[#E8DCC4]/60'}`} />
                    </div>}
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </motion.div>;
}