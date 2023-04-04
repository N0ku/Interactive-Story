import React, { useState, useEffect } from "react";
import Camera from "../../components/Camera";
import { OrbitControls } from "@react-three/drei";
import { Sky } from "@react-three/drei";
import KickAnim from "../../3dcomponent/Kick_anim.js";
import RockyGround from "../../3dcomponent/Rocky_ground";
import Buildings from "../../3dcomponent/Game_ready_city_buildings";
import Wall from "../../3dcomponent/Wall";
import Apocalyptic from "../../components/Apocalyptic.js";
import * as THREE from "three";
import { Debug } from "@react-three/rapier";

function Scene1({ onSceneComplete, handleClick }) {
  const [lerping, setLerping] = useState(false);
  const [refObj, setRefObj] = useState(null);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(11);
  const [message, setMessage] = useState("");
  const [isSceneComplete, setIsSceneComplete] = useState(false);
  // const [inView, setInView] = useState(false); // Set State false to disable inView.

  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.01, -2),
    new THREE.Vector3(0, -0.01, 2),
    new THREE.Vector3(4, -0.01, 5),
    new THREE.Vector3(7, -0.01, 11),
  ]);
  const handleMessage = (messageFromChild) => {
    setMessage(messageFromChild);
    if (message != null) {
      setRefObj(message);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSceneComplete(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isSceneComplete) {
      onSceneComplete(true);
    }
  }, [isSceneComplete, onSceneComplete]);

  return (
    <>
      {/*       <Camera
        lerping={lerping}
        setLerping={setLerping}
        refTargetObject={refObj}
      ></Camera> */}

      <OrbitControls
        enableDamping
        dampingFactor={0.1}
        rotateSpeed={0.5} // Speed Rotation
        minPolarAngle={Math.PI / 6} // Limit angle in down direction
        maxPolarAngle={Math.PI / 2}
      />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} />

      {/* MAP ELEMENTS - START */}
      <group scale={250} position={[100, 125, -100]}>
        <Buildings />
      </group>
      <Debug />
      <Wall
        scale={7}
        rotation={[0, (-90 * Math.PI) / 180, 0]}
        position={[135, -20, -850]}
      />
      <group position={[0, -5, 0]}>
        <Apocalyptic />
      </group>
      {/* MAP ELEMENTS - END */}

      {/* MAIN CHARACTER */}
      <group position={[0, 10, 0]}>
        <KickAnim
          path={path}
          animationIndex={currentAnimationIndex}
          onSend={handleMessage}
          onClick={handleClick}
        />
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
    </>
  );
}

export default Scene1;
