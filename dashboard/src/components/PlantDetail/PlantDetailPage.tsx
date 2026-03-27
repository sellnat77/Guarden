import { Button } from "@base-ui/react";
import {
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CareRow } from "./CareRow";
import { VitalRow } from "./VitalRow";
import { LIGHT_LABELS, getHealthColor } from "./util";
import { getPlantDetails } from "@/data/queries";
import { client } from "@/util/graphqlClient";

interface PlantDetailProps {
  plantId: string;
}
export function PlantDetailPage({
  plantId,
}: PlantDetailProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: plantDetail} = useQuery({
    queryKey: ["getPlantDetail", plantId],
    queryFn: async () => await client.request(getPlantDetails,{ plantId: parseInt(plantId) })
  });

  const plant = plantDetail?.plant.getPlants[0];
  if (!plant) return null;
  const vitals = plant.vitals.edges;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-12">
      {/* Header */}
      <header className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-6 md:px-8">
        <Button
          onClick={() => navigate({ to: "/" })}
          className="border-sand text-forest rounded-full border bg-white p-2.5 shadow-sm transition-all hover:shadow-md"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-forest font-serif text-2xl font-bold">
          {t("plant_detail_header")}
        </h1>
      </header>

      <motion.main
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mx-auto max-w-3xl px-4 md:px-8"
      >
        <div className="border-sand/50 relative overflow-hidden rounded-4xl border bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] md:p-10">
          {/* Decorative background element */}
          <div className="bg-sand/20 pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
          <div className="max-w-3xl mx-auto p-4 space-y-4">

            {/* Hero */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row">
              <img
                src={plant.image || "https://via.placeholder.com/260x220?text=No+Image"}
                alt={plant.name}
                className="w-full sm:w-60 h-52 sm:h-auto object-cover"
              />
              <div className="p-5 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h1 className="text-xl font-semibold text-gray-900">{plant.name}</h1>
                      <p className="text-sm italic text-gray-400">{plant.species}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${getHealthColor(plant.generalHealth)}`}>
                      {plant.generalHealth}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{plant.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    LIGHT_LABELS[plant.lightRequirements || 0],
                    `📍 Location #${plant.locationId}`,
                    `🪴 Plant #${plant.id}`,
                  ].map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Care + Vitals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 className="text-sm font-semibold text-gray-700 mb-1">🌿 Care Schedule</h2>
                <p className="text-xs text-gray-400 mb-3">Last activity &amp; frequency</p>
                <CareRow icon="💧" label="Watering"    lastDate={plant.lastWatered}    frequencyDays={plant.waterFrequencyDays} />
                <CareRow icon="🌱" label="Fertilizing" lastDate={plant.lastFertilized} frequencyDays={plant.fertilizeFrequencyDays} />
                <CareRow icon="✂️" label="Pruning"     lastDate={plant.lastPruned}     frequencyDays={plant.pruneFrequencyDays} />
                <CareRow icon="🪣" label="Repotting"   lastDate={plant.lastRepotted}   frequencyDays={plant.repotFrequencyDays} />
              </div>

              <div className="rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 className="text-sm font-semibold text-gray-700 mb-1">📊 Vitals History</h2>
                <p className="text-xs text-gray-400 mb-3">Health readings over time</p>
                {vitals.length === 0
                  ? <p className="text-xs text-gray-400 text-center py-6">No vitals recorded yet.</p>
                  : vitals.map((v) => <VitalRow key={v.node.id} node={v.node} />)
                }
              </div>
            </div>

          </div>
        </div>
      </motion.main>
    </div>
  );
}
