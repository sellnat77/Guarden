import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bell, Leaf, Menu as MenuIcon, Search } from "lucide-react";
import "../../App.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Menu } from "@base-ui/react";
import { PlantDashboard } from "../../components/Dashboard";
import type { ChangeEvent } from "react";
import { useAuth } from "@/auth";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

const DEFAULT_PROFILE_PIC =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200";

function RouteComponent() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { logout, user } = useAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const handleSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value);
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
            <MenuIcon className="h-5 w-5" />
          </button>
          <div className="bg-sand hidden h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-md md:block">
            <Menu.Root>
              <Menu.Trigger>
                <img
                  src={user?.profilePicture || DEFAULT_PROFILE_PIC}
                  alt="User"
                />
              </Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner className="outline-none" sideOffset={8}>
                  <Menu.Popup className="origin--transform-origin rounded-4xl bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
                    <Menu.Item
                      onClick={handleLogout}
                      className="data-highlighted:before:bg-terracotta flex cursor-default rounded-4xl py-2 pr-8 pl-4 text-sm leading-4 outline-none select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-4xl"
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>
          </div>
        </div>
      </header>
      <PlantDashboard plantFilter={searchText} />
    </div>
  );
}
