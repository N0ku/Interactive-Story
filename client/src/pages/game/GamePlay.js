import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import * as THREE from "three";
import Kick from "../../components/Kick.js";
import InfiniteGround from "../../components/InfiniteGround";




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
