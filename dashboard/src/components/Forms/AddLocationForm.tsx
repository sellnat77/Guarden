import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, HouseHeart, Thermometer, Wind } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";
import { lightLevels } from "./Base";
import { LightSelector } from "./LightSelector";
import type {AddLocationInput} from "@/data/locationsData";
import {  addLocations } from "@/data/locationsData";

export function AddLocationForm() {
  const { mutate: addNewLocation } = useMutation({
    mutationKey: ["addLocation"],
    mutationFn: async (payload: { locationInput: AddLocationInput }) =>
      request(
        `${import.meta.env.VITE_GD_GRAPHQL_SERVER}/graphql`,
        addLocations,
        payload,
      ),
  });

  const navigate = useNavigate();
  const { t } = useTranslation("addLocation");
  const [locationName, setLocationName] = useState<string | undefined>(
    undefined,
  );
  const [isIndoor, setIsIndoor] = useState(true);
  const [lightValue, setLightValue] = useState(
    Math.round((lightLevels.length - 1) / 2),
  );
  const [avgTemp, setAvgTemp] = useState<number | undefined>(undefined);
  const [avgHumidity, setAvgHumidity] = useState<number | undefined>(undefined);
  const [notes, setNotes] = useState<string | undefined>(undefined);
  const lightDescription = t(lightLevels[lightValue], { ns: "baseForms" });

  const handleCreateLocation = () => {
    alert(
      `Creating location with \nName: ${locationName}\n${isIndoor ? "Indoor" : "Outdoor"}\nLightLevel:${lightDescription}\ntemp${avgTemp}\nhumidity${avgHumidity}\nnotes${notes}`,
    );
    if (locationName) {
      addNewLocation({ locationInput: { name: locationName } });
    }
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-12">
      {/* Header */}
      <header className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-6 md:px-8">
        <button
          onClick={() => navigate({ to: "/" })}
          className="border-sand text-forest rounded-full border bg-white p-2.5 shadow-sm transition-all hover:shadow-md"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-forest font-serif text-2xl font-bold">
          {t("header")}
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
          <div className="bg-terracotta/5 pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl" />

          <form className="relative z-10 space-y-8">
            {/* Location Name & Type */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-forest ml-1 text-sm font-bold">
                  {t("location_name")}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("location_name_hint")}
                    value={locationName}
                    onChange={(e) => {
                      setLocationName(e.currentTarget.value);
                    }}
                    className="bg-cream text-forest focus:ring-forest/20 placeholder-brown/40 w-full rounded-2xl border-none px-4 py-3 pl-11 transition-all outline-none focus:ring-2"
                  />
                  <HouseHeart className="text-brown/50 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    className="peer sr-only"
                    checked={isIndoor}
                    onChange={() => setIsIndoor(true)}
                  />
                  <div className="border-sand peer-checked:border-forest peer-checked:bg-forest/5 rounded-2xl border-2 p-4 text-center transition-all">
                    <span className="text-forest font-serif font-bold">
                      {t("indoor_radio")}
                    </span>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    className="peer sr-only"
                    checked={!isIndoor}
                    onChange={() => setIsIndoor(false)}
                  />
                  <div className="border-sand peer-checked:border-forest peer-checked:bg-forest/5 rounded-2xl border-2 p-4 text-center transition-all">
                    <span className="text-forest font-serif font-bold">
                      {t("outdoor_radio")}
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Environment Stats */}
            <div className="space-y-6 pt-4">
              <LightSelector
                title={t("env_conditions")}
                lightValue={lightValue}
                setLightValue={setLightValue}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Temperature */}
                <div className="space-y-2">
                  <div className="text-forest flex items-center gap-2 text-sm font-bold">
                    <Thermometer className="text-terracotta h-4 w-4" />
                    <span>{t("avg_temp")}</span>
                  </div>
                  <div className="bg-cream flex items-center gap-3 rounded-2xl p-3">
                    <input
                      type="number"
                      placeholder={t("avg_temp_hint")}
                      value={avgTemp}
                      onChange={(e) => {
                        setAvgTemp(parseInt(e.currentTarget.value));
                      }}
                      className="text-forest w-full bg-transparent text-center text-xl font-bold outline-none"
                    />
                    <span className="text-brown pr-2 font-medium">°C</span>
                  </div>
                </div>

                {/* Humidity */}
                <div className="space-y-2">
                  <div className="text-forest flex items-center gap-2 text-sm font-bold">
                    <Wind className="text-brown h-4 w-4" />
                    <span>{t("avg_humidity")}</span>
                  </div>
                  <div className="bg-cream flex items-center gap-3 rounded-2xl p-3">
                    <input
                      type="number"
                      placeholder={t("avg_humidity_hint")}
                      value={avgHumidity}
                      onChange={(e) => {
                        setAvgHumidity(parseInt(e.currentTarget.value));
                      }}
                      className="text-forest w-full bg-transparent text-center text-xl font-bold outline-none"
                    />
                    <span className="text-brown pr-2 font-medium">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-forest ml-1 text-sm font-bold">
                {t("notes")}
              </label>
              <textarea
                placeholder={t("notes_hint")}
                rows={3}
                value={notes}
                onChange={(e) => {
                  setNotes(e.currentTarget.value);
                }}
                className="bg-cream text-forest focus:ring-forest/20 placeholder-brown/40 w-full resize-none rounded-2xl border-none px-4 py-3 transition-all outline-none focus:ring-2"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleCreateLocation}
                className="hover:bg-dark-forest text-cream bg-forest shadow-forest/20 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-serif text-lg font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <HouseHeart className="h-6 w-6" />
                {t("create_location")}
              </button>
            </div>
          </form>
        </div>
      </motion.main>
    </div>
  );
}
