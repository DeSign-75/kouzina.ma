const ARCH_PATH = "M34 252 V118 C18 72 54 16 100 16 C146 16 182 72 166 118 V252";
const ARCH_INNER =
  "M46 252 V121 C32 80 64 30 100 30 C136 30 168 80 154 121 V252";

/** An eight-point zellige star (two interlaced squares). */
export function StarOrnament({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="8.5" y="8.5" width="23" height="23" />
      <rect
        x="8.5"
        y="8.5"
        width="23"
        height="23"
        transform="rotate(45 20 20)"
      />
    </svg>
  );
}

/** Hairline rule with a single star in the middle. */
export function StarDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current" />
      <StarOrnament className="h-3.5 w-3.5" />
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}

/**
 * A Moroccan horseshoe arch filled with a zellige star tile.
 * Children are bottom-centred inside the opening.
 */
export function ArchFrame({
  children,
  className = "",
  tone = "red",
  patternId = "arch-zellige",
}: {
  children?: React.ReactNode;
  className?: string;
  tone?: "red" | "green";
  patternId?: string;
}) {
  const ink = tone === "red" ? "#A82A20" : "#1E6B4E";
  const fill = tone === "red" ? "#F7DFD5" : "#D9EADD";

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 260"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={patternId}
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <rect width="26" height="26" fill={fill} />
            <path
              d="M13 4.5 21.5 13 13 21.5 4.5 13Z"
              fill="none"
              stroke={ink}
              strokeOpacity="0.32"
              strokeWidth="1"
            />
            <circle cx="13" cy="13" r="1.3" fill={ink} fillOpacity="0.22" />
          </pattern>
        </defs>
        <path
          d={ARCH_PATH}
          fill={`url(#${patternId})`}
          stroke={ink}
          strokeOpacity="0.45"
          strokeWidth="2.5"
        />
        <path
          d={ARCH_INNER}
          fill="none"
          stroke={ink}
          strokeOpacity="0.22"
          strokeWidth="1.4"
        />
      </svg>
      <div className="absolute inset-0 flex items-end justify-center pb-1">
        {children}
      </div>
    </div>
  );
}
