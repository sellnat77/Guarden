
export function daysSince(iso: string | null) {
  if (!iso) return null;
  return Math.floor((new Date().getTime() - new Date(iso).getTime()) / 86400000);
}

export function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export const getHealthColor = (health: string) => {
  switch (health) {
    case "healthy":
      return "bg-sage text-white";
    case "needs-attention":
      return "bg-terracotta text-white";
    case "critical":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-400";
  }
};

export const LIGHT_LABELS = [
        "☀️ Full Sun",
 "🌤 Bright Indirect",
"🌥 Low Light",
           "🌑 Shade",
];

export function urgencyClass(days: number | null, freq: number) {
  if (days === null || !freq) return "bg-gray-100 text-gray-600";
  const r = days / freq;
  if (r >= 1)    return "bg-red-100 text-red-700";
  if (r >= 0.75) return "bg-yellow-100 text-yellow-700";
  return "bg-green-100 text-green-700";
}

export function healthBarColor(pct: number) {
  if (pct >= 80) return "bg-green-500";
  if (pct >= 55) return "bg-yellow-400";
  return "bg-red-500";
}
