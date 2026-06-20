'use client'

import Image from "next/image";
import hero from "@/public/image/hero.jpg";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
     const router = useRouter();
  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (!value.trim()) return;

    router.push(`/events?search=${encodeURIComponent(value.trim())}`);
  };

    return (
        <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
            <Image
                src={hero}
                alt="hero photo"
                fill
                className="object-cover"
                priority
            />

            <div className="absolute inset-0 bg-black/50" />


            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Live Events.<br />Unforgettable moments.
                </h1>
                <h3 className="text-lg md:text-xl text-slate-200 mb-8">
                    Discover and book the best events near you.
                </h3>

                <div className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl flex">
                    <input
                        type="search"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                        placeholder="Search for concerts, sports, etc..."
                        className="w-full bg-transparent px-4 py-3 outline-none text-white placeholder-slate-300"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
                    >
                        <Search />
                    </button>

                </div>
            </div>
        </section>
    );
}