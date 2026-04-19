"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { motion as motionTokens } from "@/lib/design-tokens";

type RevealProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView" | "transition"> & {
  delay?: number;
  distance?: number;
  as?: "div" | "section" | "article" | "header" | "footer" | "li" | "ul";
};

/**
 * Shared scroll-reveal wrapper.
 * - Fades in + slides up from `distance` px (default 16).
 * - Respects prefers-reduced-motion: no-op variant.
 * - Fires once, triggered when 10% into viewport.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 16,
  className,
  ...rest
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: motionTokens.duration.slow,
        ease: motionTokens.easing.easeOut,
        delay,
      }}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
