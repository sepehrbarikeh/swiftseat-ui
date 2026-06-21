"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

import { Concert } from "../types/concert";
import { FormatPersianDateTime } from "../utility/converData";
import { API_BASE } from "../helper/callApi";

import placeholder from "@/public/image/images.png";

interface Props {
  concert: Concert;
}

export default function ConcertCard({ concert }: Props) {
  const disabled = concert.available_seats === 0;

  const date = FormatPersianDateTime(concert.start_time);

  const imageUrl = concert.ImageURL
    ? `${API_BASE}${concert.ImageURL.replace("./", "/")}`
    : placeholder;

  const percent =
    (concert.available_seats / concert.total_seats) * 100;

  return (
    <Link
      href={disabled ? "#" : `/events/${concert.id}`}
      className={`
        group overflow-hidden rounded-2xl
        bg-white shadow-md
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-2xl
        block
        ${disabled && "pointer-events-none opacity-75"}
      `}
    >
      {/* IMAGE */}
      <div className="relative h-105 overflow-hidden">

        <Image
          src={imageUrl}
          alt={concert.title}
          fill
          unoptimized
          className="
          object-cover
          transition-all
          duration-700
          group-hover:scale-110
          group-hover:brightness-50
          group-hover:blur-[1px]
        "
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

        {/* Status Badge */}
        <div
          className={`
            absolute top-4 right-4
            px-3 py-1 rounded-full
            backdrop-blur-md
            text-xs font-semibold
            border
            ${
              disabled
                ? "bg-red-500/20 border-red-400 text-red-200"
                : "bg-emerald-500/20 border-emerald-400 text-emerald-200"
            }
          `}
        >
          {disabled ? "Sold Out" : "Available"}
        </div>

        {/* Capacity */}
        <div
          className="
          absolute top-4 left-4
          bg-black/40 backdrop-blur-md
          rounded-xl px-3 py-2
          text-white text-xs
          w-32
        "
        >
          <div className="flex justify-between mb-1">
            <span>Seats</span>

            <span>
              {concert.available_seats}/{concert.total_seats}
            </span>
          </div>

          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              style={{
                width: `${percent}%`,
              }}
              className="h-full bg-emerald-400 rounded-full"
            />
          </div>
        </div>

        {/* Bottom content */}
        <div
          className="
            absolute bottom-0 left-0 right-0

            p-5

            translate-y-10
            opacity-0

            group-hover:translate-y-0
            group-hover:opacity-100

            transition-all
            duration-500
          "
        >
            <h3 className="text-white text-xl font-bold mb-3">
            {concert.title}
          </h3>

            <h3 className="text-white text-sm mb-3">
            {concert.description}
          </h3>

          <div className="space-y-2">

            <div className="flex items-center gap-2 text-sm text-slate-200">
              <MapPin size={15} />

              <span>{concert.location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Calendar size={15} />

              <span>
                {date.date} • {date.time}
              </span>
            </div>

          </div>
        </div>

      </div>
    </Link>
  );
}
