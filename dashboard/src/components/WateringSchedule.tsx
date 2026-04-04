import { useTranslation } from "react-i18next";
import { Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { PlantFragmentFragment } from "@/data/gql/graphql";

interface WateringScheduleProps {
  plants: Array<PlantFragmentFragment>;
}

const ONE_DAY = 1000 * 60 * 60 * 24;
const OVERDUE_THRESHOLD_DAYS = 7;

interface WateringDay {
  date: Date;
  plants: Array<PlantFragmentFragment & { isOverdue?: boolean }>;
}

function getWateringSchedule(plants: Array<PlantFragmentFragment>): Array<WateringDay> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days: Array<WateringDay> = [];
  for (let i = -3; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({ date, plants: [] });
  }

  const windowStart = days[0].date;
  const windowEnd = days[days.length - 1].date;

  for (const plant of plants) {
    if (!plant.lastWatered || !plant.waterFrequencyDays) continue;

    const lastWatered = new Date(plant.lastWatered);
    lastWatered.setHours(0, 0, 0, 0);

    const nextDue = new Date(lastWatered);
    nextDue.setDate(lastWatered.getDate() + plant.waterFrequencyDays);

    const daysOverdue = Math.floor((today.getTime() - nextDue.getTime()) / ONE_DAY);
    const isOverdue = daysOverdue >= OVERDUE_THRESHOLD_DAYS;

    // Overdue plants are pinned to today, otherwise skip if outside the window
    const targetDate = isOverdue ? today : nextDue;
    if (!isOverdue && (nextDue < windowStart || nextDue > windowEnd)) continue;

    const match = days.find(d => d.date.getTime() === targetDate.getTime());
    if (match) {
      match.plants.push(isOverdue ? { ...plant, isOverdue } : plant);
    }
  }

  return days;
}

export function WateringSchedule({ plants }: WateringScheduleProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const userLocale = navigator.language || DEFAULT_LOCALE;
  const today = new Date().toLocaleDateString(userLocale);
  const wateringSchedule: Array<WateringDay> = getWateringSchedule(plants)

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
          {wateringSchedule.map((day) => (
            <div key={day.date.getDay()} className="flex flex-col items-center">
              <span className={`mb-2 text-xs ${day.date.getDate() === new Date().getDate() ? "text-terracotta" : "text-sand"}`}>{day.date.toLocaleDateString(userLocale, { weekday: 'short' })}</span>
              <div
                className={`flex aspect-3/4 w-full flex-col items-center justify-start rounded-[20px] pt-3 transition-all duration-300 ${day.date.getDate() === new Date().getDate() ? "bg-cream text-forest scale-105 shadow-lg" : "bg-sage/20 hover:bg-sage/30"}`}
              >
                <span
                  className={`mb-2 text-lg font-bold ${day.date.getDate() === new Date().getDate() ? "text-terracotta" : "text-cream"}`}
                >
                  {day.date.getDate()}
                </span>

                <div className="flex w-full flex-col gap-1 px-2">
                  {day.plants.map((plant, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-full rounded-full ${plant.isOverdue ? "bg-terracotta" : "bg-water"}`}
                      title={plant.name}
                      onClick={() => { navigate({to: `/plant/${plant.id}/detail`})}}
                    />
                  ))}
                  {day.plants.length > 0 && (
                    <div className="mt-1 flex justify-center">
                      <Droplets
                        className={`h-4 w-4 text-water`}
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
