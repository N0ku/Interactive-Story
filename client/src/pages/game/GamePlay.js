import React, { useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Circle, OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import * as THREE from "three";
import Kick from "../../components/Kick.js";
import InfiniteGround from "../../components/InfiniteGround";
import BaseballBat from "../../components/BaseballBat.js";
import Camera from "../../components/Camera"
import { Sky } from "@react-three/drei";
import Apocalyptic from "../../components/Apocalyptic.js";
import { useRef } from "react";


function GamePlay() {
  const ref = useRef(null);
  const [lerping, setLerping] = useState(false)
  const [refObj, setRefObj] = useState(null)
  // const [inView, setInView] = useState(false); // Set State false to disable inView.
  //Fog settings


  const [message, setMessage] = useState('');
 

  const handleMessage = (messageFromChild) => {
    setMessage(messageFromChild);
    console.log(message)
    if(message != null){
        setRefObj(message); 
        console.log(refObj)

    }

  };  


  const fogColor = 0xffffff;
  const fogNear = 5; // Dist to start fog
  const fogFar = 25; // Dist to end fog
  /* const geometry = new THREE.CircleGeometry(1, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const circle = new THREE.Mesh(geometry, material);

scene.add(circle); */

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
          <Camera lerping={lerping} setLerping={setLerping} refTargetObject={refObj} position={[0,2,-5]} ></Camera>
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.5} />
          <group position={[0, -5, 0]}>
            <Apocalyptic />
          </group>
          <group scale={20}>
            <Kick ref={ref} onSend={handleMessage} />
          </group>
          <BaseballBat scale={200} position={[619, 10, -800]} rotation={[90 * Math.PI / 180, 340 * Math.PI / 180, 70 * Math.PI / 180]} />
         
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
