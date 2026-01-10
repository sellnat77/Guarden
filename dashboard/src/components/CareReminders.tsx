import { Droplets, Scissors, Shovel, Sprout, CheckCircle2 } from "lucide-react";
import { plants } from "../data/plantsData";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { upcomingRoutines } from "@/data/routineData";
const getIcon = (type: string) => {
  switch (type) {
    case "water":
      return Droplets;
    case "prune":
      return Scissors;
    case "repot":
      return Shovel;
    default:
      return Sprout;
  }
};
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-terracotta text-white";
    case "medium":
      return "bg-sand text-brown";
    case "low":
      return "bg-cream text-sage";
    default:
      return "bg-gray-100 text-gray-500";
  }
};
export function CareReminders() {
  const userLocale = navigator.language || DEFAULT_LOCALE;
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="border-sand/50 h-full rounded-4xl border bg-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-forest font-serif text-2xl">
          {t("care_reminders_title")}
        </h3>
        <span className="text-brown bg-sand/30 rounded-full px-3 py-1 text-sm">
          {t("pending_task_count", { count: upcomingRoutines.length })}
        </span>
      </div>

      <div className="space-y-4">
        {upcomingRoutines.map((task, index) => {
          const plant = plants.find((p) => p.id === task.plantId);
          const Icon = getIcon(task.type);
          return (
            <motion.div
              key={task.id}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.1 + 0.2,
              }}
              className="group bg-cream/50 hover:bg-cream flex cursor-pointer items-center rounded-[20px] p-4 transition-colors duration-300"
            >
              <div
                className={`mr-4 rounded-full p-3 ${task.type === "water" ? "bg-terracotta/10 text-terracotta" : "bg-sage/10 text-forest"}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <h4 className="text-forest font-semibold">{plant?.name}</h4>
                <p className="text-brown text-sm capitalize">
                  {task.type} • Due{" "}
                  {new Date(task.dueDate).toLocaleDateString(userLocale, {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div
                className={`rounded-full px-3 py-1 text-xs font-medium ${getPriorityColor(task.priority)}`}
              >
                {task.priority}
              </div>

              <button
                className="text-sage ml-3 opacity-0 transition-opacity group-hover:opacity-100"
                aria-label={t("mark_task_complete_button")}
              >
                <CheckCircle2 className="h-6 w-6" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
