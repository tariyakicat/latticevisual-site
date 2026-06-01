import { Composition, registerRoot } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { DropZoom } from "./scenes/DropZoom";
import { LightSweep } from "./scenes/LightSweep";
import { DropBreathe } from "./scenes/DropBreathe";

const FPS = 30;
const SCENE_FRAMES = 150;
const TRANSITION_FRAMES = 15;
const TOTAL_FRAMES = SCENE_FRAMES * 3;

const YosoHero = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES}>
      <DropBreathe />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />
    <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES}>
      <LightSweep />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />
    <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES}>
      <DropZoom />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

export const RemotionRoot = () => (
  <Composition id="YosoHero" component={YosoHero} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1280} height={720} />
);

registerRoot(RemotionRoot);
