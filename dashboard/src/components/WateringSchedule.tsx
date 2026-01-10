import { useTranslation } from "react-i18next";
import { Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { DEFAULT_LOCALE } from "@/i18n/config";
const days = [
  {
    day: "Mon",
    date: "23",
    plants: [],
  },
  {
    day: "Tue",
    date: "24",
    plants: ["Monstera", "Pothos"],
  },
  {
    day: "Wed",
    date: "25",
    plants: [],
  },
  {
    day: "Thu",
    date: "26",
    plants: ["Snake Plant"],
  },
  {
    day: "Fri",
    date: "27",
    plants: ["Fiddle Leaf", "Rubber Plant"],
    active: true,
  },
  {
    day: "Sat",
    date: "28",
    plants: [],
  },
  {
    day: "Sun",
    date: "29",
    plants: ["Peace Lily"],
  },
];
export function WateringSchedule() {
  const { t } = useTranslation();
  const userLocale = navigator.language || DEFAULT_LOCALE;
  const today = new Date().toLocaleDateString(userLocale);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.3,
      }}
      className="bg-forest text-cream relative overflow-hidden rounded-4xl p-8 shadow-[0_8px_30px_rgb(74,93,79,0.2)]"
    >
      {/* Decorative background circle */}
      <div className="bg-sage absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 transform rounded-full opacity-20 blur-3xl"></div>

      <div className="relative z-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h3 className="mb-1 font-serif text-2xl">
              {t("watering_schedule_title")}
            </h3>
            <p className="text-sand text-sm opacity-80">{today}</p>
          </div>
          <button className="bg-terracotta shadow-terracotta/30 hover:bg-dark-terracotta rounded-full px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors">
            {t("view_month_button")}
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div key={day.day} className="flex flex-col items-center">
              <span className="mb-2 text-xs opacity-60">{day.day}</span>
              <div
                className={`flex aspect-3/4 w-full flex-col items-center justify-start rounded-[20px] pt-3 transition-all duration-300 ${day.active ? "bg-cream text-forest scale-105 shadow-lg" : "bg-sage/20 hover:bg-sage/30"}`}
              >
                <span
                  className={`mb-2 text-lg font-bold ${day.active ? "text-forest" : "text-cream"}`}
                >
                  {day.date}
                </span>

                <div className="flex w-full flex-col gap-1 px-2">
                  {day.plants.map((plant, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-full rounded-full ${day.active ? "bg-terracotta" : "bg-sand/40"}`}
                      title={plant}
                    />
                  ))}
                  {day.plants.length > 0 && (
                    <div className="mt-1 flex justify-center">
                      <Droplets
                        className={`h-3 w-3 ${day.active ? "text-terracotta" : "text-sand/60"}`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
