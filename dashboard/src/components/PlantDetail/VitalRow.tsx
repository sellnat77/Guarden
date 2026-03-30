import { formatDate, healthBarColor } from "./util";

interface VitalRowProps {
  node: {
    date: string | null;
    healthPct: number;
    notes: string | null;
  };
}

export function VitalRow({ node }: VitalRowProps) {
  const { date, healthPct, notes } = node;

  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="flex justify-between items-center mb-1.5">
        <p className="text-xs text-gray-500">{formatDate(date)}</p>
        <p className={`text-xs font-bold ${healthPct >= 80 ? "text-forest" : healthPct >= 55 ? "text-brown" : "text-dark-terracotta"}`}>
          {healthPct}%
        </p>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${healthBarColor(healthPct)}`} style={{ width: `${healthPct}%` }} />
      </div>
      {notes && <p className="text-xs text-gray-500 italic mt-1.5">{notes}</p>}
    </div>
  );
}
