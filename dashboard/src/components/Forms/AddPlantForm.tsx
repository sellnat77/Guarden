import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Droplets, Sprout, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { lightLevels, wateringSchedules } from "./Base";
import { LightSelector } from "./LightSelector";

const defaultLocations = [
  "Living Room (South Window)",
  "Kitchen Shelf",
  "Bedroom Corner",
  "Balcony Garden",
];

export function AddPlantForm({ locations = defaultLocations }) {
  const navigate = useNavigate();
  const { t } = useTranslation("addPlant");
  const [nickname, setNickname] = useState<string | undefined>(undefined);
  const [species, setSpecies] = useState<string | undefined>(undefined);
  const [lightValue, setLightValue] = useState(
    Math.round((lightLevels.length - 1) / 2),
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          {t("add_new_plant")}
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

          <form className="relative z-10 space-y-8">
            {/* Image Upload */}
            <div className="flex flex-col items-center justify-center">
              <div className="group relative cursor-pointer">
                <div
                  className={`border-brown/30 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-all duration-300 ${imagePreview ? "border-none" : "bg-cream group-hover:bg-sand/50"}`}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt={t("preview")}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-brown/60 flex flex-col items-center">
                      <Camera className="mb-2 h-8 w-8" />
                      <span className="text-sm font-medium">
                        {t("add_photo")}
                      </span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <div className="bg-forest absolute right-1 bottom-1 rounded-full p-2 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <Upload className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-forest ml-1 text-sm font-bold">
                  {t("nickname")}
                </label>
                <input
                  type="text"
                  placeholder={t("nickname_hint")}
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.currentTarget.value);
                  }}
                  className="bg-cream text-forest focus:ring-forest/20 placeholder-brown/40 w-full rounded-2xl border-none px-4 py-3 transition-all outline-none focus:ring-2"
                />
              </div>
              <div className="space-y-2">
                <label className="text-forest ml-1 text-sm font-bold">
                  {t("species")}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("species_hint")}
                    value={species}
                    onChange={(e) => {
                      setSpecies(e.currentTarget.value);
                    }}
                    className="bg-cream text-forest focus:ring-forest/20 placeholder-brown/40 w-full rounded-2xl border-none px-4 py-3 pl-11 transition-all outline-none focus:ring-2"
                  />
                  <Sprout className="text-brown/50 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Care Requirements */}
            <div className="space-y-6 pt-4">
              <h3 className="border-sand text-forest border-b pb-2 font-serif text-lg font-bold">
                {t("care_reqs")}
              </h3>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Water */}
                <div className="bg-cream/50 space-y-4 rounded-2xl p-5">
                  <div className="text-forest flex items-center gap-2 font-bold">
                    <Droplets className="text-terracotta h-5 w-5" />
                    <span>{t("watering_schedule")}</span>
                  </div>
                  <div className="space-y-3">
                    <label className="text-brown text-sm">
                      {t("frequency")}
                    </label>
                    <div className="flex gap-2">
                      {wateringSchedules.map((freqKey) => (
                        <button
                          key={freqKey}
                          type="button"
                          className="border-sand hover:border-forest focus:bg-forest text-brown flex-1 rounded-xl border bg-white py-2 text-sm font-medium transition-all focus:text-white"
                        >
                          {t(freqKey, { ns: "baseForms" })}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Light */}
                <div className="bg-cream/50 space-y-4 rounded-2xl p-5">
                  <LightSelector
                    title={t("light_needs")}
                    lightValue={lightValue}
                    setLightValue={setLightValue}
                  />
                </div>
              </div>
            </div>

            {/* Location Dropdown */}
            <div className="space-y-2">
              <label className="text-forest ml-1 text-sm font-bold">
                {t("assign_location")}
              </label>
              <select className="bg-cream text-forest focus:ring-forest/20 w-full cursor-pointer appearance-none rounded-2xl border-none px-4 py-3 transition-all outline-none focus:ring-2">
                {locations.map((location: string) => {
                  return <option>{location}</option>;
                })}
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => navigate({ to: "/" })}
                className="hover:bg-dark-forest text-cream bg-forest shadow-forest/20 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-serif text-lg font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Sprout className="h-6 w-6" />
                {t("add_to_jungle")}
              </button>
            </div>
          </form>
        </div>
      </motion.main>
    </div>
  );
}
