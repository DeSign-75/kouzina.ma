import type { ArtKey } from "@/data/types";

const TONES: Record<string, { bg: string; accent: string }> = {
  bread: { bg: "#F6E3D8", accent: "#D9A25F" },
  bowl: { bg: "#FBEED2", accent: "#E4A02A" },
  pot: { bg: "#F2DDD2", accent: "#B4512F" },
  green: { bg: "#DDEDE7", accent: "#1F6F5C" },
  fish: { bg: "#DCE8F2", accent: "#3C6E8F" },
  sweet: { bg: "#F7E2E6", accent: "#B4512F" },
};

function frame(tone: keyof typeof TONES, children: React.ReactNode, rounded = 18) {
  const t = TONES[tone];
  return (
    <g>
      <rect x="0" y="0" width="100" height="100" rx={rounded} fill={t.bg} />
      <circle cx="50" cy="54" r="30" fill="#fff" opacity="0.55" />
      {children}
    </g>
  );
}

export function DishArt({
  art,
  className = "h-full w-full",
}: {
  art: ArtKey;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {render(art)}
    </svg>
  );
}

function render(art: ArtKey) {
  switch (art) {
    case "msemen":
      return frame(
        "bread",
        <g>
          <path d="M22 62l20-26 22 18-14 26z" fill="#E3B37A" />
          <path d="M26 60l18-23 19 16-12 23z" fill="#F2CE9C" />
          <path d="M32 58l12-15 12 10-8 15z" fill="#FBDFB4" opacity="0.9" />
          <path d="M46 40c5 2 8 5 9 10" stroke="#C98E62" strokeWidth="1.6" fill="none" opacity="0.5" />
          <path d="M58 34c3 6 1 10-2 14" stroke="#D08A2C" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <ellipse cx="50" cy="72" rx="24" ry="4" fill="#B4512F" opacity="0.12" />
        </g>
      );
    case "harcha":
      return frame(
        "bread",
        <g>
          <ellipse cx="46" cy="60" rx="26" ry="16" fill="#EBC58D" />
          <ellipse cx="46" cy="57" rx="24" ry="14" fill="#F6D9A8" />
          <g fill="#D9A25F">
            <circle cx="36" cy="55" r="1.6" />
            <circle cx="46" cy="52" r="1.6" />
            <circle cx="55" cy="57" r="1.6" />
            <circle cx="42" cy="61" r="1.6" />
          </g>
          <path d="M64 48l14 8-10 10-8-10z" fill="#F2C94C" />
          <circle cx="70" cy="54" r="2" fill="#E0AE2A" />
        </g>
      );
    case "baghrir":
      return frame(
        "bread",
        <g>
          <ellipse cx="50" cy="58" rx="27" ry="18" fill="#E9BC78" />
          <ellipse cx="50" cy="55" rx="25" ry="16" fill="#F7DCA8" />
          <g fill="#D9A25F" opacity="0.8">
            <circle cx="40" cy="52" r="1.8" />
            <circle cx="48" cy="49" r="1.8" />
            <circle cx="57" cy="54" r="1.8" />
            <circle cx="44" cy="59" r="1.8" />
            <circle cx="55" cy="61" r="1.8" />
            <circle cx="62" cy="49" r="1.8" />
          </g>
          <path d="M50 36c3 4 3 9 0 12-3-3-3-8 0-12Z" fill="#E4A02A" opacity="0.7" />
        </g>
      );
    case "sfenj":
      return frame(
        "bread",
        <g>
          <circle cx="50" cy="56" r="22" fill="#D9A25F" />
          <circle cx="50" cy="56" r="17" fill="#F2CE9C" />
          <circle cx="50" cy="56" r="7" fill="#F6E3D8" />
          <g stroke="#C98E62" strokeWidth="1.4" opacity="0.5" fill="none">
            <path d="M36 48c4 2 8 0 10 4" />
            <path d="M54 64c4-2 8 0 10-4" />
          </g>
        </g>
      );
    case "eggs":
      return frame(
        "bowl",
        <g>
          <ellipse cx="50" cy="62" rx="28" ry="12" fill="#B4512F" opacity="0.15" />
          <circle cx="50" cy="56" r="22" fill="#FFF9EE" stroke="#E7DBCC" strokeWidth="1.5" />
          <ellipse cx="45" cy="54" rx="10" ry="8" fill="#F7D9A0" />
          <circle cx="45" cy="54" r="5" fill="#E4A02A" />
          <circle cx="58" cy="60" r="6" fill="#C1502E" />
          <circle cx="35" cy="62" r="4.5" fill="#C1502E" opacity="0.9" />
          <path d="M30 68c8 4 32 4 40 0" stroke="#1F6F5C" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
        </g>
      );
    case "tea":
      return frame(
        "green",
        <g>
          <path d="M38 30h22l-3 22c-1 7-15 7-16 0z" fill="#FBF3E8" stroke="#D8C7AE" strokeWidth="1.5" />
          <path d="M40 44h18l-2 9c-1 4-12 4-13 0z" fill="#B77A3E" />
          <path d="M46 24c-4-6 2-8 0-12M54 24c-4-6 2-8 0-12" stroke="#1F6F5C" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
          <path d="M60 38l8 4-8 4" stroke="#E4A02A" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="50" cy="78" rx="18" ry="3" fill="#1F6F5C" opacity="0.15" />
        </g>
      );
    case "legumes":
      return frame(
        "bowl",
        <g>
          <path d="M24 52h52c0 16-11 26-26 26S24 68 24 52Z" fill="#E4A02A" opacity="0.85" />
          <path d="M28 52h44c0 13-9 21-22 21S28 65 28 52Z" fill="#C1502E" />
          <g fill="#F6E3D8">
            <circle cx="38" cy="56" r="4" />
            <circle cx="50" cy="60" r="4.5" />
            <circle cx="62" cy="56" r="4" />
            <circle cx="44" cy="66" r="3.6" />
            <circle cx="56" cy="67" r="3.4" />
          </g>
          <path d="M50 34c4 3 4 9 0 12-4-3-4-9 0-12Z" fill="#1F6F5C" opacity="0.3" />
        </g>
      );
    case "soup":
      return frame(
        "bowl",
        <g>
          <path d="M22 50h56c0 17-12 28-28 28S22 67 22 50Z" fill="#F3E7D8" stroke="#E0CDB4" strokeWidth="1.5" />
          <path d="M26 52h48c0 13-10 22-24 22S26 65 26 52Z" fill="#C1502E" />
          <path d="M36 60c6-4 10 2 16-2s10 2 14-1" stroke="#F6C89A" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.8" />
          <path d="M42 34c-4-5 3-7 0-12M52 34c-4-5 3-7 0-12" stroke="#B4512F" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
        </g>
      );
    case "tagine":
      return frame(
        "pot",
        <g>
          <path d="M20 66h60c0 10-13 16-30 16S20 76 20 66Z" fill="#C1502E" />
          <path d="M24 64h52" stroke="#96401F" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 18l24 44H26Z" fill="#E7C08F" />
          <path d="M50 18l14 26H36Z" fill="#F2D4AC" opacity="0.7" />
          <circle cx="50" cy="16" r="4" fill="#B4512F" />
          <path d="M42 40h16" stroke="#C9A277" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
        </g>
      );
    case "couscous":
      return frame(
        "bowl",
        <g>
          <ellipse cx="50" cy="60" rx="30" ry="14" fill="#E7C08F" />
          <path d="M22 58c0-12 12-20 28-20s28 8 28 20Z" fill="#F7DCA8" />
          <g>
            <circle cx="38" cy="48" r="4" fill="#E4A02A" />
            <circle cx="52" cy="44" r="4.5" fill="#C1502E" />
            <circle cx="64" cy="50" r="4" fill="#1F6F5C" />
            <circle cx="46" cy="54" r="3.5" fill="#7FA08F" />
          </g>
          <path d="M22 60c6 4 50 4 56 0" stroke="#C9A277" strokeWidth="1.5" fill="none" opacity="0.6" />
        </g>
      );
    case "salad":
      return frame(
        "green",
        <g>
          <path d="M22 54h56c0 15-12 24-28 24S22 69 22 54Z" fill="#F3E7D8" />
          <g>
            <circle cx="36" cy="52" r="6" fill="#C1502E" />
            <circle cx="50" cy="48" r="7" fill="#1F6F5C" />
            <circle cx="64" cy="53" r="6" fill="#E4A02A" />
            <circle cx="43" cy="60" r="5" fill="#7FA08F" />
            <circle cx="57" cy="61" r="5" fill="#C1502E" />
          </g>
          <path d="M72 40c4-4 8-4 12 0" stroke="#1F6F5C" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
        </g>
      );
    case "chicken":
      return frame(
        "pot",
        <g>
          <ellipse cx="50" cy="66" rx="30" ry="10" fill="#B4512F" opacity="0.15" />
          <ellipse cx="46" cy="54" rx="22" ry="17" fill="#D9863F" />
          <ellipse cx="43" cy="50" rx="17" ry="12" fill="#E9A85C" />
          <path d="M62 44c6 3 7 9 2 12" stroke="#C97A34" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="38" cy="48" r="2" fill="#B4512F" opacity="0.6" />
          <circle cx="50" cy="55" r="2" fill="#B4512F" opacity="0.6" />
          <path d="M30 64c-4-4-8-4-10 0" stroke="#1F6F5C" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </g>
      );
    case "fish":
      return frame(
        "fish",
        <g>
          <ellipse cx="50" cy="68" rx="28" ry="8" fill="#3C6E8F" opacity="0.12" />
          <path d="M26 58c8-12 26-16 38-8l12-6-2 12 2 12-12-6c-12 8-30 4-38-4Z" fill="#7FA8C4" />
          <path d="M32 58c7-7 22-9 32-3" stroke="#5C8CAE" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
          <circle cx="38" cy="53" r="2.4" fill="#2A2320" />
          <path d="M70 54c-3 3-3 7 0 10" stroke="#3C6E8F" strokeWidth="1.6" fill="none" />
          <circle cx="63" cy="70" r="5" fill="#E4C55A" />
          <path d="M27 40c4-4 8-4 12 0" stroke="#1F6F5C" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
        </g>
      );
    case "shrimp":
      return frame(
        "fish",
        <g>
          <path d="M60 40c-14-4-26 6-26 20s12 20 22 16" stroke="#E58A6A" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M60 40c-14-4-26 6-26 20s12 20 22 16" stroke="#F2A98C" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M60 40l10-4-2 10" fill="#E58A6A" />
          <circle cx="40" cy="52" r="1.8" fill="#2A2320" />
        </g>
      );
    case "veg":
      return frame(
        "green",
        <g>
          <path d="M26 50h48c0 15-10 24-24 24S26 65 26 50Z" fill="#E7C08F" />
          <g>
            <path d="M38 46c0-8 4-12 8-12s8 4 8 12z" fill="#C1502E" />
            <circle cx="62" cy="46" r="7" fill="#E4A02A" />
            <circle cx="30" cy="46" r="6" fill="#1F6F5C" />
          </g>
          <path d="M50 34c3-5 8-6 12-4" stroke="#1F6F5C" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    case "pasta":
      return frame(
        "bowl",
        <g>
          <ellipse cx="50" cy="62" rx="28" ry="13" fill="#F3E7D8" />
          <path d="M26 56c4-10 14-16 24-16s20 6 24 16" fill="#F2C94C" />
          <g stroke="#D9A25F" strokeWidth="1.6" fill="none" opacity="0.7">
            <path d="M32 54c6-6 12-4 18 0s12 6 18 0" />
            <path d="M34 60c6-6 12-4 18 0s12 6 16 0" />
          </g>
          <circle cx="50" cy="46" r="4" fill="#C1502E" />
          <path d="M50 34c3-4 7-4 10 0" stroke="#1F6F5C" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
        </g>
      );
    case "rice":
      return frame(
        "bowl",
        <g>
          <ellipse cx="50" cy="62" rx="28" ry="13" fill="#FFF9EE" stroke="#E7DBCC" strokeWidth="1.4" />
          <path d="M28 58c2-12 12-18 22-18s20 6 22 18z" fill="#FBF3E8" />
          <g fill="#7FA08F">
            <circle cx="40" cy="53" r="2.2" />
            <circle cx="50" cy="48" r="2.2" />
            <circle cx="58" cy="55" r="2.2" />
            <circle cx="46" cy="58" r="2.2" />
            <circle cx="56" cy="60" r="2.2" />
          </g>
          <circle cx="62" cy="50" r="3.4" fill="#E4A02A" />
        </g>
      );
    case "lunchbox":
      return frame(
        "sweet",
        <g>
          <rect x="26" y="36" width="48" height="34" rx="7" fill="#E4A02A" />
          <rect x="30" y="40" width="40" height="26" rx="5" fill="#FBF3E8" />
          <rect x="33" y="43" width="16" height="20" rx="3" fill="#C1502E" opacity="0.8" />
          <rect x="52" y="43" width="14" height="9" rx="2" fill="#1F6F5C" opacity="0.7" />
          <rect x="52" y="55" width="14" height="8" rx="2" fill="#E4A02A" opacity="0.8" />
          <path d="M36 33h28" stroke="#B4512F" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "cake":
      return frame(
        "sweet",
        <g>
          <path d="M28 66h44V46l-22-10-22 10z" fill="#E7C08F" />
          <path d="M28 46c8 6 14-2 22 2s14 4 22-2V40l-22-8-22 8z" fill="#FBF3E8" />
          <path d="M50 32v-6M44 30l-2-4M56 30l2-4" stroke="#C1502E" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="52" r="4" fill="#C1502E" />
          <circle cx="40" cy="54" r="3" fill="#1F6F5C" opacity="0.7" />
          <circle cx="60" cy="54" r="3" fill="#E4A02A" />
        </g>
      );
    case "cookie":
      return frame(
        "sweet",
        <g>
          <circle cx="50" cy="54" r="21" fill="#D9A25F" />
          <circle cx="50" cy="52" r="19" fill="#EFC68F" />
          <g fill="#8C5A2B">
            <circle cx="42" cy="46" r="2.4" />
            <circle cx="56" cy="50" r="2.4" />
            <circle cx="48" cy="60" r="2.4" />
            <circle cx="60" cy="60" r="2" />
            <circle cx="38" cy="56" r="2" />
          </g>
          <path d="M70 34l6 6-6 6" stroke="#B4512F" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
        </g>
      );
    case "sandwich":
      return frame(
        "bread",
        <g>
          <path d="M28 64l22-30 22 30z" fill="#E3B37A" />
          <path d="M32 62l18-24 18 24z" fill="#F2CE9C" />
          <path d="M36 58c4-4 6 2 10-2s6 2 10-2" stroke="#C1502E" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M34 64h32" stroke="#1F6F5C" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </g>
      );
    default:
      return frame(
        "bowl",
        <g>
          <circle cx="50" cy="52" r="22" fill="#E4A02A" opacity="0.7" />
          <path d="M34 58c8 6 24 6 32 0" stroke="#B4512F" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );
  }
}
