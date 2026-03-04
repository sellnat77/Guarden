import { motion } from "framer-motion";
import { Button } from "@base-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";

export function Landing() {
  const navigate = useNavigate();
  const { t } = useTranslation("landing");
  return (
    <div className="min-h-screen content-center bg-[#FDFBF7] pb-12">
      <header className="mx-auto flex max-w-3xl items-center justify-center gap-4 px-4 py-6 text-center md:px-8">
        <h1 className="text-forest font-serif text-2xl font-bold">
          {t("landing_header")}
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
        <div className="relative z-10 space-y-8">
          <div className="border-sand/50 relative space-y-8 overflow-hidden rounded-4xl border bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] md:p-10">
            <Button
              onClick={() => {
                navigate({ to: "/login" });
              }}
              className="hover:bg-dark-forest text-cream bg-forest shadow-forest/20 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-serif text-lg font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              {t("login")}
            </Button>
            <Button
              onClick={() => {
                navigate({ to: "/register" });
              }}
              className="hover:bg-dark-forest text-cream bg-forest shadow-forest/20 flex w-full items-center justify-center gap-2 space-y-5 rounded-2xl py-4 font-serif text-lg font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              {t("register")}
            </Button>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
