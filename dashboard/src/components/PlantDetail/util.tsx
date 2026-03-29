import { CircleSlash, CloudSun, Moon, Sun, SunDim, SunMedium, Sunset } from "lucide-react";
import { GeneralHealthEnum, LightLevelsEnum } from "@/data/gql/graphql";

export function daysSince(iso: string | null) {
  if (!iso) return null;
  return Math.floor((new Date().getTime() - new Date(iso).getTime()) / 86400000);
}

export function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export const getHealthColor = (health: GeneralHealthEnum) => {
  switch (health) {
    case GeneralHealthEnum.Healthy:
      return "bg-cream text-forest";
    case GeneralHealthEnum.Stressed:
    case GeneralHealthEnum.Diseased:
    case GeneralHealthEnum.PestInfested:
    case GeneralHealthEnum.NutrientDeficient:
    case GeneralHealthEnum.WaterStressed:
    case GeneralHealthEnum.RootBound:
    case GeneralHealthEnum.Wilting:
      return "bg-cream text-dark-terracotta";
    case GeneralHealthEnum.FoliarBurn:
    case GeneralHealthEnum.SicklyYellowLeaves:
    case GeneralHealthEnum.BrownEdges:
    case GeneralHealthEnum.FlowerDrop:
    case GeneralHealthEnum.SlowGrowth:
    case GeneralHealthEnum.LeafSpot:
      return "bg-cream text-brown";
    default:
      return "bg-gray-400";
  }
};

export const getLightLabel = (light: LightLevelsEnum) => {
  switch (light) {
    case LightLevelsEnum.Bright:
      return <SunMedium/>;
    case LightLevelsEnum.Dark:
      return <Moon/>;
    case LightLevelsEnum.FullSun:
      return <Sun/>;
    case LightLevelsEnum.Low:
      return <SunDim/>;
    case LightLevelsEnum.Partial:
      return <CloudSun/>;
    case LightLevelsEnum.Shady:
      return <Sunset/>;
    case LightLevelsEnum.Zero:
      return <CircleSlash/>;
    default:
      return <Sun/>;
  }
};

export function urgencyClass(days: number | null, freq: number) {
  if (days === null || !freq) return "bg-sand text-dark-forest";
  const r = days / freq;
  if (r >= 1)    return "bg-cream text-terracotta";
  if (r >= 0.75) return "bg-cream text-brown";
  return "bg-cream text-forest";
}

export function healthBarColor(pct: number) {
  if (pct >= 80) return "bg-forest";
  if (pct >= 55) return "bg-brown";
  return "bg-dark-terracotta";
}
