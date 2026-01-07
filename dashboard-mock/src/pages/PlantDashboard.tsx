import React from 'react';
import { Leaf, Search, Bell, Menu } from 'lucide-react';
import { plants } from '../data/plantsData';
import { PlantCard } from '../components/PlantCard';
import { PlantStats } from '../components/PlantStats';
import { CareReminders } from '../components/CareReminders';
import { GrowthTracker } from '../components/GrowthTracker';
import { WateringSchedule } from '../components/WateringSchedule';
import { motion } from 'framer-motion';
export function PlantDashboard() {
  return <div className="min-h-screen pb-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#4A5D4F] p-2.5 rounded-xl text-white shadow-lg shadow-[#4A5D4F]/20">
            <Leaf className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#4A5D4F]">
            Botanica
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[#E8DCC4]">
            <Search className="w-4 h-4 text-[#8B6F47] mr-2" />
            <input type="text" placeholder="Search plants..." className="bg-transparent border-none outline-none text-sm text-[#4A5D4F] placeholder-[#8B6F47]/60 w-48" />
          </div>
          <button className="p-2.5 bg-white rounded-full text-[#4A5D4F] shadow-sm hover:shadow-md transition-shadow relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#D4735E] rounded-full border-2 border-white"></span>
          </button>
          <button className="md:hidden p-2.5 bg-white rounded-full text-[#4A5D4F] shadow-sm">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:block w-10 h-10 rounded-full bg-[#E8DCC4] overflow-hidden border-2 border-white shadow-md">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" alt="User" />
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Main Dashboard */}
        <div className="lg:col-span-8 space-y-8">
          <PlantStats />

          <div className="mb-8">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-serif text-[#4A5D4F]">
                  My Jungle
                </h2>
                <p className="text-[#8B6F47]">
                  You have {plants.length} plants thriving
                </p>
              </div>
              <button className="text-[#D4735E] font-medium hover:text-[#b05d4b] transition-colors text-sm">
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {plants.map((plant, index) => <PlantCard key={plant.id} plant={plant} index={index} />)}
            </div>
          </div>

          <div className="h-80">
            <GrowthTracker />
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <WateringSchedule />
          <CareReminders />

          {/* Daily Tip Card */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.6
        }} className="bg-[#E8DCC4]/30 rounded-[32px] p-6 border border-[#E8DCC4] relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Leaf className="w-32 h-32 text-[#4A5D4F]" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#4A5D4F] mb-2">
              Daily Tip
            </h3>
            <p className="text-[#8B6F47] text-sm leading-relaxed relative z-10">
              Mist your tropical plants like the Monstera and Ferns today. The
              humidity is lower than usual!
            </p>
          </motion.div>
        </div>
      </div>
    </div>;
}