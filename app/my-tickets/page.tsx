"use client"

import LoadingBox from "@/src/components/loadingBox";
import FantasyTicket from "@/src/components/ticketCard";
import { MyTickets } from "@/src/service/user";
import { Tickets } from "@/src/types/tickets";
import { useEffect, useState } from "react";

export default function TicketHistoryPage() {

  const [data, setData] = useState<Tickets[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await MyTickets();
        setData(res.data.tickets)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      {
        loading
          ? <LoadingBox />


          : <div className="min-h-screen mt-20 bg-linear-to-br from-blue-50 via-white to-indigo-100 p-8">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">

              <h1 className="text-3xl font-bold text-blue-900">
                Ticket History
              </h1>
            </div>

            {/* TICKETS */}
            <div className="grid gap-6">
              {data?.map((t,i) => (
                <FantasyTicket key={i} ticket={t} />
              ))}
            </div>
          </div>
      }
    </>
  );
}
