import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Vital } from "@/data/gql/graphql";

const defaultData: Array<Partial<Vital>> = [
  {
    date: "May",
    healthPct: 10,
  },
  {
    date: "Jun",
    healthPct: 45,
  },
  {
    date: "Jul",
    healthPct: 52,
  },
  {
    date: "Aug",
    healthPct: 30,
  },
  {
    date: "Sep",
    healthPct: 50,
  },
  {
    date: "Oct",
    healthPct: 25,
  },
  {
    date: "Nov",
    healthPct: 78,
  },
];

export function VitalGraph({ data = defaultData, miniDisplay = false }) {
  return (
    <AreaChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 10,
        left: -20,
        bottom: 0,
      }}
    >
      <defs>
        <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="sage" stopOpacity={0.3} />
          <stop offset="95%" stopColor="sage" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="sand" />
      {!miniDisplay && (
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ color: "sage", fontSize: 12 }}
          dy={10}
        />
      )}
      {!miniDisplay && (
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ color: "sage", fontSize: 12 }}
        />
      )}
      {!miniDisplay && (
        <Tooltip
          contentStyle={{
            backgroundColor: "cream",
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            color: "forest",
          }}
          itemStyle={{ color: "forest" }}
        />
      )}
      <Area
        type="monotone"
        dataKey="healthPct"
        stroke="forest"
        strokeWidth={3}
        fillOpacity={1}
        fill="url(#colorHeight)"
      />
    </AreaChart>
  );
}
