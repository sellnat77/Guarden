import { useTranslation } from "react-i18next";
import { Sun } from "lucide-react";
import { Field, Slider } from "@base-ui/react";
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
        <Field.Root name="lightReqs">
          <Slider.Root
            min={0}
            max={lightLevels.length - 1}
            step={1}
            className="relative flex h-12 items-center overflow-hidden rounded-xl px-5"
            onValueChange={setLightValue}
          >
            <Slider.Control className="flex w-full touch-none items-center py-3 select-none">
              <Slider.Track className="bg-cream h-10 w-full rounded select-none">
                <Slider.Indicator className="from-sand/20 to-sand rounded bg-linear-to-r select-none" />
                <Slider.Thumb
                  aria-label={t("intensity")}
                  className="outline-dark-forest h-8 w-5 rounded-full bg-white outline-2 select-none"
                />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </Field.Root>
      </div>
    </>
  );
}
