import React, { useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera, Plane, SpotLight } from "@react-three/drei";
import * as THREE from "three";
import InfiniteGround from "../../components/InfiniteGround";
import BaseballBat from "../../components/BaseballBat.js";
import Camera from "../../components/Camera"
import { Sky } from "@react-three/drei";
import Apocalyptic from "../../components/Apocalyptic.js";
import { useRef } from "react";
import DialogueBox from "../../components/DialogueBoxV2";
import Facade from "../../3dcomponent/Strossmayerova_facade.js";
import StoreAbandonned from "../../3dcomponent/Abandoned_storefront.js";
import KickAnim from "../../3dcomponent/Kick_anim.js";
import Kick from "../../components/Kick";

function GamePlay() {
  // const [inView, setInView] = useState(false); // Set State false to disable inView.
  //Fog settings
  const [refObj, setRefObj] = useState(null)
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(6);
  var posC = [{mode : 'followObject', pos : new THREE.Vector3(0, 2, 4), zoom: 2}, {mode : 'followObject',pos : new THREE.Vector3(0, 2, 0), zoom : 1},  {mode : 'followObjectAbsolu',pos : [0,2,2], zoom : 1},{mode : 'fixeCamera', pos : new THREE.Vector3(160, 225, 70), zoom : 2},{mode : 'fixeCameraFollowObject', pos : new THREE.Vector3(160, 225, 70), zoom : 2}]
 
  const[increment, setIncrement] = useState(0)
  const [posCameraRelative, setPosCameraRelative] = useState(posC[increment].pos);
  const[zoom, setZoom] = useState(posC[increment].zoom)
  const[mode, setMode] = useState(posC[increment].mode)

  const [message, setMessage] = useState('');

  function handleClick() {
    
    if(increment < posC.length - 1){
      
        setIncrement(increment +1)
        console.log(increment)
        
    }else{
        setIncrement(0)
      

        console.log(increment)

    }


    setPosCameraRelative(posC[increment].pos)
    setZoom(posC[increment].zoom)
    setMode(posC[increment].mode)
   
    
    

    
  }

  const handleMessage = (messageFromChild) => {
    setMessage(messageFromChild);
   
    if(message != null){
        setRefObj(message); 
        

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
          onClick={handleClick}
        // onCreated={({ gl, scene }) => {
        //   scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
        //   gl.setClearColor(scene.fog.color);
        // }}
        >
          <axesHelper scale={[2, 2, 2]} position={[0, 0, 0]} />

         
          <Camera  refTargetObject={refObj} mode={mode} posRelative={posCameraRelative} zoom = {zoom}></Camera>
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.5} />
          <group position={[0, -5, 0]}>
            <Apocalyptic />
          </group>
          {/*    <group>
            <StoreAbandonned scale={30} position={[0, 0, 0]} rotation={[140 * Math.PI / 180, 0, 0]} />
          </group> */}
       
          <group scale={20}> 
          <Kick onSend={handleMessage} />  
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
