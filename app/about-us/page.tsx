import Link from "next/link";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen mt-24 bg-slate-50 px-4 py-16">

      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">
            About SwiftSeat
          </h1>

          <p className="text-slate-500">
            A modern platform for discovering and booking live events
          </p>
        </div>

        {/* About App */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">

          <h2 className="text-xl font-semibold text-slate-900">
            What is SwiftSeat?
          </h2>

          <p className="text-slate-600 leading-7">
            SwiftSeat is a simple and fast event booking platform where you can
            explore concerts, festivals, and live experiences.  
            Choose your seats in real-time, reserve them for a limited time,
            and complete your booking securely.
          </p>

        </section>

        {/* Features */}
        <section className="grid sm:grid-cols-2 gap-4">

          <div className="bg-white border rounded-2xl p-5">
            <h3 className="font-semibold text-slate-900 mb-2">
              🎟️ Seat Selection
            </h3>
            <p className="text-sm text-slate-500">
              Choose your seats visually in a real cinema-style layout.
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-5">
            <h3 className="font-semibold text-slate-900 mb-2">
              ⏱️ 10-Minute Hold
            </h3>
            <p className="text-sm text-slate-500">
              Reserved seats are locked for 10 minutes during checkout.
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-5">
            <h3 className="font-semibold text-slate-900 mb-2">
              ⚡ Fast Booking
            </h3>
            <p className="text-sm text-slate-500">
              Minimal steps, optimized flow for quick reservations.
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-5">
            <h3 className="font-semibold text-slate-900 mb-2">
              🔒 Secure Payment
            </h3>
            <p className="text-sm text-slate-500">
              Safe and reliable checkout process for all bookings.
            </p>
          </div>

        </section>

        {/* Contact */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">

          <h2 className="text-xl font-semibold text-slate-900">
            Contact Me
          </h2>

          <p className="text-slate-600 text-sm">
            If you have any questions, feedback, or collaboration ideas,
            feel free to reach out.
          </p>

          <div className="space-y-2 text-sm">

            <p>
              📧 Email:
              <span className="text-blue-600 ml-2">
                sepehr.frlncr@gmail.com
              </span>
            </p>

            <p>
              💬 Telegram:
              <span className="text-blue-600 ml-2">
                @srbe_sepehr
              </span>
            </p>

            <p>
              🌐 GitHub:
              <Link
                href="https://github.com/sepehrbarikeh"
                className="text-blue-600 ml-2"
              >
                github.com/sepehrbarikeh
              </Link>
            </p>

          </div>

        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/events"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Explore Events
          </Link>
        </div>

      </div>

    </main>
  );
}