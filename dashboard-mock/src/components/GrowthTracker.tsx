import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';
const data = [{
  name: 'Jun',
  height: 45
}, {
  name: 'Jul',
  height: 52
}, {
  name: 'Aug',
  height: 58
}, {
  name: 'Sep',
  height: 65
}, {
  name: 'Oct',
  height: 72
}, {
  name: 'Nov',
  height: 78
}];
export function GrowthTracker() {
  return <motion.div initial={{
    opacity: 0,
    scale: 0.95
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    duration: 0.5,
    delay: 0.2
  }} className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8DCC4]/50 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-2xl font-serif text-[#4A5D4F]">Growth Overview</h3>
        <p className="text-[#8B6F47] text-sm">
          Average growth across all plants
        </p>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{
          top: 10,
          right: 10,
          left: -20,
          bottom: 0
        }}>
            <defs>
              <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B9D83" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B9D83" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8DCC4" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{
            fill: '#8B6F47',
            fontSize: 12
          }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{
            fill: '#8B6F47',
            fontSize: 12
          }} />
            <Tooltip contentStyle={{
            backgroundColor: '#F5F1E8',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            color: '#4A5D4F'
          }} itemStyle={{
            color: '#4A5D4F'
          }} />
            <Area type="monotone" dataKey="height" stroke="#4A5D4F" strokeWidth={3} fillOpacity={1} fill="url(#colorHeight)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>;
}