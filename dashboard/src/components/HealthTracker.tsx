import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const defaultData = [
  {
    name: "May",
    height: 10,
  },
  {
    name: "Jun",
    height: 45,
  },
  {
    name: "Jul",
    height: 52,
  },
  {
    name: "Aug",
    height: 30,
  },
  {
    name: "Sep",
    height: 50,
  },
  {
    name: "Oct",
    height: 25,
  },
  {
    name: "Nov",
    height: 78,
  },
];
export function HealthTracker({ data = defaultData }) {
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
        delay: 0.2,
      }}
      className="border-sand/50 flex h-full flex-col rounded-4xl border bg-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm"
    >
      <div className="mb-6">
        <h3 className="text-forest font-serif text-2xl">
          {t("health_tracker_title")}
        </h3>
        <p className="text-brown text-sm">{t("health_tracker_detail")}</p>
      </div>

      <div className="w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="sage" stopOpacity={0.3} />
                <stop offset="95%" stopColor="sage" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="sand"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                color: "sage",
                fontSize: 12,
              }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                color: "sage",
                fontSize: 12,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "cream",
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                color: "forest",
              }}
              itemStyle={{
                color: "forest",
              }}
            />
            <Area
              type="monotone"
              dataKey="height"
              stroke="forest"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorHeight)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
