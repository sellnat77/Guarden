import React from 'react';
import { Droplets, Scissors, Shovel, Sprout, CheckCircle2 } from 'lucide-react';
import { upcomingTasks, plants } from '../data/plantsData';
import { motion } from 'framer-motion';
export function CareReminders() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'water':
        return Droplets;
      case 'prune':
        return Scissors;
      case 'repot':
        return Shovel;
      default:
        return Sprout;
    }
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-[#D4735E] text-white';
      case 'medium':
        return 'bg-[#E8DCC4] text-[#8B6F47]';
      case 'low':
        return 'bg-[#F5F1E8] text-[#8B9D83]';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };
  return <motion.div initial={{
    opacity: 0,
    scale: 0.95
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    duration: 0.5
  }} className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8DCC4]/50 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-serif text-[#4A5D4F]">Care Reminders</h3>
        <span className="text-sm text-[#8B6F47] bg-[#E8DCC4]/30 px-3 py-1 rounded-full">
          {upcomingTasks.length} pending
        </span>
      </div>

      <div className="space-y-4">
        {upcomingTasks.map((task, index) => {
        const plant = plants.find(p => p.id === task.plantId);
        const Icon = getIcon(task.type);
        return <motion.div key={task.id} initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.1 + 0.2
        }} className="group flex items-center p-4 bg-[#F5F1E8]/50 rounded-[20px] hover:bg-[#F5F1E8] transition-colors duration-300 cursor-pointer">
              <div className={`p-3 rounded-full mr-4 ${task.type === 'water' ? 'bg-[#D4735E]/10 text-[#D4735E]' : 'bg-[#8B9D83]/10 text-[#4A5D4F]'}`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-[#4A5D4F]">{plant?.name}</h4>
                <p className="text-sm text-[#8B6F47] capitalize">
                  {task.type} • Due{' '}
                  {new Date(task.dueDate).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric'
              })}
                </p>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </div>

              <button className="ml-3 text-[#8B9D83] opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Mark complete">
                <CheckCircle2 className="w-6 h-6" />
              </button>
            </motion.div>;
      })}
      </div>
    </motion.div>;
}