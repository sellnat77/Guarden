import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Search, Bell, Menu } from "lucide-react";
import "../App.css";
import { PlantDashboard } from "@/components/dashboard";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: App,
});

const DEFAULT_PROFILE_PIC =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200";

function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      <header className="py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-forest p-2.5 rounded-xl text-white shadow-lg shadow-forest/20">
            <Leaf className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-forest">
            {t("app_name")}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-sand">
            <Search className="w-4 h-4 text-brown mr-2" />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              className="bg-transparent border-none outline-none text-sm text-forest placeholder-brown/60 w-48"
            />
          </div>
          <button className="p-2.5 bg-white rounded-full text-forest shadow-sm hover:shadow-md transition-shadow relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-terracotta rounded-full border-2 border-white"></span>
          </button>
          <button className="md:hidden p-2.5 bg-white rounded-full text-forest shadow-sm">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:block w-10 h-10 rounded-full bg-sand overflow-hidden border-2 border-white shadow-md">
            <img src={DEFAULT_PROFILE_PIC} alt="User" />
          </div>
        </div>
      </header>
      <PlantDashboard />
    </div>
  );
}
