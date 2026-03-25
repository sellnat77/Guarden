import { ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { VitalGraph } from "./VitalGraph";
import { client } from "@/util/graphqlClient";
import { getAllVitals } from "@/data/vitalsData";

export function HealthTracker() {
  const { t } = useTranslation();

  const { data: getAllVitalsForGraph } = useQuery({
    queryKey: [`getAllVitals`],
    queryFn: async () => {
      return await client.request(getAllVitals);
    },
  });

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

      <div className="h-32 min-h-0 min-w-0 flex-1">
        <ResponsiveContainer width="100%" height={150}>
          <VitalGraph data={getAllVitalsForGraph?.vital.getVitals} />
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
