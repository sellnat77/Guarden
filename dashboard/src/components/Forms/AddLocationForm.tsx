import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, HouseHeart, Sun, Thermometer, Wind } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ChangeEvent } from "react";

const lightLevels = [
  "no_light",
  "low_light",
  "indirect_sun",
  "direct_sun",
  "full_sun",
];

export function AddLocationForm() {
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
  const lightDescription = t(lightLevels[lightValue]);

  const handleLocationNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationName(e.currentTarget.value);
  };

  const handleLocationRadioChanged = (indoor: boolean) => {
    setIsIndoor(indoor);
  };
  const handleLightSliderChanged = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setLightValue(parseInt(e.currentTarget.value));
    console.log(lightDescription);
  };

  const handleAvgTempChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setAvgTemp(parseInt(e.currentTarget.value));
  };

  const handleAvgHumidityChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setAvgHumidity(parseInt(e.currentTarget.value));
  };

  const handleNotesChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.currentTarget.value);
  };

  const handleCreateLocation = () => {
    alert(
      `Creating location with \nName: ${locationName}\n${isIndoor ? "Indoor" : "Outdoor"}\nLightLevel:${lightDescription}\ntemp${avgTemp}\nhumidity${avgHumidity}\nnotes${notes}`,
    );
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-12">
      {/* Header */}
      <header className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-6 md:px-8">
        <button
          onClick={() => navigate({ to: "/" })}
          className="rounded-full border border-[#E8DCC4] bg-white p-2.5 text-[#4A5D4F] shadow-sm transition-all hover:shadow-md"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-serif text-2xl font-bold text-[#4A5D4F]">
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
        <div className="relative overflow-hidden rounded-4xl border border-[#E8DCC4]/50 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] md:p-10">
          {/* Decorative background element */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#D4735E]/5 blur-3xl" />

          <form className="relative z-10 space-y-8">
            {/* Location Name & Type */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-[#4A5D4F]">
                  {t("location_name")}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("location_name_hint")}
                    value={locationName}
                    onChange={handleLocationNameChange}
                    className="w-full rounded-2xl border-none bg-[#F5F1E8] px-4 py-3 pl-11 text-[#4A5D4F] placeholder-[#8B6F47]/40 transition-all outline-none focus:ring-2 focus:ring-[#4A5D4F]/20"
                  />
                  <HouseHeart className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8B6F47]/50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    className="peer sr-only"
                    checked={isIndoor}
                    onChange={() => handleLocationRadioChanged(true)}
                  />
                  <div className="rounded-2xl border-2 border-[#E8DCC4] p-4 text-center transition-all peer-checked:border-[#4A5D4F] peer-checked:bg-[#4A5D4F]/5">
                    <span className="font-serif font-bold text-[#4A5D4F]">
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
                    onChange={() => handleLocationRadioChanged(false)}
                  />
                  <div className="rounded-2xl border-2 border-[#E8DCC4] p-4 text-center transition-all peer-checked:border-[#4A5D4F] peer-checked:bg-[#4A5D4F]/5">
                    <span className="font-serif font-bold text-[#4A5D4F]">
                      {t("outdoor_radio")}
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Environment Stats */}
            <div className="space-y-6 pt-4">
              <h3 className="border-b border-[#E8DCC4] pb-2 font-serif text-lg font-bold text-[#4A5D4F]">
                {t("env_conditions")}
              </h3>

              {/* Light Level */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#4A5D4F]">
                    <Sun className="h-4 w-4 fill-[#E8DCC4] stroke-[#8B6F47] text-[#E8DCC4]" />
                    <span>{t("avg_light")}</span>
                  </div>
                  <span className="rounded-full bg-[#D4735E]/10 px-2 py-1 text-xs font-medium text-[#D4735E]">
                    {lightDescription}
                  </span>
                </div>
                <div className="relative flex h-12 items-center overflow-hidden rounded-xl bg-[#F5F1E8] px-2">
                  <div className="absolute top-0 bottom-0 left-0 w-full rounded-xl bg-linear-to-r from-[#E8DCC4] to-[#E8DCC4]/20" />
                  <input
                    min={0}
                    max={lightLevels.length - 1}
                    step={1}
                    value={lightValue}
                    onChange={handleLightSliderChanged}
                    type="range"
                    className="accent-terracotta relative z-10 h-full w-full cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Temperature */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#4A5D4F]">
                    <Thermometer className="h-4 w-4 text-[#D4735E]" />
                    <span>{t("avg_temp")}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-[#F5F1E8] p-3">
                    <input
                      type="number"
                      placeholder={t("avg_temp_hint")}
                      value={avgTemp}
                      onChange={handleAvgTempChanged}
                      className="w-full bg-transparent text-center text-xl font-bold text-[#4A5D4F] outline-none"
                    />
                    <span className="pr-2 font-medium text-[#8B6F47]">°C</span>
                  </div>
                </div>

                {/* Humidity */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#4A5D4F]">
                    <Wind className="h-4 w-4 text-[#8B6F47]" />
                    <span>{t("avg_humidity")}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-[#F5F1E8] p-3">
                    <input
                      type="number"
                      placeholder={t("avg_humidity_hint")}
                      value={avgHumidity}
                      onChange={handleAvgHumidityChanged}
                      className="w-full bg-transparent text-center text-xl font-bold text-[#4A5D4F] outline-none"
                    />
                    <span className="pr-2 font-medium text-[#8B6F47]">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="ml-1 text-sm font-bold text-[#4A5D4F]">
                {t("notes")}
              </label>
              <textarea
                placeholder={t("notes_hint")}
                rows={3}
                value={notes}
                onChange={handleNotesChanged}
                className="w-full resize-none rounded-2xl border-none bg-[#F5F1E8] px-4 py-3 text-[#4A5D4F] placeholder-[#8B6F47]/40 transition-all outline-none focus:ring-2 focus:ring-[#4A5D4F]/20"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleCreateLocation}
                className="hover:bg-dark-forest flex w-full items-center justify-center gap-2 rounded-2xl bg-[#4A5D4F] py-4 font-serif text-lg font-bold text-[#F5F1E8] shadow-lg shadow-[#4A5D4F]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
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
