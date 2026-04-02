"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    title: "PlanetVM MK-1",
    category: "Flagship Keyboard",
    year: "2025",
    description:
      "Our debut 75% layout. CNC aluminum case, gasket-mounted, hot-swappable. The keyboard that started it all.",
    tags: ["75%", "Aluminum", "Gasket Mount"],
  },
  {
    title: "Stealth Module",
    category: "Compact Board",
    year: "2024",
    description:
      "A 40% ortholinear designed for developers who live in the terminal. Minimal footprint, maximum efficiency.",
    tags: ["40%", "Ortho", "Firmware"],
  },
  {
    title: "Luna Wave",
    category: "Collab Edition",
    year: "2024",
    description:
      "Partnership with Japanese artisan keycap makers. PBT double-shot, hemisphere profile, limited to 500 units.",
    tags: ["Artisan", "PBT", "Limited"],
  },
  {
    title: "VM Control",
    category: "Macropad",
    year: "2023",
    description:
      "8-key macropad with rotary encoder and OLED display. Programmed via our open-source VM Configurator.",
    tags: ["Macropad", "OLED", "Open Source"],
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

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full border-t border-white/[0.04] bg-[#0b0b0b]"
    >
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12 lg:py-40">
        <FadeIn>
          <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-white/30">
            Projects
          </p>
          <h2 className="mb-16 text-[clamp(1.75rem,3.5vw,3rem)] font-semibold leading-[1.1] tracking-tight text-white/90">
            Selected work
          </h2>
        </FadeIn>

        <div className="grid gap-[1px] bg-white/[0.04] md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <FadeIn key={project.title} delay={0.1 * i}>
              <div className="group flex h-full flex-col justify-between bg-[#0b0b0b] p-8 transition-colors duration-500 lg:p-10">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/25">
                      {project.category}
                    </span>
                    <span className="text-[0.65rem] font-mono text-white/15">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="mb-3 text-[clamp(1.15rem,2vw,1.5rem)] font-semibold tracking-tight text-white/85 transition-colors group-hover:text-white">
                    {project.title}
                  </h3>
                  <p className="mb-6 text-[0.85rem] leading-relaxed text-white/40">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] px-3 py-1 text-[0.65rem] font-light tracking-wide text-white/30 transition-colors group-hover:border-white/[0.12] group-hover:text-white/45"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
