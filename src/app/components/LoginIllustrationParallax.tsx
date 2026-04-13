import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { cn } from "./ui/utils";

/** Soft, weighted follow — low stiffness, higher damping = no wobble. */
const SPRING = { stiffness: 78, damping: 36, mass: 1.25 } as const;

function clamp(n: number, min = -1, max = 1) {
  return Math.min(max, Math.max(min, n));
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

type LoginIllustrationParallaxProps = {
  src: string;
  alt?: string;
  /** Max shift in px (opposite to cursor). */
  maxOffset?: number;
  className?: string;
  imgClassName?: string;
};

export function LoginIllustrationParallax({
  src,
  alt = "",
  maxOffset = 10,
  className,
  imgClassName,
}: LoginIllustrationParallaxProps) {
  const regionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const x = useSpring(tx, SPRING);
  const y = useSpring(ty, SPRING);

  useEffect(() => {
    if (reducedMotion) return;

    const region = regionRef.current;
    if (!region) return;

    const onMove = (e: MouseEvent) => {
      const r = region.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const halfW = Math.max(r.width / 2, 1);
      const halfH = Math.max(r.height / 2, 1);
      const nx = clamp((e.clientX - cx) / halfW);
      const ny = clamp((e.clientY - cy) / halfH);
      tx.set(-nx * maxOffset);
      ty.set(-ny * maxOffset);
    };

    const reset = () => {
      tx.set(0);
      ty.set(0);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    region.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", onMove);
      region.removeEventListener("mouseleave", reset);
    };
  }, [maxOffset, reducedMotion, tx, ty]);

  const imgClasses = cn(
    "mx-auto h-auto w-full max-h-[min(75vh,600px)] lg:max-h-[min(78vh,640px)] object-contain opacity-95",
    imgClassName,
  );

  return (
    <div
      ref={regionRef}
      className={cn("relative w-full max-w-[520px] lg:max-w-none", className)}
    >
      {reducedMotion ? (
        <img src={src} alt={alt} className={imgClasses} />
      ) : (
        <motion.img src={src} alt={alt} style={{ x, y }} className={imgClasses} />
      )}
    </div>
  );
}
