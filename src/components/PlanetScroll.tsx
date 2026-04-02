"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 192;
const FRAME_PATH = (i: number) =>
  `/frames/${String(i + 1).padStart(5, "0")}.png`;

interface StoryBeat {
  at: number;
  range: number;
  align: "center" | "left" | "right";
  heading: string;
  subtext: string;
  vPos?: "top" | "bottom";
}

const STORY_BEATS: StoryBeat[] = [
  { at: 0.08, range: 0.12, align: "center", heading: "PlanetVM.", subtext: "Engineered clarity." },
  { at: 0.25, range: 0.12, align: "left", heading: "Built for Precision.", subtext: "Every detail, measured." },
  { at: 0.60, range: 0.12, align: "right", heading: "Layered Engineering.", subtext: "See what\u2019s inside." },
  { at: 0.90, range: 0.10, align: "center", heading: "Assembled. Ready.", subtext: "Scroll back to replay.", vPos: "bottom" },
];

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = canvasW / canvasH;
  let drawW: number, drawH: number, drawX: number, drawY: number;

  if (imgAspect > canvasAspect) {
    drawH = canvasH;
    drawW = canvasH * imgAspect;
    drawX = (canvasW - drawW) / 2;
    drawY = 0;
  } else {
    drawW = canvasW;
    drawH = canvasW / imgAspect;
    drawX = 0;
    drawY = (canvasH - drawH) / 2;
  }

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, drawX, drawY, drawW, drawH);
}

function StoryOverlay({
  beat,
  scrollYProgress,
}: {
  beat: StoryBeat;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = Math.max(0, beat.at - beat.range);
  const peak = beat.at;
  const end = Math.min(1, beat.at + beat.range);

  const opacity = useTransform(scrollYProgress, [start, peak, end], [0, 1, 0]);
  const y = useTransform(opacity, [0, 1], [10, 0]);

  const vPosClass =
    beat.vPos === "bottom"
      ? "bottom-[30vh]"
      : "top-[22vh]";

  const alignClasses =
    beat.align === "left"
      ? "items-start text-left left-[8vw]"
      : beat.align === "right"
        ? "items-end text-right right-[8vw]"
        : "items-center text-center left-1/2 -translate-x-1/2";

  return (
    <motion.div
      className={`pointer-events-none absolute z-10 flex flex-col gap-3 ${vPosClass} ${alignClasses}`}
      style={{ opacity, y }}
    >
      <h2 className="whitespace-nowrap text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-none tracking-tight text-white/90">
        {beat.heading}
      </h2>
      <p className="whitespace-nowrap text-[clamp(0.875rem,1.5vw,1.25rem)] font-light tracking-wide text-white/60">
        {beat.subtext}
      </p>
    </motion.div>
  );
}

export default function PlanetScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const renderFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || !images[idx]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    }

    drawCover(ctx, images[idx], w, h);
    currentFrameRef.current = idx;
  }, []);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.round(latest);
    if (idx === currentFrameRef.current) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => renderFrame(idx));
  });

  useEffect(() => {
    if (!isLoaded) return;
    renderFrame(0);
  }, [isLoaded, renderFrame]);

  useEffect(() => {
    const handleResize = () => {
      const idx = currentFrameRef.current;
      if (idx >= 0) renderFrame(idx);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;

    const onLoad = () => {
      if (cancelled) return;
      loaded++;
      setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
      if (loaded === FRAME_COUNT) {
        imagesRef.current = images;
        setIsLoaded(true);
      }
    };

    const onError = () => {
      if (cancelled) return;
      loaded++;
      setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
      if (loaded === FRAME_COUNT) {
        imagesRef.current = images;
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = onLoad;
      img.onerror = onError;
      images[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] w-screen bg-[#0b0b0b]"
      id="hero"
    >
      <div className="sticky top-0 flex h-screen w-screen items-center justify-center overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#0b0b0b]">
            <div className="relative h-1 w-48 overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white/40 transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="text-xs font-light tracking-widest text-white/40">
              Loading PlanetVM sequence&hellip; {loadProgress}%
            </p>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        {isLoaded &&
          STORY_BEATS.map((beat, i) => (
            <StoryOverlay key={i} beat={beat} scrollYProgress={scrollYProgress} />
          ))}
      </div>
    </section>
  );
}
