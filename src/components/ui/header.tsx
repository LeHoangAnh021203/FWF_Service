"use client"

import Link from "next/link"

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10">
      <Link href="/" className="text-sm font-semibold tracking-tight text-white transition-opacity hover:opacity-70">
        ADNz Perfume
      </Link>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
        <Link href="/ListProduct" className="text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white">
          Products
        </Link>
        <Link href="/Map" className="text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white">
          Customer
        </Link>
        <Link href="/about-us" className="text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white">
          About
        </Link>
      </nav>

      <Link
        href="/pre-order"
        className="rounded-full border border-white/20 bg-transparent px-5 py-2 text-xs font-medium text-white transition-all hover:bg-white hover:text-black"
      >
        Pre-order
      </Link>
    </header>
  )
}
