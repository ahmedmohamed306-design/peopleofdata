"use client";

import { useEffect, useState, type ComponentType, type SVGProps } from "react";

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

type Props = {
  ltr: LucideIcon;
  rtl?: LucideIcon;
  size?: number;
  className?: string;
  "aria-hidden"?: boolean;
};

/**
 * Dir-aware icon wrapper. v1 renders LTR, but the wrapper is in place so
 * every directional chevron/arrow flips automatically when <html dir="rtl"> is set.
 * If no explicit rtl icon is provided, the ltr icon is mirrored via CSS.
 */
export function DirectionalIcon({
  ltr: Ltr,
  rtl: Rtl,
  size = 20,
  className,
  "aria-hidden": ariaHidden = true,
}: Props) {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    const htmlDir = document.documentElement.getAttribute("dir");
    setDir(htmlDir === "rtl" ? "rtl" : "ltr");
  }, []);

  if (dir === "rtl") {
    if (Rtl) {
      return <Rtl size={size} className={className} aria-hidden={ariaHidden} />;
    }
    return (
      <Ltr
        size={size}
        className={className ? `${className} -scale-x-100` : "-scale-x-100"}
        aria-hidden={ariaHidden}
      />
    );
  }

  return <Ltr size={size} className={className} aria-hidden={ariaHidden} />;
}
