"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: "12+", label: "Years of Craft" },
  { value: "340", label: "Projects Delivered" },
  { value: "99.8%", label: "Client Retention" },
  { value: "48", label: "Countries Reached" },
];

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
  const inView = useInView(ref, { once: true, margin: "-80px" });

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

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full border-t border-white/[0.04] bg-[#0b0b0b]"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-32 lg:grid-cols-2 lg:gap-24 lg:px-12 lg:py-40">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-white/30">
              About Us
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mb-6 text-[clamp(1.75rem,3.5vw,3rem)] font-semibold leading-[1.1] tracking-tight text-white/90">
              We build machines
              <br />
              <span className="text-white/40">people love to use.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="max-w-md text-[0.95rem] leading-relaxed text-white/50">
              PlanetVM was founded on a singular obsession: that the tools you
              touch every day should feel as precise as the work you create with
              them. Every keyboard we engineer is a study in restraint, material
              science, and tactile perfection.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-white/50">
              From our lab in Tokyo, our team of industrial designers, firmware
              architects, and mechanical engineers collaborate to push the
              boundary of what a keyboard can be.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 gap-6 self-center">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={0.15 * i}>
              <div className="border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
                <p className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-white/90">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.75rem] font-light tracking-wide text-white/35">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
