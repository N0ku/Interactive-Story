import React, { useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera, Plane, SpotLight } from "@react-three/drei";
import * as THREE from "three";
import Kick from "../../components/Kick.js";
import InfiniteGround from "../../components/InfiniteGround";
import BaseballBat from "../../components/BaseballBat.js";
import Camera from "../../components/Camera"
import { Sky } from "@react-three/drei";
import Apocalyptic from "../../components/Apocalyptic.js";
import { useRef } from "react";
import DialogueBox from "../../components/DialogueBoxV2";


function GamePlay() {
  const batRef = useRef();
  const [lerping, setLerping] = useState(false)
  // const [inView, setInView] = useState(false); // Set State false to disable inView.
  //Fog settings

  const fogColor = 0xffffff;
  const fogNear = 0; // Dist to start fog
  const fogFar = 2000; // Dist to end fog

  useFrame(() => {
    const batPosition = batRef.current.position;
  })

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

          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.5} />
          <group position={[0, -5, 0]}>
            <Apocalyptic />
          </group>
          <group scale={20}>
            <Kick />
          </group>
          <BaseballBat scale={200} position={[619, 10, -800]} rotation={[90 * Math.PI / 180, 340 * Math.PI / 180, 70 * Math.PI / 180]} />
          <Camera lerping={lerping} setLerping={setLerping}></Camera>
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
        <DialogueBox text="Salut toi ! Comment ça va ? Sartek ton dev brrroo, Askip t'as eu v'la des merdes mais la sa marche :3" speed={25} />
      </div>
    </div>
  );
}

export default GamePlay;
