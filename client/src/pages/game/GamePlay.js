import React, { useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Circle, OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import * as THREE from "three";
import Kick from "../../components/Kick.js";
import InfiniteGround from "../../components/InfiniteGround";
import BaseballBat from "../../components/BaseballBat.js";
import { Sky } from "@react-three/drei";
import Apocalyptic from "../../components/Apocalyptic.js";

function GamePlay() {
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
        // onCreated={({ gl, scene }) => {
        //   scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
        //   gl.setClearColor(scene.fog.color);
        // }}
        >
          <axesHelper scale={[2, 2, 2]} position={[0, 0, 0]} />

          <Camera path={path} lerping={lerping} setLerping={setLerping}></Camera>
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.5} />
          <group position={[0, -5, 0]}>
            <Apocalyptic />
          </group>
          <group scale={20}>
            <Kick />
          </group>
          <BaseballBat scale={200} position={[619, 10, -800]} rotation={[90 * Math.PI / 180, 340 * Math.PI / 180, 70 * Math.PI / 180]} />
          <OrbitControls
            enableDamping
            dampingFactor={0.1}
            rotateSpeed={0.5} // Speed Rotation
            minPolarAngle={Math.PI / 6} // Limit angle in down direction
            maxPolarAngle={Math.PI / 2} // Limit angle in up direction
          />
          <Sky
            distance={35000}
            sunPosition={[5, 1, 8]}
            inclination={0}
            azimuth={0.25}
          />
        </Canvas>
      </div>
    </div>
  );
}

export default GamePlay;
