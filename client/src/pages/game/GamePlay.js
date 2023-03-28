import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import * as THREE from "three";
import Kick from "../../3dcomponent/Kick.js";
import InfiniteGround from "../../components/InfiniteGround";
import Led from "../../3dcomponent/Led.js";
import Chair from "../../3dcomponent/Chair.js";
import Baseball from "../../3dcomponent/Baseball.js";
import ModelLoader from "../../classLoader/ModelLoader";

//TODO 1 -Thomas - 2021-03-28 - Add LOD (Level Of Detail) - Display the appropriate level of detail based on the distance between the camera and the model to reduce the GPU workload.
//TODO 2 -Thomas - 2021-03-28 - Add Occlusion Frustum - Display the occlusion frustum based on the view camera versus the world, remove if camera don't see him.
//TODO 3 -Thomas - 2021-03-28 - Modify pixel ratio. Gain 10 fps when using low resolution.
//TODO 4 -Thomas - 2021-03-28 - Desactivate AntiAliasing. Hard graphic downgrade. gain 20/30 fps when using low resolution.

function GamePlay() {
  // const [inView, setInView] = useState(false); // Set State false to disable inView.
  //Fog settings
  const fogColor = 0xffffff;
  const fogNear = 5; // Dist to start fog
  const fogFar = 25; // Dist to end fog

  return (
    <div className="App">
      <div className="canvas-container">
        <Canvas
          style={{ width: "100%", height: "100%" }}
          // onCreated={({ gl, scene }) => {
          //   scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
          //   gl.setClearColor(scene.fog.color);
          // }}
        >
          <axesHelper scale={[2, 2, 2]} position={[0, 0, 0]} />

          <PerspectiveCamera
            makeDefault
            aspect={window.innerWidth / window.innerHeight}
            far={500}
            position={[0, 0, 5]}
            fov={50}
          />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.5} />
          <InfiniteGround />
          <Chair />
          <Led />
          <ModelLoader
            path="/low_poly_baseball_bat.glb"
            position={[0, -1, 1]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.001}
          />
          <Kick />
          <OrbitControls
            enableDamping
            dampingFactor={0.1}
            rotateSpeed={0.5} // Speed Rotation
            minPolarAngle={Math.PI / 6} // Limit angle in down direction
            maxPolarAngle={Math.PI / 2} // Limit angle in up direction
          />
        </Canvas>
      </div>
    </div>
  );
}

export default GamePlay;
