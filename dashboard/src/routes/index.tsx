import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Search, Bell, Menu } from "lucide-react";
import "../App.css";
import { useTranslation } from "react-i18next";
import { PlantDashboard } from "@/components/Dashboard";
import { useState, type ChangeEvent } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

const DEFAULT_PROFILE_PIC =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200";

function App() {
  const [searchText, setSearchTect] = useState("");
  const { t } = useTranslation();

  const handleSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTect(e.target.value);
  };
  return (
    <div className="App">
      <header className="flex items-center justify-between py-8">
        <div className="flex items-center gap-3">
          <div className="bg-forest shadow-forest/20 rounded-xl p-2.5 text-white shadow-lg">
            <Leaf className="h-6 w-6" />
          </div>
          <h1 className="text-forest font-serif text-3xl font-bold">
            {t("app_name")}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="border-sand hidden items-center rounded-full border bg-white/60 px-4 py-2 backdrop-blur-sm md:flex">
            <Search className="text-brown mr-2 h-4 w-4" />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              className="text-forest placeholder-brown/60 w-48 border-none bg-transparent text-sm outline-none"
              onChange={handleSearchChanged}
            />
          </div>
          <button className="text-forest relative rounded-full bg-white p-2.5 shadow-sm transition-shadow hover:shadow-md">
            <Bell className="h-5 w-5" />
            <span className="bg-terracotta absolute top-2 right-2.5 h-2 w-2 rounded-full border-2 border-white"></span>
          </button>
          <button className="text-forest rounded-full bg-white p-2.5 shadow-sm md:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="bg-sand hidden h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-md md:block">
            <img src={DEFAULT_PROFILE_PIC} alt="User" />
          </div>
        </div>
      </header>
      <PlantDashboard plantFilter={searchText} />
    </div>
  );
}
