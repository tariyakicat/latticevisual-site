import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const DropBreathe = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const brightness = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [0.85, 1.2, 0.85], {
    easing: Easing.inOut(Easing.sin),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Img
        src={staticFile("images/yoso/01-logo-dark.jpg")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `brightness(${brightness})`,
        }}
      />
    </AbsoluteFill>
  );
};
