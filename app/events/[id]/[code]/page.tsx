"use client"

import { ConfirmPayment } from "@/src/service/concert";
import { Check, Copy } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function HoldPage() {

  const params = useParams();
  const code = params.code as string;
  const id = params.id as string;


  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(10 * 60); // 10 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const router = useRouter()


  const onSubmit = async () => {
    try {
      const res = await ConfirmPayment({
        event_id: Number(id),
        ticket_ref: code,
        amount: 500000
      })
      if (res.status == 200) {
        router.push("/events/"+id)
        toast.success("Your reservation was successful.")
      }
    }catch {
      toast.error("Payment Error")
    }
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="w-full max-w-xl bg-white border rounded-2xl p-6 space-y-6 shadow-sm">


        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Seats Reserved
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            You have 10 minutes to complete payment
          </p>
        </div>

        {/* reservation code */}
        <div className="relative bg-slate-100 rounded-xl p-5">

          <button
            onClick={copyCode}
            className="absolute right-4 top-4 p-2 rounded-lg hover:bg-slate-200 transition"
          >
            {copied ? (
              <Check size={18} className="text-green-500" />
            ) : (
              <Copy size={18} className="text-slate-500" />
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-slate-500 mb-2">
              Reservation Code
            </p>

            <p className="text-3xl font-bold tracking-[0.3em] text-blue-600">
              {code}
            </p>

            <p className="text-xs text-slate-400 mt-2">
              Save this code before it expires
            </p>
          </div>

        </div>


        {/* timer */}
        <div className="text-center text-red-500 font-semibold">
          {String(minutes).padStart(2, "0")}:
          {String(secs).padStart(2, "0")} remaining
        </div>

        <button onClick={onSubmit} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
          Continue to Payment
        </button>

        <p className="text-xs text-slate-400 text-center">
          If time expires, seats will be released automatically
        </p>

      </div>

    </div>
  );
}