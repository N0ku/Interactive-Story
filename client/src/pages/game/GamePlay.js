import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera, Plane, SpotLight } from "@react-three/drei";
import BaseballBat from "../../components/BaseballBat.js";
import Camera from "../../components/Camera"
import { Sky } from "@react-three/drei";
import Apocalyptic from "../../components/Apocalyptic.js";
import DialogueBox from "../../components/DialogueBoxV2";
import KickAnim from "../../3dcomponent/Kick_anim.js";
import RockyGround from "../../3dcomponent/Rocky_ground";
import Buildings from "../../3dcomponent/Game_ready_city_buildings";
import Wall from "../../3dcomponent/Wall"
function GamePlay() {
  const [lerping, setLerping] = useState(false)
  // const [inView, setInView] = useState(false); // Set State false to disable inView.
  //Fog settings
  const [refObj, setRefObj] = useState(null)
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(6);





  const [message, setMessage] = useState('');


  const handleMessage = (messageFromChild) => {
    setMessage(messageFromChild);
    console.log(message)
    if (message != null) {
      setRefObj(message);
      console.log(refObj)

    }

  };


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
          <group position={[0, -5, 0]}>
            <Apocalyptic />
          </group>
          <BaseballBat scale={200} position={[619, 10, -800]} rotation={[90 * Math.PI / 180, 340 * Math.PI / 180, 70 * Math.PI / 180]} />
          <Wall scale={7} rotation={[0, -90 * Math.PI / 180, 0]} position={[135, -20, -850]} />
          <RockyGround scale={10} position={[-200, -20, -300]} />
          <RockyGround scale={10} position={[1200, -20, -300]} />
          <group scale={250} position={[100, 125, -100]}>
            <Buildings />
          </group>
          <group scale={20}>
            <KickAnim animationIndex={currentAnimationIndex} />
          </group>
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
