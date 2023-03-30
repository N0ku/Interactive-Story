import React, { useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  SpotLight,
} from "@react-three/drei";
import * as THREE from "three";
import Kick from "../../3dcomponent/Kick.js";
import InfiniteGround from "../../components/InfiniteGround";
import DialogueBox from "../../components/DialogueBoxV2";


function GamePlay() {
  // const [inView, setInView] = useState(false); // Set State false to disable inView.
  //Fog settings
  const fogColor = 0xffffff;
  const fogNear = 0; // Dist to start fog
  const fogFar = 2000; // Dist to end fog



  return (
    <div className="App">
      <div className="canvas-container">
        <Canvas
          shadows
          shadowMapWidth={1024}
          shadowMapHeight={1024}
          antialias={false}
          style={{ width: "100%", height: "100%" }}
          onCreated={({ gl, scene }) => {
            scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
            gl.setClearColor(scene.fog.color);
          }}
        >
          <PerspectiveCamera
            makeDefault
            aspect={window.innerWidth / window.innerHeight}
            far={500}
            position={[0, 0, 5]}
            fov={50}
          />
          <directionalLight castShadow position={[0, 5, 2]} intensity={0.5} />
          {/* <SpotLight
            intensity={20}
            position={[0, 2, 0]}
            color={0xf0ffff}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.001}
          /> */}
          <InfiniteGround />
          <Kick />

          <OrbitControls
            enableDamping
            dampingFactor={0.1}
            rotateSpeed={0.5} // Speed Rotation
            minPolarAngle={Math.PI / 6} // Limit angle in down direction
            maxPolarAngle={Math.PI / 2} // Limit angle in up direction
          />
        </Canvas>
        <DialogueBox
          text="Salut toi ! Comment ça va ? Sartek ton dev brrroo, Askip t'as eu v'la des merdes mais la sa marche :3"
          speed={25}
          delay={2000}
          onComplete={() => console.log("Dialogue terminé !")}
          className="custom-dialogue-box"
        />
      </div>
    </div>
  );
}

export default GamePlay;
