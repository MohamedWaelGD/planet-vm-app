"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    number: "01",
    title: "Keyboard Engineering",
    description:
      "Full-stack keyboard design from PCB layout to case machining. We engineer every layer for optimal acoustics, feel, and longevity.",
  },
  {
    number: "02",
    title: "Firmware Architecture",
    description:
      "Custom firmware tuned for latency-critical performance. QMK and VIA compatible with bespoke feature sets for power users.",
  },
  {
    number: "03",
    title: "Industrial Design",
    description:
      "Material exploration, prototyping, and DFM. Aluminum, PBT, silicone — every surface is intentional and every radius is considered.",
  },
  {
    number: "04",
    title: "Acoustic Tuning",
    description:
      "Sound signature engineering through foam layering, plate material selection, and switch lubing pipelines. Silence, refined.",
  },
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

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full border-t border-white/[0.04] bg-[#0b0b0b]"
    >
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12 lg:py-40">
        <FadeIn>
          <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-white/30">
            Services
          </p>
          <h2 className="mb-16 text-[clamp(1.75rem,3.5vw,3rem)] font-semibold leading-[1.1] tracking-tight text-white/90">
            What we do
          </h2>
        </FadeIn>

        <div className="flex flex-col">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.number} delay={0.1 * i}>
              <div className="group border-t border-white/[0.06] py-10 last:border-b lg:py-12">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-16">
                  <span className="shrink-0 text-[0.7rem] font-mono font-medium text-white/20 lg:mt-1 lg:w-12">
                    {service.number}
                  </span>
                  <div className="flex flex-1 flex-col gap-3">
                    <h3 className="text-[clamp(1.1rem,2vw,1.35rem)] font-medium tracking-tight text-white/80 transition-colors group-hover:text-white/95">
                      {service.title}
                    </h3>
                    <p className="max-w-lg text-[0.9rem] leading-relaxed text-white/40">
                      {service.description}
                    </p>
                  </div>
                  <div className="hidden shrink-0 self-center lg:block">
                    <span className="text-white/10 transition-all group-hover:translate-x-1 group-hover:text-white/30">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
