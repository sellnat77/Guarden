import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, UserPlus } from "lucide-react";

import { useTranslation } from "react-i18next";
import { Button, Field, Form, Input } from "@base-ui/react";

export function RegisterForm() {
  const navigate = useNavigate();
  const { t } = useTranslation("register");

  const handleRegisterSubmit = (formValues: Record<string, any>) => {
    console.log(formValues);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen content-center bg-[#FDFBF7] pb-12">
      {/* Header */}
      <header className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-6 md:px-8">
        <button
          onClick={() => navigate({ to: "/" })}
          className="border-sand text-forest rounded-full border bg-white p-2.5 shadow-sm transition-all hover:shadow-md"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-forest font-serif text-2xl font-bold">
          {t("register_header")}
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
            onFormSubmit={handleRegisterSubmit}
          >
            <Field.Root name="username" className="space-y-2">
              <Field.Label className="text-forest ml-1 text-sm font-bold">
                {t("username")}
              </Field.Label>
              <Field.Control
                render={<Input />}
                placeholder={t("username_hint")}
                className="bg-cream text-forest focus:ring-forest/20 placeholder-brown/40 w-full resize-none rounded-2xl border-none px-4 py-3 transition-all outline-none focus:ring-2"
              />
            </Field.Root>
            <Field.Root name="email" className="space-y-2">
              <Field.Label className="text-forest ml-1 text-sm font-bold">
                {t("email")}
              </Field.Label>
              <Field.Control
                render={<Input />}
                placeholder={t("email_hint")}
                className="bg-cream text-forest focus:ring-forest/20 placeholder-brown/40 w-full resize-none rounded-2xl border-none px-4 py-3 transition-all outline-none focus:ring-2"
              />
            </Field.Root>
            <Field.Root name="password" className="space-y-2">
              <Field.Label className="text-forest ml-1 text-sm font-bold">
                {t("password")}
              </Field.Label>
              <Field.Control
                render={<Input />}
                placeholder={t("password_hint")}
                className="bg-cream text-forest focus:ring-forest/20 placeholder-brown/40 w-full resize-none rounded-2xl border-none px-4 py-3 transition-all outline-none focus:ring-2"
              />
            </Field.Root>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="hover:bg-dark-forest text-cream bg-forest shadow-forest/20 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-serif text-lg font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <UserPlus className="h-6 w-6" />
                {t("register_button")}
              </Button>
            </div>
          </Form>
        </div>
      </motion.main>
    </div>
  );
}
