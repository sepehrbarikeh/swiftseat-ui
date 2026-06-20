'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import logo from "@/public/image/logo.png"
import { useState } from "react"
import { X, Menu } from "lucide-react"

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname()

    const tabs = [
        { name: "Home", href: "/" },
        { name: "Events", href: "/events" },
        { name: "My Tickets", href: "/my-tickets" },
        { name: "About us", href: "/about-us" },
    ]

    return (
        <nav className="fixed top-0 w-full z-50">
            <div className="max-w-full mx-auto bg-white/90 backdrop-blur-md border border-slate-200 px-6 py-3 shadow-sm">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex max-w-12 items-center gap-2">
                        <Image width={1248} height={832} src={logo} alt="logo" loading="eager" className="rounded-lg" />
                        <h1 className="text-xl font-bold text-slate-900">SwiftSeat</h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {tabs.map((tab) => {
                            const isActive = pathname === tab.href;
                            return (
                                <Link key={tab.name} href={tab.href} className={`text-sm font-medium transition py-4 border-b-2 ${isActive ? "text-blue-600 border-blue-600" : "text-slate-500 border-transparent hover:text-blue-600"}`}>
                                    {tab.name}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">

                        <div className="hidden md:flex items-center gap-4">
                            <Link href="/auth/login" className="text-sm text-slate-600">Log in</Link>
                            <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700">Sign up</Link>
                        </div>

                        {/* Hamburger Button */}
                        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Panel */}
                {menuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-slate-100 flex flex-col gap-4">
                        {tabs.map((tab) => (
                            <Link key={tab.name} href={tab.href} onClick={() => setMenuOpen(false)} className="text-slate-600 font-medium py-2">
                                {tab.name}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-2 pt-2">
                            <Link href="/auth/login" className="text-sm text-slate-600 py-2 border-t border-slate-100">Log in</Link>
                            <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">Sign up</Link>
                        </div>
                    </div>
                )}
            </div>

            
        </nav>
    )
}