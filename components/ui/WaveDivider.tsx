import type { CSSProperties } from "react";

interface WaveDividerProps {
  topColor: string;
  bottomColor: string;
  flipped?: boolean;
}

export default function WaveDivider({
  topColor,
  bottomColor,
  flipped = false,
}: WaveDividerProps) {
  const transformStyle: CSSProperties = flipped
    ? { transform: "rotate(180deg)" }
    : {};

  return (
    <div aria-hidden="true" style={{ background: topColor, lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full h-[72px] md:h-[92px]"
        style={transformStyle}
      >
        <path
          fill={bottomColor}
          d="M0,64 C180,120 360,8 540,32 C720,56 900,136 1080,104 C1260,72 1350,24 1440,40 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
