import Link from "next/link";

export default function ExploreEventsCTA() {
  return (
    <section className="my-20">
      <div className="relative overflow-hidden mx-8 my-4 rounded-2xl bg-linear-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 sm:p-12 lg:p-16">

        {/* Background Glow */}
        <div className="absolute -top-24 -right-12 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="relative text-center">
          {/* Badge */}
          <span className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-blue-100 backdrop-blur-sm">
            Discover More Events
          </span>

          {/* Title */}
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            Explore Hundreds of Events
          </h2>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-2xl text-base text-blue-100 md:text-lg">
            Find concerts, festivals and unforgettable live experiences happening near you.
          </p>

          {/* Button */}
          <Link
            href="/events"
            className="
              inline-flex items-center gap-2
              rounded-xl
              bg-white
              px-6 py-3
              text-sm font-semibold
              text-blue-600
              shadow-lg shadow-black/10
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-slate-100
            "
          >
            View All Events
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}