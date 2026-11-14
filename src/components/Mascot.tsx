export type MascotMood =
  | "welcome"
  | "thinking"
  | "happy"
  | "encouraging"
  | "sleepy"
  | "sorry";

interface MascotProps {
  mood?: MascotMood;
  className?: string;
  showBackground?: boolean;
}

export function LallaZohra({
  mood = "welcome",
  className = "h-40 w-40",
  showBackground = true,
}: MascotProps) {
  const eyesHappy = mood === "happy" || mood === "encouraging";
  const eyesSleepy = mood === "sleepy";
  const eyesThinking = mood === "thinking";

  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      role="img"
      aria-label="لالة زهرة"
    >
      {showBackground && (
        <>
          <circle cx="110" cy="112" r="104" fill="#F9E9C7" opacity="0.5" />
          <circle cx="110" cy="112" r="86" fill="#D9EADD" opacity="0.55" />
          <g fill="none" stroke="#A82A20" strokeOpacity="0.28" strokeWidth="1.4">
            <rect x="33" y="37" width="15" height="15" />
            <rect x="33" y="37" width="15" height="15" transform="rotate(45 40.5 44.5)" />
          </g>
          <g fill="none" stroke="#1E6B4E" strokeOpacity="0.3" strokeWidth="1.4">
            <rect x="173" y="67" width="13" height="13" />
            <rect x="173" y="67" width="13" height="13" transform="rotate(45 179.5 73.5)" />
          </g>
          <circle cx="46" cy="176" r="2.4" fill="#D69A2D" opacity="0.5" />
          <circle cx="176" cy="150" r="2" fill="#A82A20" opacity="0.35" />
        </>
      )}

      {/* dress / shoulders */}
      <path
        d="M44 214c2-38 30-58 66-58s64 20 66 58Z"
        fill="#2C7457"
      />
      <path
        d="M82 214c0-30 12-44 28-44s28 14 28 44Z"
        fill="#A82A20"
      />
      <path
        d="M96 186h28M100 196h20"
        stroke="#7C1810"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* neck */}
      <path d="M98 138h24v18c0 7-24 7-24 0Z" fill="#DFAF86" />

      {/* headscarf outer */}
      <path
        d="M110 46c-34 0-52 24-52 56 0 18 6 32 14 40 4 4 10 5 14 2l4-14c-8-8-12-20-12-32 0-22 12-36 32-36s32 14 32 36c0 12-4 24-12 32l4 14c4 3 10 2 14-2 8-8 14-22 14-40 0-32-18-56-52-56Z"
        fill="#F5E9D3"
      />
      <path
        d="M110 46c-34 0-52 24-52 56 0 18 6 32 14 40 4 4 10 5 14 2l4-14c-8-8-12-20-12-32 0-22 12-36 32-36s32 14 32 36c0 12-4 24-12 32l4 14c4 3 10 2 14-2 8-8 14-22 14-40 0-32-18-56-52-56Z"
        fill="none"
        stroke="#E7D5BB"
        strokeWidth="1.5"
      />

      {/* scarf pattern */}
      <g fill="#A82A20" opacity="0.22">
        <circle cx="76" cy="88" r="2.4" />
        <circle cx="70" cy="104" r="2.4" />
        <circle cx="76" cy="120" r="2.4" />
        <circle cx="144" cy="88" r="2.4" />
        <circle cx="150" cy="104" r="2.4" />
        <circle cx="144" cy="120" r="2.4" />
      </g>

      {/* face */}
      <ellipse cx="110" cy="106" rx="34" ry="40" fill="#E9C4A0" />

      {/* forehead scarf band */}
      <path
        d="M76 96c2-24 16-36 34-36s32 12 34 36c-10-10-21-14-34-14s-24 4-34 14Z"
        fill="#FBF4E6"
      />
      <path
        d="M78 92c8-12 19-18 32-18s24 6 32 18"
        stroke="#A82A20"
        strokeWidth="3"
        fill="none"
        opacity="0.35"
      />

      {/* brows */}
      <path
        d="M88 96c4-3 9-3 12 0M120 96c4-3 9-3 12 0"
        stroke="#6B4E3D"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {/* glasses */}
      <g stroke="#3A2E28" strokeWidth="2.2" fill="none">
        <circle cx="94" cy="108" r="12" />
        <circle cx="126" cy="108" r="12" />
        <path d="M106 108h8" />
        <path d="M82 104l-7-3M138 104l7-3" strokeLinecap="round" />
      </g>

      {/* eyes */}
      {eyesSleepy ? (
        <g stroke="#3A2E28" strokeWidth="2.2" strokeLinecap="round">
          <path d="M89 109c3 2.5 7 2.5 10 0" fill="none" />
          <path d="M121 109c3 2.5 7 2.5 10 0" fill="none" />
        </g>
      ) : eyesHappy ? (
        <g stroke="#3A2E28" strokeWidth="2.4" strokeLinecap="round">
          <path d="M89 110c3-4 7-4 10 0" fill="none" />
          <path d="M121 110c3-4 7-4 10 0" fill="none" />
        </g>
      ) : (
        <g fill="#3A2E28">
          <ellipse cx="94" cy="109" rx="3.1" ry="3.6" className="mascot-eyes" />
          <ellipse cx="126" cy="109" rx="3.1" ry="3.6" className="mascot-eyes" />
          <circle cx="95.2" cy="107.6" r="1" fill="#fff" opacity="0.9" />
          <circle cx="127.2" cy="107.6" r="1" fill="#fff" opacity="0.9" />
        </g>
      )}

      {eyesThinking && (
        <g fill="#3A2E28" opacity="0.5">
          <circle cx="146" cy="72" r="2.2" />
          <circle cx="152" cy="66" r="1.6" />
          <circle cx="156" cy="61" r="1.1" />
        </g>
      )}

      {/* nose */}
      <path
        d="M110 112c-2 5-3 7 0 8"
        stroke="#C98E62"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* smile */}
      {mood === "sorry" ? (
        <path
          d="M101 130c5-3 13-3 18 0"
          stroke="#8C4A3A"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
      ) : mood === "sleepy" ? (
        <path
          d="M103 129h14"
          stroke="#8C4A3A"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M100 126c5 6 15 6 20 0"
          stroke="#8C4A3A"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* cheeks */}
      <ellipse cx="84" cy="120" rx="7" ry="4.6" fill="#E48A6A" opacity="0.3" />
      <ellipse cx="136" cy="120" rx="7" ry="4.6" fill="#E48A6A" opacity="0.3" />

      {/* earrings */}
      <circle cx="72" cy="126" r="3.4" fill="#D69A2D" />
      <circle cx="148" cy="126" r="3.4" fill="#D69A2D" />

      {/* small steam / warmth */}
      <g stroke="#A82A20" strokeWidth="2" strokeLinecap="round" opacity="0.35">
        <path d="M168 96c4-6 0-10 3-16" fill="none" />
        <path d="M178 104c4-6 0-10 3-16" fill="none" />
      </g>
    </svg>
  );
}
