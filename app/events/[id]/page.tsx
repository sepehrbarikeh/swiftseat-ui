"use client";

import LoadingBox from "@/src/components/loadingBox";
import Seat from "@/src/components/seat";
import { GetEventSeats, ReservEvent } from "@/src/service/concert";
import { Seats } from "@/src/types/concert";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function SeatPicker() {

  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Seats[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await GetEventSeats(id);
        setData(res.data.seats);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const rows = useMemo(() => {
    return [...new Set(data.map((s) => s.row_name))];
  }, [data]);

  const toggleSeat = (seatNumber: string) => {
    const seat = data.find((s) => s.seat_number === seatNumber);

    if (!seat) return;

    if (seat.status === "sold") return;

    setSelected((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((id) => id !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const selectedSeats = data.filter((seat) =>
    selected.includes(seat.seat_number)
  );

  const totalPrice = selectedSeats.reduce(
    (acc, seat) => acc + seat.price,
    0
  );

  const router = useRouter()


  const onSubmit = async () => {
    try {
      const res = await ReservEvent({
        event_id: Number(id),
        seat_number: selected
      })
      console.log(res)
      if (res.status == 200) {
        router.push(`${id}/${res.data.ticket_ref}?seat=${selected}`)
      }

    } catch {
      toast.error("reservation error,please try again later")
    }
  }

  if (loading) {
    return (
      <LoadingBox />
    );
  }

  return (
    <div className="w-full mt-24 max-w-6xl mx-auto px-3 sm:px-6 space-y-10">

      {/* Stage */}
      <div className="flex justify-center">
        <div className="w-[90%] sm:w-3/4 h-10 sm:h-12 rounded-b-[80px] bg-linear-to-r from-slate-700 to-slate-900 flex items-center justify-center shadow-lg">
          <span className="text-white text-sm font-semibold">
            STAGE
          </span>
        </div>
      </div>

      {/* Seats */}

      <div className="overflow-x-auto pb-4">
        <div className="min-w-max space-y-5">

          {rows.map((row) => {

            const seats = data.filter(
              (seat) => seat.row_name === row
            );

            return (

              <div
                key={row}
                className="flex items-center mt-5 justify-center gap-2"
              >

                <span className="w-6 text-center font-bold text-slate-700">
                  {row}
                </span>


                <div className="flex mt-5 items-center gap-2">

                  {seats.map((seat, index) => (

                    <div
                      key={seat.seat_id}
                      className={
                        index === Math.floor(seats.length / 2)
                          ? "ml-6"
                          : ""
                      }
                    >

                      <Seat
                        label={seat.seat_number}
                        reserved={seat.status === "sold" || seat.status === "reserved"}
                        selected={selected.includes(
                          seat.seat_number
                        )}
                        onClick={() =>
                          toggleSeat(
                            seat.seat_number
                          )
                        }
                      />

                    </div>

                  ))}

                </div>

              </div>

            );

          })}

        </div>
      </div>

      {/* Summary */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">

          <div>

            <h3 className="font-semibold text-slate-900">
              Selected Seats
            </h3>

            <p className="text-slate-600 mt-1">

              {selectedSeats.length
                ? selectedSeats
                  .map((s) => s.seat_number)
                  .join(" • ")
                : "No seats selected"}

            </p>

          </div>


          <div className="text-sm text-slate-500">

            <p>
              Total Seats : {selectedSeats.length}
            </p>

            <p>
              Price :
              {" "}
              {totalPrice.toLocaleString()}
              {" "}
              Toman
            </p>

          </div>

        </div>

        <button
          disabled={!selectedSeats.length}
          onClick={onSubmit}
          className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
        >
          Proceed to Payment
        </button>

      </div>

    </div>
  );
}