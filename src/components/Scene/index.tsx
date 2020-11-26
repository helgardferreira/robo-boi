import React, { FunctionComponent, Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { Color, Fog, GridHelper, Material } from "three";
import RoboBoi from "../RoboBoi";

const SceneConfig: FunctionComponent = () => {
  const { scene, camera } = useThree();
  scene.background = new Color(0xe0e0e0);
  scene.fog = new Fog(0xe0e0e0, 20, 100);
  camera.lookAt(0, 2, 0);

  return <></>;
};

const Lights: FunctionComponent = () => {
  return (
    <group>
      <hemisphereLight
        color={new Color(0xffffff)}
        groundColor={new Color(0x444444)}
        position={[0, 20, 0]}
      />
      <directionalLight color={new Color(0xffffff)} position={[0, 20, 10]} />
    </group>
  );
};

const Ground: FunctionComponent = () => {
  const grid = useRef<GridHelper>(null);

  useEffect(() => {
    if (grid.current) {
      (grid.current.material as Material).opacity = 0.2;
      (grid.current.material as Material).transparent = true;
    }
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[2000, 2000]} />
        <meshPhongMaterial
          attach="material"
          color={new Color(0x999999)}
          depthWrite={false}
        />
      </mesh>
      <gridHelper ref={grid} args={[200, 40, 0x000000, 0x000000]} />
    </group>
  );
};

const Scene: FunctionComponent = () => {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100vh",
      }}
      gl={{ antialias: true }}
      pixelRatio={window.devicePixelRatio}
      camera={{
        fov: 45,
        near: 0.25,
        far: 100,
        position: [-5, 3, 10],
      }}
    >
      <SceneConfig />
      <Lights />
      <Ground />
      <Suspense fallback={null}>
        <RoboBoi />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
