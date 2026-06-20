"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EventsFilterBox = () => {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");

  const handleLoad = () => {
    const query = new URLSearchParams();
    if (city) query.append("city", city);
    if (time) query.append("time", time);
    router.push(`/events?${query.toString()}`);
  };

  return (
    // استایل جدید: پس‌زمینه سفید با بوردر ملایم (هماهنگ با لاگین و ریجستر)
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

        {/* Time */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Time</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-2.5 rounded-lg outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
          >
            <option value="">All time</option>
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
          </select>
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