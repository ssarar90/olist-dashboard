import type { TopProduct } from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function TopProductsTable({ data }: { data: TopProduct[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-sm font-semibold">Top Products</h2>
        <p className="text-xs text-gray-500">By revenue, trailing 12 months</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs text-gray-500">
              <th className="pb-2 font-medium">Product</th>
              <th className="pb-2 font-medium">Category</th>
              <th className="pb-2 font-medium text-right">Units Sold</th>
              <th className="pb-2 font-medium text-right">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 last:border-0">
                <td className="py-2.5 font-medium text-gray-900">{product.name}</td>
                <td className="py-2.5 text-gray-500">{product.category}</td>
                <td className="py-2.5 text-right text-gray-600">
                  {formatNumber(product.unitsSold)}
                </td>
                <td className="py-2.5 text-right font-medium text-gray-900">
                  {formatCurrency(product.revenue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
