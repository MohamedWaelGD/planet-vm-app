"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 transition-all duration-500 md:px-12 lg:px-20 ${
          scrolled
            ? "border-b border-white/[0.06] bg-[#0b0b0b]/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
        style={{ height: scrolled ? 56 : 72 }}
      >
        <a
          href="#"
          className="text-[1.1rem] font-semibold tracking-tight text-white/90 transition-colors hover:text-white"
        >
          Planet<span className="text-white/40">VM</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.8rem] font-light tracking-wide text-white/50 transition-colors duration-300 hover:text-white/90"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full border border-white/10 px-5 py-2 text-[0.75rem] font-medium tracking-wide text-white/70 transition-all duration-300 hover:border-white/25 hover:text-white md:inline-block"
        >
          Contact Us
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-[1px] w-5 bg-white/70 transition-all duration-300 ${
              mobileOpen ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1px] w-5 bg-white/70 transition-all duration-300 ${
              mobileOpen ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#0b0b0b]/95 backdrop-blur-2xl md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-light tracking-wide text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 rounded-full border border-white/15 px-8 py-3 text-sm font-medium text-white/80 transition-all hover:border-white/30 hover:text-white"
            >
              Contact Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
