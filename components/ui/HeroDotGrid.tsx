"use client";

import { useEffect, useRef } from "react";

const DOT_SIZE = 4;
const GAP = 40;
const RADIUS = 200;
const BASE_OPACITY = 0.08;
const MAX_OPACITY = 0.55;

/**
 * Mouse-reactive dot grid for the hero background.
 * - Canvas-based for perf (no per-dot React state).
 * - On mousemove: dots within RADIUS of the cursor fade up proportional to proximity.
 * - No-ops on touch devices and under prefers-reduced-motion.
 * - Resizes with the viewport.
 */
export default function HeroDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Bail out for touch-first devices and reduced-motion users.
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isCoarse || prefersReduced) {
      // Still draw the static grid so the hero isn't empty.
      drawStatic(canvas);
      const onResize = () => drawStatic(canvas);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const { x: mx, y: my, active } = mouseRef.current;
      const r2 = RADIUS * RADIUS;

      for (let y = GAP; y < h; y += GAP) {
        for (let x = GAP; x < w; x += GAP) {
          let opacity = BASE_OPACITY;
          if (active) {
            const dx = x - mx;
            const dy = y - my;
            const d2 = dx * dx + dy * dy;
            if (d2 < r2) {
              const t = 1 - d2 / r2;
              opacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * t;
            }
          }
          // surface.text-onDarkMuted (#94A3B8) at variable opacity
          ctx.fillStyle = `rgba(148, 163, 184, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, DOT_SIZE / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", onMove);
    parent?.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    rafRef.current = requestAnimationFrame(render);

    return () => {
      parent?.removeEventListener("mousemove", onMove);
      parent?.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

function drawStatic(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = `rgba(148, 163, 184, ${BASE_OPACITY})`;
  for (let y = GAP; y < h; y += GAP) {
    for (let x = GAP; x < w; x += GAP) {
      ctx.beginPath();
      ctx.arc(x, y, DOT_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
