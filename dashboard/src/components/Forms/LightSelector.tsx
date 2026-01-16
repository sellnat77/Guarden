import { useTranslation } from "react-i18next";
import { Sun } from "lucide-react";
import { lightLevels } from "./Base";

export function LightSelector({
  title = "title",
  lightValue,
  setLightValue,
}: {
  title: string;
  lightValue: number;
  setLightValue: (newValue: number) => void;
}) {
  const { t } = useTranslation("baseForms");
  const lightDescription = t(lightLevels[lightValue]);
  return (
    <>
      <h3 className="border-sand text-forest border-b pb-2 font-serif text-lg font-bold">
        {title}
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-forest flex items-center gap-2 text-sm font-bold">
            <Sun className="fill-sand text-sand stroke-brown h-4 w-4" />
            <span>{t("intensity")}</span>
          </div>
          <span className="bg-terracotta/10 text-terracotta rounded-full px-2 py-1 text-xs font-medium">
            {lightDescription}
          </span>
        </div>
        <div className="bg-cream relative flex h-12 items-center overflow-hidden rounded-xl px-2">
          <div className="from-sand to-sand/20 absolute top-0 bottom-0 left-0 w-full rounded-xl bg-linear-to-r" />
          <input
            min={0}
            max={lightLevels.length - 1}
            step={1}
            value={lightValue}
            onChange={(e) => {
              setLightValue(parseInt(e.currentTarget.value));
            }}
            type="range"
            className="accent-terracotta relative z-10 h-full w-full cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
