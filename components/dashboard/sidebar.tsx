import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Orders", icon: ShoppingCart, active: false },
  { label: "Products", icon: Package, active: false },
  { label: "Customers", icon: Users, active: false },
  { label: "Reports", icon: BarChart3, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white">
          O
        </div>
        <span className="text-sm font-semibold tracking-tight">Olist Analytics</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
          <div
            key={label}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </div>
        ))}
      </nav>
    </aside>
  );
}
