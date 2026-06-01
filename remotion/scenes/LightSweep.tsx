import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const LightSweep = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pos = interpolate(frame, [0, durationInFrames], [-20, 120], {
    easing: Easing.linear,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Img
        src={staticFile("images/yoso/11-lifestyle-01.jpg")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to right, transparent ${pos - 20}%, rgba(255, 220, 160, 0.18) ${pos}%, transparent ${pos + 20}%)`,
        }}
      />
    </AbsoluteFill>
  );
};
