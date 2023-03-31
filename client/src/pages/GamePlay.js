import "../App.css";
import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import * as THREE from "three";
import Kick from "../3dcomponent/Kick.js";
import InfiniteGround from "../components/InfiniteGround";
import SmokeParticles from '../particles/Smoke';
import DialogueBox from '../components/DialogueBoxV2';
import InfoBox from '../components/InfoBox';



//TODO 1 -Thomas - 2021-03-28 - Add LOD (Level Of Detail) - Display the appropriate level of detail based on the distance between the camera and the model to reduce the GPU workload.
//TODO 2 -Thomas - 2021-03-28 - Add Occlusion Frustum - Display the occlusion frustum based on the view camera versus the world, remove if camera don't see him.
//TODO 3 -Thomas - 2021-03-28 - Modify pixel ratio. Gain 10 fps when using low resolution.
//TODO 4 -Thomas - 2021-03-28 - Desactivate AntiAliasing. Hard graphic downgrade. gain 20/30 fps when using low resolution.






function GamePlay() {
   const [position, setPosition] = useState([0, 0, 0]); 
  // const [inView, setInView] = useState(false); // Set State false to disable inView.
  //Fog settings
  const fogColor = 0xffffff;
  const fogNear = 5; // Dist to start fog
  const fogFar = 25; // Dist to end fog

  return (
    <div className="App">
      <div className="canvas-container">
        <Canvas
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
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
        </Canvas>
            <DialogueBox text="Salut toi ! Comment ça va ? Sartek ton dev brrroo, Askip t'as eu v'la des merdes mais la sa marche :3" speed={25} />
            <InfoBox text="Culé" speed={25} />
        
      </div>
    </div>
  );
}

export default GamePlay;
