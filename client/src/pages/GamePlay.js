import "../App.css";
import React, { useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Circle, OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import * as THREE from "three";
import Kick from "../3dcomponent/Kick.js";
import InfiniteGround from "../components/InfiniteGround";
import Camera from "../components/Camera";
import { CircleGeometry } from "three";
import { useRef } from "react";


function Ring() {
  const ref = useRef(null);

  return (
    <mesh
      visible
      position={[0, 0, 0]}
      rotation={[190, 0, 0]}
      castShadow
      ref={ref}>
      <ringBufferGeometry args={[1, 4, 32]} />
      <meshBasicMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

//TODO 1 -Thomas - 2021-03-28 - Add LOD (Level Of Detail) - Display the appropriate level of detail based on the distance between the camera and the model to reduce the GPU workload.
//TODO 2 -Thomas - 2021-03-28 - Add Occlusion Frustum - Display the occlusion frustum based on the view camera versus the world, remove if camera don't see him.
//TODO 3 -Thomas - 2021-03-28 - Modify pixel ratio. Gain 10 fps when using low resolution.
//TODO 4 -Thomas - 2021-03-28 - Desactivate AntiAliasing. Hard graphic downgrade. gain 20/30 fps when using low resolution.

function GamePlay() {
  const ref = useRef(null);
  const [lerping, setLerping] = useState(false)
  // const [inView, setInView] = useState(false); // Set State false to disable inView.
  //Fog settings

  const fogColor = 0xffffff;
  const fogNear = 5; // Dist to start fog
  const fogFar = 25; // Dist to end fog
  /* const geometry = new THREE.CircleGeometry(1, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const circle = new THREE.Mesh(geometry, material);

scene.add(circle); */


  const path = new THREE.CatmullRomCurve3([

    new THREE.Vector3(0, 0, 22),
    new THREE.Vector3(0, 0, 12),
    new THREE.Vector3(0, 2, 11),







  ]);
  return (
    <div className="App">
      <div className="canvas-container">
        <Canvas

          style={{ width: "100%", height: "100%" }}
          onCreated={({ gl, scene }) => {
            scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
            gl.setClearColor(scene.fog.color);
          }}
        >
          <axesHelper scale={[2, 2, 2]} position={[0, 0, 0]} />
          <Camera path={path} lerping={lerping} setLerping={setLerping}></Camera>
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.5} />
          <InfiniteGround />
          <Kick position={[0, 0, 0]} />
          <group position={[0, 0, 10]}>
            <Ring></Ring>
          </group>
          <Kick position={[0, 0, 10]} />





        </Canvas>
      </div>
    </div>
  );
}

export default GamePlay;
