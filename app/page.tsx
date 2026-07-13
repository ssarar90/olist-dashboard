import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { OrderStatusDonut } from "@/components/dashboard/order-status-donut";
import { TopProductsTable } from "@/components/dashboard/top-products-table";
import { kpis, monthlyMetrics, categorySales, orderStatusBreakdown, topProducts } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 space-y-6 bg-gray-50 p-4 md:p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard {...kpis.revenue} />
            <KpiCard {...kpis.orders} />
            <KpiCard {...kpis.avgOrderValue} />
            <KpiCard {...kpis.customers} />
          </div>

          <RevenueChart data={monthlyMetrics} />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <CategoryChart data={categorySales} />
            <OrderStatusDonut data={orderStatusBreakdown} />
          </div>

          <TopProductsTable data={topProducts} />
        </main>
      </div>
    </div>
  );
}
