// Synthetic dataset shaped like the real Olist Brazilian e-commerce dataset
// (orders, order items, products, categories, customers) but generated in-code
// so the demo has zero setup cost. Swap this file for a real data source later.

// Mulberry32 PRNG — deterministic so the dashboard looks the same on every load/deploy.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(42);

export type MonthlyMetric = {
  month: string; // "Jan 24"
  revenue: number;
  orders: number;
};

export type CategorySales = {
  category: string;
  revenue: number;
};

export type OrderStatusBreakdown = {
  status: string;
  count: number;
};

export type TopProduct = {
  id: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
};

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const CATEGORIES = [
  "Health & Beauty",
  "Home & Furniture",
  "Electronics",
  "Sports & Leisure",
  "Toys",
  "Fashion",
  "Housewares",
  "Auto",
];

const PRODUCT_NAMES: Record<string, string[]> = {
  "Health & Beauty": ["Hair Dryer Pro", "Vitamin C Serum", "Electric Shaver", "Skincare Kit"],
  "Home & Furniture": ["Office Chair", "Bookshelf Unit", "LED Desk Lamp", "Memory Foam Pillow"],
  "Electronics": ["Wireless Earbuds", "Bluetooth Speaker", "USB-C Hub", "Smart Watch"],
  "Sports & Leisure": ["Yoga Mat", "Resistance Bands Set", "Running Shoes", "Water Bottle"],
  "Toys": ["Building Blocks Set", "RC Car", "Puzzle 1000pc", "Plush Toy Bundle"],
  "Fashion": ["Denim Jacket", "Leather Wallet", "Sunglasses", "Canvas Backpack"],
  "Housewares": ["Non-Stick Pan Set", "Ceramic Mug Set", "Storage Bins", "Cutlery Set"],
  "Auto": ["Car Phone Mount", "Dash Cam", "Seat Covers", "Tire Inflator"],
};

// 24 months ending at the current month.
function buildMonthLabels(count: number): string[] {
  const now = new Date();
  const labels: string[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(`${MONTH_NAMES[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`);
  }
  return labels;
}

export const monthlyMetrics: MonthlyMetric[] = (() => {
  const labels = buildMonthLabels(24);
  const baseRevenue = 32000;
  const baseOrders = 410;
  return labels.map((month, i) => {
    // Gentle upward trend + seasonal bump in Nov/Dec (BFCM-style) + noise.
    const growth = 1 + i * 0.018;
    const seasonal = month.startsWith("Nov") || month.startsWith("Dec") ? 1.35 : 1;
    const noise = 0.9 + rand() * 0.2;
    const revenue = Math.round(baseRevenue * growth * seasonal * noise);
    const orders = Math.round(baseOrders * growth * seasonal * (0.92 + rand() * 0.16));
    return { month, revenue, orders };
  });
})();

export const categorySales: CategorySales[] = CATEGORIES.map((category) => ({
  category,
  revenue: Math.round(45000 + rand() * 180000),
})).sort((a, b) => b.revenue - a.revenue);

export const orderStatusBreakdown: OrderStatusBreakdown[] = [
  { status: "Delivered", count: 8420 },
  { status: "Shipped", count: 612 },
  { status: "Processing", count: 341 },
  { status: "Canceled", count: 187 },
  { status: "Returned", count: 94 },
];

export const topProducts: TopProduct[] = CATEGORIES.flatMap((category, ci) =>
  PRODUCT_NAMES[category].map((name, pi) => {
    const unitsSold = Math.round(80 + rand() * 920);
    const avgPrice = 25 + rand() * 220;
    return {
      id: `P-${ci}${pi}`,
      name,
      category,
      unitsSold,
      revenue: Math.round(unitsSold * avgPrice),
    };
  })
)
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 8);

// --- Derived KPIs ---

const last12 = monthlyMetrics.slice(-12);
const prior12 = monthlyMetrics.slice(-24, -12);

function sum(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}

function pctChange(current: number, prior: number) {
  if (prior === 0) return 0;
  return ((current - prior) / prior) * 100;
}

const currentRevenue = sum(last12.map((m) => m.revenue));
const priorRevenue = sum(prior12.map((m) => m.revenue));
const currentOrders = sum(last12.map((m) => m.orders));
const priorOrders = sum(prior12.map((m) => m.orders));

const currentAOV = currentRevenue / currentOrders;
const priorAOV = priorRevenue / priorOrders;

const totalCustomers = 6218;
const priorCustomers = 5104;

export const kpis = {
  revenue: {
    label: "Revenue (12mo)",
    value: currentRevenue,
    change: pctChange(currentRevenue, priorRevenue),
    format: "currency" as const,
  },
  orders: {
    label: "Orders (12mo)",
    value: currentOrders,
    change: pctChange(currentOrders, priorOrders),
    format: "number" as const,
  },
  avgOrderValue: {
    label: "Avg. Order Value",
    value: currentAOV,
    change: pctChange(currentAOV, priorAOV),
    format: "currency" as const,
  },
  customers: {
    label: "Customers",
    value: totalCustomers,
    change: pctChange(totalCustomers, priorCustomers),
    format: "number" as const,
  },
};
