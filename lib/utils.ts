type ClassValue = string | number | null | false | undefined | ClassValue[];

/**
 * Minimal class-name joiner. Flattens nested arrays, skips falsy values.
 * Intentionally not clsx/tailwind-merge — Section 1 limits deps.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (v: ClassValue) => {
    if (!v && v !== 0) return;
    if (Array.isArray(v)) v.forEach(walk);
    else out.push(String(v));
  };
  inputs.forEach(walk);
  return out.join(" ");
}
