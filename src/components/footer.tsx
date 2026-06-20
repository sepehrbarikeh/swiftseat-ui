import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              EventHub
            </h3>

            <p className="mt-3 text-sm text-slate-600">
              Discover concerts, festivals and unforgettable live experiences.
            </p>
          </div>

          {/* Events */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900">
              Events
            </h4>

            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link
                  href="/events"
                  className="hover:text-blue-600 transition-colors"
                >
                  All Events
                </Link>
              </li>

              <li>
                <Link
                  href="/events?type=popular"
                  className="hover:text-blue-600 transition-colors"
                >
                  Popular
                </Link>
              </li>

              <li>
                <Link
                  href="/events?type=upcoming"
                  className="hover:text-blue-600 transition-colors"
                >
                  Upcoming
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900">
              Company
            </h4>

            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 transition-colors"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="hover:text-blue-600 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900">
              Stay Updated
            </h4>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  bg-white
                  px-3
                  py-2
                  text-sm
                  text-slate-900
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />

              <button
                className="
                  rounded-lg
                  bg-blue-600
                  px-4
                  py-2
                  font-medium
                  text-white
                  transition-all
                  hover:bg-blue-700
                "
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© 2026 Swift Seat. All rights reserved.</p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-blue-600 transition-colors"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="hover:text-blue-600 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}