@AGENTS.md

# About Me
Junior data engineer + freelance web developer.

## Stack
- Data: PySpark, Airflow, SQL, Tableau
- Web: Next.js, React, Tailwind CSS, TypeScript
- GitHub: exists but building out portfolio projects

## Freelance Goals
Targeting small businesses and startups. Building 1-2 portfolio pieces that demonstrate:
- Data cleaning and transformation
- SQL queries and analysis
- Dashboard/visualization UI

## Current Project
Olist-inspired e-commerce analytics dashboard — a portfolio piece meant to be sent to
prospective clients as a live link ("this is the kind of dashboard I'd build for your store").

- Framework: Next.js 16 (App Router), TypeScript
- Charts: Recharts
- Styling: Tailwind CSS
- Data: synthetic dataset in lib/data.ts, structured like the real Olist e-commerce dataset
  (orders, order items, products, categories, customers)
- No backend/database yet — data is generated in-code so the demo has zero setup cost for
  anyone cloning the repo

## Preferences
- Keep components small and reusable
- Prefer TypeScript strict mode
- No unnecessary dependencies
- Write comments explaining business logic, not just code

## Roadmap (not started yet)
1. Swap lib/data.ts for a real data source (CSV upload, Supabase, or Postgres)
2. Build a companion Airflow + PySpark pipeline that generates/refreshes this data,
   to pair as a second portfolio piece showing the data engineering side
