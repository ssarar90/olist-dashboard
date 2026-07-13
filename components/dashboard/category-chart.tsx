"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { CategorySales } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function CategoryChart({ data }: { data: CategorySales[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-sm font-semibold">Revenue by Category</h2>
        <p className="text-xs text-gray-500">Trailing 12 months</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
          />
          <YAxis
            type="category"
            dataKey="category"
            tick={{ fontSize: 11, fill: "#374151" }}
            axisLine={false}
            tickLine={false}
            width={110}
          />
          <Tooltip
            formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
            contentStyle={{ borderRadius: 8, borderColor: "#e5e7eb", fontSize: 12 }}
          />
          <Bar dataKey="revenue" fill="#111827" radius={[0, 4, 4, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
