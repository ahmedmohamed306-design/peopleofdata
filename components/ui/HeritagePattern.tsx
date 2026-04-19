type Props = {
  className?: string;
  opacity?: number;
};

/**
 * Repeating geometric pattern used on the Nefertiti module card.
 * Gold diamonds at low opacity on a 40px grid. Decorative — aria-hidden.
 */
export function HeritagePattern({ className, opacity = 0.06 }: Props) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="pod-heritage-diamonds"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 4 L36 20 L20 36 L4 20 Z"
            fill="none"
            stroke="#D4A843"
            strokeWidth="1"
          />
          <circle cx="20" cy="20" r="1.5" fill="#D4A843" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pod-heritage-diamonds)" />
    </svg>
  );
}
