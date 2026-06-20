import Image from "next/image";
import Link from "next/link";
import { Concert } from "../types/concert";
import { Calendar, MapPin } from "lucide-react";
import placeholder from "@/public/image/images.png";
import { FormatPersianDateTime } from "../utility/converData";


interface Props {
    concert: Concert;
}

export default function ConcertCard({ concert }: Props) {



    const date = FormatPersianDateTime(concert.start_time)

    const disabled = concert.available_seats === 0;

    const content = (
        <>
            {/* IMAGE */}
            <div className="relative h-56 overflow-hidden">
                <Image
                    alt={concert.title}
                    src={concert.ImageUrl || placeholder}
                    fill
                    sizes="120px"
                    priority
                    className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-black/65 flex flex-col justify-center items-center text-white gap-2">
                    <div className="text-sm font-semibold">
                        Seats: {concert.available_seats}
                    </div>

                    <div
                        className={`px-3 py-1 rounded-full text-xs ${disabled ? "bg-red-500" : "bg-green-500"
                            }`}
                    >
                        {disabled ? "Sold Out" : "Available"}
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-1">
                <h3 className="text-slate-800 font-semibold text-lg">
                    {concert.title}
                </h3>

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                        <MapPin width={14} />
                        {concert.location}
                    </span>

                    <span className="flex items-center gap-1">
                        <Calendar width={14} />
                        {date.date} {date.time}
                    </span>
                </div>
            </div>
        </>
    );

    if (disabled) {
        return (
            <div className="group rounded-xl overflow-hidden bg-slate-50 shadow-lg opacity-70 cursor-not-allowed">
                {content}
            </div>
        );
    }

    return (
        <Link
            href={`/events/${concert.id}`}
            className="group rounded-xl overflow-hidden bg-slate-50 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
            {content}
        </Link>
    );
}