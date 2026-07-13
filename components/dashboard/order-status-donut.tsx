"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { OrderStatusBreakdown } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

const COLORS = ["#111827", "#4b5563", "#9ca3af", "#d1d5db", "#f3f4f6"];

export function OrderStatusDonut({ data }: { data: OrderStatusBreakdown[] }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-sm font-semibold">Order Status</h2>
        <p className="text-xs text-gray-500">{formatNumber(total)} total orders</p>
      </div>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((entry, i) => (
                <Cell key={entry.status} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [formatNumber(Number(value)), name]}
              contentStyle={{ borderRadius: 8, borderColor: "#e5e7eb", fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-2 space-y-1.5">
        {data.map((entry, i) => (
          <li key={entry.status} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-gray-600">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              {entry.status}
            </span>
            <span className="font-medium text-gray-900">{formatNumber(entry.count)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
