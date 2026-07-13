# Olist Analytics — E-commerce Dashboard

A portfolio-ready sales analytics dashboard, built to demo the kind of reporting a small
business or startup would want for their store: revenue trends, order status, top products,
and category breakdowns.

**Live demo, zero setup** — the dataset is synthetic but structured like the real
[Olist Brazilian e-commerce dataset](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce)
(orders, order items, products, categories, customers), generated in `lib/data.ts` with a
seeded random generator so numbers stay consistent across reloads and deploys.

## Stack

- Next.js 16 (App Router), TypeScript
- Tailwind CSS 4
- Recharts for charts
- lucide-react for icons

## What's included

- Sidebar nav + header with a "Live Demo" badge
- 4 KPI cards (revenue, orders, avg. order value, customers) with YoY change
- 24-month revenue + orders trend, dual-axis line/bar combo chart
- Revenue by category (horizontal bar)
- Order status breakdown (donut)
- Top products table

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, click Deploy.
3. You get a shareable URL in a couple minutes — that's the link to send prospective clients.

## Swapping in real data

Everything reads from `lib/data.ts`. To connect a real data source (CSV upload, Supabase,
Postgres), replace the exported `monthlyMetrics`, `categorySales`, `orderStatusBreakdown`,
`topProducts`, and `kpis` with data fetched from your source — the component props and
shapes (`MonthlyMetric`, `CategorySales`, etc.) stay the same.
