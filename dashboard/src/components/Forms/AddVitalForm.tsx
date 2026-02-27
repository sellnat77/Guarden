import { useLocation, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Stethoscope } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Field, Form } from "@base-ui/react";
import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";
import { UploadImage } from "./UploadImage";
import { handleSignedImageUpload } from "./util";
import type { GenerateUploadUrlInput } from "@/data/imageData";
import type { AddVitalInput } from "@/data/vitalsData";
import { getUploadUrl } from "@/data/imageData";
import { BUCKET, addVitals } from "@/data/vitalsData";

export function AddVitalForm() {
  const location = useLocation({
    select: (loc) => loc.state,
  });

  const plantId = location.plantId;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation("addVital");

  const { mutate: addNewVital } = useMutation({
    mutationKey: ["addVital"],
    mutationFn: async (payload: { vitalInput: AddVitalInput }) =>
      await request(
        `${import.meta.env.VITE_GD_GRAPHQL_SERVER}/graphql`,
        addVitals,
        payload,
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

  const handleAddVital = (formValues: Record<string, any>) => {
    const handleVital = async () => {
      const publicUrl = await handleSignedImageUpload(
        imageFile,
        generateUploadUrl,
        BUCKET,
      );
      console.log(formValues);

      const addNewVitalParams: AddVitalInput = {
        plantId: plantId,
        image: publicUrl,
        notes: formValues.notes,
        healthPct: Math.round(Math.random() * 100),
        date: new Date().toISOString(),
      };

      console.log("++++++++++");
      console.log(addNewVitalParams);
      console.log("++++++++++");
      addNewVital({ vitalInput: addNewVitalParams });
      navigate({ to: "/" });
    };
    handleVital();
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

          <Form
            className="relative z-10 space-y-8"
            onFormSubmit={handleAddVital}
          >
            {/* Image Upload */}
            <UploadImage setImageFile={setImageFile} />

            {/* Notes */}
            <Field.Root name="notes" className="space-y-2">
              <Field.Label className="text-forest ml-1 text-sm font-bold">
                {t("notes")}
              </Field.Label>
              <Field.Control
                render={<textarea rows={3} />}
                placeholder={t("notes_hint")}
                className="bg-cream text-forest focus:ring-forest/20 placeholder-brown/40 w-full resize-none rounded-2xl border-none px-4 py-3 transition-all outline-none focus:ring-2"
              />
            </Field.Root>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="hover:bg-dark-forest text-cream bg-forest shadow-forest/20 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-serif text-lg font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Stethoscope className="h-6 w-6" />
                {t("create_vital")}
              </Button>
            </div>
          </Form>
        </div>
      </motion.main>
    </div>
  );
}
