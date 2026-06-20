"use client";

import ConcertCard from "@/src/components/concertCard";
import EventsFilterBox from "@/src/components/eventFilterBox";
import { GetConserts } from "@/src/service/concert";
import { Concert } from "@/src/types/concert";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetConserts();
        setData(res.data.data.events);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data)

  if (loading) {
    return <div className="mt-20 text-center">Loading...</div>;
  }

  return (
    <div className="mt-20">
      <EventsFilterBox />

      <section className="relative mx-8 my-4 py-10 px-4 sm:px-6 lg:px-10 rounded-2xl overflow-hidden bg-linear-to-br from-white via-slate-50 to-violet-50">
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((c: Concert) => (
            <ConcertCard key={c.id} concert={c} />
          ))}
        </div>
      </section>
    </div>
  );
}