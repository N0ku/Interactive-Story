import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import BaseballBat from "../../components/BaseballBat.js";
import Camera from "../../components/Camera"
import { Sky } from "@react-three/drei";
import Apocalyptic from "../../components/Apocalyptic.js";
import DialogueBox from "../../components/DialogueBoxV2";
import KickAnim from "../../3dcomponent/Kick_anim.js";
import RockyGround from "../../3dcomponent/Rocky_ground";
import Buildings from "../../3dcomponent/Game_ready_city_buildings";
import Wall from "../../3dcomponent/Wall";
import DirectionalLight from "../../3dcomponent/lightning/DirectionalLight";

//TODO 1 -Thomas - 2021-03-28 - Add LOD (Level Of Detail) - Display the appropriate level of detail based on the distance between the camera and the model to reduce the GPU workload.
//TODO 2 -Thomas - 2021-03-28 - Add Occlusion Frustum - Display the occlusion frustum based on the view camera versus the world, remove if camera don't see him.
//TODO 3 -Thomas - 2021-03-28 - Modify pixel ratio. Gain 10 fps when using low resolution.
//TODO 4 -Thomas - 2021-03-28 - Desactivate AntiAliasing. Hard graphic downgrade. gain 20/30 fps when using low resolution.

function GamePlay() {
  const [lerping, setLerping] = useState(false)
  const [refObj, setRefObj] = useState(null)
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(11);
  const [message, setMessage] = useState('');
  // const [inView, setInView] = useState(false); // Set State false to disable inView.


  const handleMessage = (messageFromChild) => {
    setMessage(messageFromChild);
    if (message != null) {
      setRefObj(message);
    }
  };


  // fog settings
  const fogColor = 0xffffff;
  const fogNear = 0; // Dist to start fog
  const fogFar = 2000; // Dist to end fog

  return (
    <div className="App">
      <div className="canvas-container">
        <Canvas
          antialias={false}
          style={{ width: "100%", height: "100%" }}
        // onCreated={({ gl, scene }) => {
        //   scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
        //   gl.setClearColor(scene.fog.color);
        // }}
        >
          <axesHelper scale={[2, 2, 2]} position={[0, 0, 0]} />

          <Camera lerping={lerping} setLerping={setLerping} refTargetObject={refObj}></Camera>
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.5} />

          {/* MAP ELEMENTS - START */}
          <group position={[0, -5, 0]}>
            <Apocalyptic />
          </group>
          <group scale={250} position={[100, 125, -100]}>
            <Buildings />
          </group>
          <Wall scale={7} rotation={[0, -90 * Math.PI / 180, 0]} position={[135, -20, -850]} />
          {/* MAP ELEMENTS - END */}

          {/* SPECIALS OBJECTS - START */}
          <BaseballBat scale={200} position={[619, 10, -800]} rotation={[90 * Math.PI / 180, 340 * Math.PI / 180, 70 * Math.PI / 180]} />
          {/* SPECIALS OBJECTS - END */}

          {/* MAIN CHARACTER */}
          <group scale={20}>
            <KickAnim animationIndex={currentAnimationIndex} onSend={handleMessage} />
          </group>

          {/* ENVIRONNMENT - START */}
          <RockyGround scale={10} position={[-200, -20, -300]} />
          <RockyGround scale={10} position={[1200, -20, -300]} />
          <Sky
            distance={35000}
            sunPosition={[5, 1, 8]}
            inclination={0}
            azimuth={0.25}
          />
          {/* ENVIRONNMENT - END */}

        </Canvas>
        <DialogueBox text="Salut toi ! Comment ça va ? Sartek ton dev brrroo, Askip t'as eu v'la des merdes mais la sa marche :3" speed={25} />
      </div>
    </div>
  );
}

export default GamePlay;
