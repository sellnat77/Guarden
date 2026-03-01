import { Field } from "@base-ui/react/field";
import { Button } from "@base-ui/react/button";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup, Select } from "@base-ui/react";
import { Form } from "@base-ui/react/form";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckIcon,
  ChevronDown,
  Droplets,
  Sprout,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { BUCKETS, lightLevels, wateringSchedules } from "./Base";
import { LightSelector } from "./LightSelector";
import { UploadImage } from "./UploadImage";
import { handleSignedImageUpload } from "./util";
import type { AddPlantInput } from "@/data/plantsData";
import type { PlantLocation } from "@/data/locationsData";
import type { GenerateUploadUrlInput } from "@/data/imageData";
import { getLocations } from "@/data/locationsData";
import { addPlants } from "@/data/plantsData";
import { getUploadUrl } from "@/data/imageData";

export function AddPlantForm() {
  const navigate = useNavigate();
  const { t } = useTranslation("addPlant");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [lightValue, setLightValue] = useState(
    Math.round((lightLevels.length - 1) / 2),
  );

  const { data: fetchAllLocationsData } = useQuery({
    queryKey: ["fetchAllLocations"],
    queryFn: async () =>
      request(
        `${import.meta.env.VITE_GD_GRAPHQL_SERVER}/graphql`,
        getLocations,
      ),
  });

  const { mutateAsync: generateUploadUrl } = useMutation({
    mutationKey: ["generateUrl"],
    mutationFn: async (payload: { urlInput: GenerateUploadUrlInput }) =>
      await request(
        `${import.meta.env.VITE_GD_GRAPHQL_SERVER}/graphql`,
        getUploadUrl,
        payload,
      ),
  });

  const { mutate: addNewPlant } = useMutation({
    mutationKey: ["addPlant"],
    mutationFn: async (payload: { addPlantInput: AddPlantInput }) =>
      request(
        `${import.meta.env.VITE_GD_GRAPHQL_SERVER}/graphql`,
        addPlants,
        payload,
      ),
  });

  const locations =
    fetchAllLocationsData?.locations.map((location: PlantLocation) => {
      return { label: location.name, value: location.id };
    }) || [];

  const handleFormSubmit = (formValues: Record<string, any>) => {
    const handleSubmit = async () => {
      const publicUrl = await handleSignedImageUpload(
        imageFile,
        generateUploadUrl,
        BUCKETS.plant,
      );
      console.log(formValues);
      let frequency = 1;
      switch (formValues.waterReqs) {
        case "Daily":
          frequency = 1;
          break;
        case "weekly":
          frequency = 7;
          break;
        case "monthly":
          frequency = 30;
          break;
        default:
          frequency = 1;
          break;
      }
      const today = new Date().toISOString();
      const newPlant: AddPlantInput = {
        name: formValues.name,
        species: formValues.species,
        image:
          publicUrl ||
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
        generalHealth: "healthy",
        description: formValues.description || "testDescription",
        fertilizeFrequencyDays: frequency,
        pruneFrequencyDays: frequency,
        repotFrequencyDays: frequency,
        lastFertilized: today,
        lastPruned: today,
        lastRepotted: today,
        lastWatered: today,
        waterFrequencyDays: frequency,
        locationId: parseInt(formValues.locationId),
        createdById: 1,
      };
      console.log("adding new plant", { newPlant });
      addNewPlant({ addPlantInput: newPlant });
      navigate({ to: "/" });
    };
    handleSubmit();
  };

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

          <Form
            className="relative z-10 space-y-8"
            onFormSubmit={handleFormSubmit}
          >
            {/* Image Upload */}
            <UploadImage setImageFile={setImageFile} />

            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field.Root name="name" className="space-y-2">
                <Field.Label className="text-forest ml-1 text-sm font-bold">
                  {t("nickname")}
                </Field.Label>
                <Field.Control
                  type="text"
                  placeholder={t("nickname_hint")}
                  required
                  className="bg-cream text-forest focus:ring-forest/20 placeholder-brown/40 w-full rounded-2xl border-none px-4 py-3 transition-all outline-none focus:ring-2"
                />
              </Field.Root>
              <Field.Root name="species" className="space-y-2">
                <Field.Label className="text-forest ml-1 text-sm font-bold">
                  {t("species")}
                </Field.Label>
                <div className="relative">
                  <Field.Control
                    type="text"
                    placeholder={t("species_hint")}
                    required
                    className="bg-cream text-forest focus:ring-forest/20 placeholder-brown/40 w-full rounded-2xl border-none px-4 py-3 pl-11 transition-all outline-none focus:ring-2"
                  />
                  <Sprout className="text-brown/50 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                </div>
              </Field.Root>
            </div>

            {/* Care Requirements */}
            <div className="space-y-6 pt-4">
              <h3 className="border-sand text-forest border-b pb-2 font-serif text-lg font-bold">
                {t("care_reqs")}
              </h3>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Water */}
                <Field.Root
                  name="waterReqs"
                  className="bg-cream/50 space-y-4 rounded-2xl p-5"
                >
                  <div className="text-forest flex items-center gap-2 font-bold">
                    <Droplets className="text-terracotta h-5 w-5" />
                    <span>{t("watering_schedule")}</span>
                  </div>
                  <div className="space-y-3">
                    <RadioGroup>
                      <Field.Label className="text-brown text-sm">
                        {t("frequency")}
                      </Field.Label>
                      <div className="flex gap-2">
                        {wateringSchedules.map((freqKey) => (
                          <Radio.Root
                            key={freqKey}
                            className="border-sand hover:border-forest focus:bg-forest text-brown flex-1 rounded-xl border bg-white py-2 text-center text-sm font-medium transition-all focus:text-white"
                            value={t(freqKey, { ns: "baseForms" })}
                          >
                            {t(freqKey, { ns: "baseForms" })}
                          </Radio.Root>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </Field.Root>

                {/* Light */}
                <Field.Root
                  name="lightReqs"
                  className="bg-cream/50 space-y-4 rounded-2xl p-5"
                >
                  <LightSelector
                    title={t("light_needs")}
                    lightValue={lightValue}
                    setLightValue={setLightValue}
                  />
                </Field.Root>
              </div>
            </div>

            {/* Location Dropdown */}
            <Field.Root name="locationId" className="space-y-2">
              <Field.Label className="text-forest ml-1 text-sm font-bold">
                {t("assign_location")}
              </Field.Label>
              <Select.Root items={locations}>
                <Select.Trigger className="flex h-10 min-w-40 items-center justify-between gap-3 rounded-md border border-gray-200 bg-[canvas] pr-3 pl-3.5 text-base text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-blue-800 data-popup-open:bg-gray-100">
                  <Select.Value
                    className="data-placeholder:opacity-60"
                    placeholder={locations[0]?.name}
                  />
                  <Select.Icon className="flex">
                    <ChevronDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Positioner
                    className="z-10 outline-none select-none"
                    sideOffset={8}
                  >
                    <Select.Popup className="bg-cream text-forest focus:ring-forest/20 w-full cursor-pointer appearance-none rounded-2xl border-none px-4 py-3 transition-all outline-none focus:ring-2">
                      <Select.ScrollUpArrow />
                      <Select.List className="max-h-var(--available-height) relative scroll-py-6 overflow-y-auto py-1">
                        {locations.map(
                          ({
                            label,
                            value,
                          }: {
                            label: string;
                            value: number;
                          }) => (
                            <Select.Item key={value} value={value}>
                              <Select.ItemIndicator className="col-start-1">
                                <CheckIcon className="size-3" />
                              </Select.ItemIndicator>
                              <Select.ItemText className="col-start-2">
                                {label}
                              </Select.ItemText>
                            </Select.Item>
                          ),
                        )}
                      </Select.List>
                      <Select.ScrollDownArrow className="bottom-0 z-1 flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-['']" />
                    </Select.Popup>
                  </Select.Positioner>
                </Select.Portal>
              </Select.Root>
            </Field.Root>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="hover:bg-dark-forest text-cream bg-forest shadow-forest/20 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-serif text-lg font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Sprout className="h-6 w-6" />
                {t("add_to_jungle")}
              </Button>
            </div>
          </Form>
        </div>
      </motion.main>
    </div>
  );
}
