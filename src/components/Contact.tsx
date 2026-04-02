"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full border-t border-white/[0.04] bg-[#0b0b0b]"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-32 text-center lg:px-12 lg:py-40">
        <FadeIn>
          <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-white/30">
            Get in Touch
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mb-6 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-white/90">
            Let&apos;s build something
            <br />
            <span className="text-white/35">together.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mb-12 max-w-md text-[0.95rem] leading-relaxed text-white/45">
            Whether you have a project in mind, want to collaborate, or just
            want to talk keyboards — we&apos;re always listening.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-lg flex-col gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                className="w-full border-b border-white/[0.08] bg-transparent px-1 py-3 text-[0.85rem] text-white/80 outline-none transition-colors placeholder:text-white/20 focus:border-white/25"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border-b border-white/[0.08] bg-transparent px-1 py-3 text-[0.85rem] text-white/80 outline-none transition-colors placeholder:text-white/20 focus:border-white/25"
              />
            </div>
            <textarea
              rows={4}
              placeholder="Tell us about your project"
              className="w-full resize-none border-b border-white/[0.08] bg-transparent px-1 py-3 text-[0.85rem] text-white/80 outline-none transition-colors placeholder:text-white/20 focus:border-white/25"
            />
            <button
              type="submit"
              className="mt-4 self-center rounded-full bg-white/[0.08] px-10 py-3 text-[0.8rem] font-medium tracking-wide text-white/70 transition-all duration-300 hover:bg-white/[0.14] hover:text-white"
            >
              Send Message
            </button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
