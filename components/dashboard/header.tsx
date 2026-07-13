import { Circle } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-8">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Sales Overview</h1>
        <p className="text-xs text-gray-500">Last updated just now · Trailing 12 months</p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
        <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500" />
        Live Demo
      </div>
    </header>
  );
}
