"use client";

import {
  Line,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MonthlyMetric } from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function RevenueChart({ data }: { data: MonthlyMetric[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-sm font-semibold">Revenue & Orders</h2>
        <p className="text-xs text-gray-500">24-month trend, dual axis</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ left: -10, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
            interval={2}
          />
          <YAxis
            yAxisId="revenue"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
          />
          <YAxis
            yAxisId="orders"
            orientation="right"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value, name) =>
              name === "revenue"
                ? [formatCurrency(Number(value)), "Revenue"]
                : [formatNumber(Number(value)), "Orders"]
            }
            contentStyle={{
              borderRadius: 8,
              borderColor: "#e5e7eb",
              fontSize: 12,
            }}
          />
          <Bar yAxisId="orders" dataKey="orders" fill="#e5e7eb" radius={[4, 4, 0, 0]} barSize={14} />
          <Line
            yAxisId="revenue"
            type="monotone"
            dataKey="revenue"
            stroke="#111827"
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
