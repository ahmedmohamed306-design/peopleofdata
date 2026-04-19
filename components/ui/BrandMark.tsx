type Props = {
  /** Color of the wordmark text. Accepts any Tailwind text-* class. */
  wordmarkClassName?: string;
  /** If false, only renders the three dots. */
  showWordmark?: boolean;
  className?: string;
};

/**
 * The POD logo: three colored dots (gold, blue, teal) + "People of Data" wordmark.
 * The dots map to the three pillars: networking, knowledge, career.
 */
export function BrandMark({
  wordmarkClassName = "text-text-primary",
  showWordmark = true,
  className,
}: Props) {
  return (
    <span
      className={
        "inline-flex items-center" +
        (className ? " " + className : "")
      }
      aria-label="People of Data"
    >
      <span className="me-3 inline-flex items-center gap-[6px]" aria-hidden="true">
        <span className="block h-[10px] w-[10px] rounded-full bg-gold-500" />
        <span className="block h-[10px] w-[10px] rounded-full bg-blue-600" />
        <span className="block h-[10px] w-[10px] rounded-full bg-teal-500" />
      </span>
      {showWordmark ? (
        <span
          className={`font-[var(--font-jakarta)] text-base font-bold tracking-[-0.01em] ${wordmarkClassName}`}
        >
          People of Data
        </span>
      ) : null}
    </span>
  );
}
