import { Tickets } from "../types/tickets";
import { FormatPersianDateTime } from "../utility/converData";


interface Props {
  ticket: Tickets
}

export default function FantasyTicket({ ticket }: Props) {


  

  const date = FormatPersianDateTime(ticket.event_date)

  return (
    <div className="relative group w-full max-w-2xl mx-auto">

      {/* AURORA BACK GLOW */}
      <div className="absolute -inset-2 bg-linear-to-r from-blue-300 via-indigo-300 to-cyan-300 blur-3xl opacity-40 group-hover:opacity-60 transition" />

      {/* MAIN CARD */}
      <div className="relative flex rounded-[28px] overflow-hidden border border-white/60 shadow-2xl backdrop-blur-xl bg-white/80 group-hover:-translate-y-2 transition duration-300">

        {/* LEFT */}
        <div className="flex-1 p-6 relative">

          {/* holographic sweep */}
          <div className="absolute inset-0 opacity-20 animate-pulse bg-linear-to-r from-transparent via-blue-300 to-transparent" />

          <div className="relative z-10 space-y-3">

            <h2 className="text-xl font-bold text-blue-900">
              {ticket.event_title}
            </h2>

            <p className="text-sm text-blue-400">
              {date.date} {date.time}
            </p>

            {/* magic divider */}
            <div className="h-px bg-linear-to-r from-transparent via-blue-200 to-transparent" />

            <div className="flex justify-between text-sm text-blue-900">
              <div>
                <p className="text-xs text-blue-400">Seat</p>
                <p className="font-semibold">{ticket.seat_number}</p>
              </div>

              <div>
                <p className="text-xs text-blue-400">Code</p>
                <p className="font-semibold tracking-widest">
                  {ticket.ticket_ref}
                </p>
              </div>
            </div>

            {/* small status */}
            <p className="text-xs text-blue-400 pt-2">
              Stored in your memory archive ✨
            </p>
          </div>
        </div>

        {/* SOFT CUT */}
        <div className="w-6 flex flex-col justify-around items-center bg-white/60">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-100 shadow-inner"
            />
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="w-44 p-4 flex flex-col items-center justify-between bg-linear-to-b from-white/70 to-blue-50/40">

          {/* MAGIC STAMP */}
          <div className="-rotate-12">
            <div className="px-3 py-1 border border-indigo-400 text-indigo-500 text-xs font-bold rounded-xl shadow-md bg-white/60">
              ARCHIVED
            </div>
          </div>

          {/* CRYSTAL QR */}
          <div className="relative w-28 h-28 rounded-2xl bg-white/80 border border-blue-100 shadow-inner overflow-hidden flex items-center justify-center">

            {/* glow */}
            <div className="absolute inset-0 bg-linear-to-tr from-blue-200 via-transparent to-indigo-200 opacity-40 animate-pulse" />

            {/* fake crystal QR */}
            {/* <div className="grid grid-cols-6 gap-0.5 relative z-10">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-sm ${Math.random() > 0.5 ? "bg-indigo-900" : "bg-transparent"
                    }`}
                />
              ))}
            </div> */}
          </div>

          <p className="text-[10px] text-blue-400 mt-2">
            magical scan point
          </p>
        </div>
      </div>
    </div>
  );
}