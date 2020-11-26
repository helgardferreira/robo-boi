import React, { FunctionComponent, useEffect, useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { AnimationAction, AnimationMixer, LoopRepeat } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import useGLTF from "../../lib/hooks/use-gltf";

type ActionName =
  | "Dance"
  | "Death"
  | "Idle"
  | "Jump"
  | "No"
  | "Punch"
  | "Running"
  | "Sitting"
  | "Standing"
  | "ThumbsUp"
  | "Walking"
  | "WalkJump"
  | "Wave"
  | "Yes";
type GLTFActions = Record<ActionName, AnimationAction>;

const RoboBoi: FunctionComponent = () => {
  const gltf = useGLTF("/models/RobotExpressive.glb") as GLTF;
  const model = gltf.scene;
  const { animations } = gltf;
  const mixer = useMemo(() => new AnimationMixer(model), [model]);
  const actions = useRef<GLTFActions>();
  const activeAction = useRef<AnimationAction>();

  console.log("Rendering...");

  useEffect(() => {
    actions.current = {
      Dance: mixer.clipAction(animations[0]),
      Death: mixer.clipAction(animations[1]),
      Idle: mixer.clipAction(animations[2]),
      Jump: mixer.clipAction(animations[3]),
      No: mixer.clipAction(animations[4]),
      Punch: mixer.clipAction(animations[5]),
      Running: mixer.clipAction(animations[6]),
      Sitting: mixer.clipAction(animations[7]),
      Standing: mixer.clipAction(animations[8]),
      ThumbsUp: mixer.clipAction(animations[9]),
      Walking: mixer.clipAction(animations[10]),
      WalkJump: mixer.clipAction(animations[11]),
      Wave: mixer.clipAction(animations[12]),
      Yes: mixer.clipAction(animations[13]),
    };

    activeAction.current = actions.current.Walking;
    activeAction.current.clampWhenFinished = true;
    activeAction.current.loop = LoopRepeat;
    activeAction.current.play();

    // return () => animations.forEach((clip) => mixer.uncacheClip(clip));
  }, [animations, mixer]);

  useFrame(({ clock }) => {
    const dt = clock.getDelta();

    mixer.update(dt * 1000);
  });

  return <primitive object={model} />;
};

export default RoboBoi;
