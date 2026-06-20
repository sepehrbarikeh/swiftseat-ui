"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmptyPage() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center justify-center py-20 text-center">
      
      {/* ICON */}
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-100 mb-4">
        <Search className="text-slate-500" />
      </div>

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-slate-800">
        No events found
      </h2>

      {/* DESCRIPTION */}
      <p className="text-slate-500 mt-2 max-w-md">
        Try changing your filters or search terms to find what you`re looking for.
      </p>

      {/* ACTION BUTTON */}
      <button
        onClick={() => router.push("/events")}
        className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        Reset Filters
      </button>
    </div>
  );
}