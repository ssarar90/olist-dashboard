import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

type KpiCardProps = {
  label: string;
  value: number;
  change: number;
  format: "currency" | "number";
};

export function KpiCard({ label, value, change, format }: KpiCardProps) {
  const isPositive = change >= 0;
  const formatted = format === "currency" ? formatCurrency(value) : formatNumber(value);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{formatted}</p>
      <div
        className={cn(
          "mt-2 inline-flex items-center gap-1 text-xs font-medium",
          isPositive ? "text-emerald-600" : "text-red-600"
        )}
      >
        {isPositive ? (
          <ArrowUpRight className="h-3.5 w-3.5" />
        ) : (
          <ArrowDownRight className="h-3.5 w-3.5" />
        )}
        {Math.abs(change).toFixed(1)}% YoY
      </div>
    </div>
  );
}
