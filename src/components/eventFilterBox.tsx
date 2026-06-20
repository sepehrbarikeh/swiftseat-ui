"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EventsFilterBox = () => {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  const handleLoad = () => {
    const query = new URLSearchParams();
    if (city) query.append("city", city);
    if (search) query.append("search", search);
    router.push(`/events?${query.toString()}`);
  };

  return (
   
    <div className="w-full bg-white border border-slate-100 rounded-2xl p-6 mb-10 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
        
        {/* City */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">City</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Tehran"
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-2.5 rounded-lg outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        {/* search */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Search
          </label>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search concerts..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-2.5 rounded-lg outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>


        {/* Button */}
        <button
          onClick={handleLoad}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition shadow-sm"
        >
          Filter Events
        </button>

      </div>
    </div>
  );
};

export default EventsFilterBox;