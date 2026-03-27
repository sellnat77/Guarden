import { daysSince, formatDate, urgencyClass } from "./util";

interface CareRowProps {
  icon: string;
  label: string;
  lastDate: string | null;
  frequencyDays: number;
}

export function CareRow({ icon, label, lastDate, frequencyDays }: CareRowProps) {
  const days = daysSince(lastDate);
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <div>
          <p className="text-sm font-medium text-gray-800">{label}</p>
          <p className="text-xs text-gray-400">Every {frequencyDays}d</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <p className="text-xs text-gray-500">{formatDate(lastDate)}</p>
        {days !== null && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${urgencyClass(days, frequencyDays)}`}>
            {days === 0 ? "Today" : `${days}d ago`}
          </span>
        )}
      </div>
    </div>
  );
}
