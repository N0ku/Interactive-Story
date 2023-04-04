import React, { useState, useEffect } from "react";
import BaseballBat from "../../components/BaseballBat.js";
import Camera from "../../components/Camera";
import { Sky } from "@react-three/drei";
import KickAnim from "../../3dcomponent/Kick_anim.js";
import Apocalyptic from "../../components/Apocalyptic.js";
import Buildings from "../../3dcomponent/Game_ready_city_buildings";
import Wall from "../../3dcomponent/Wall";
import RockyGround from "../../3dcomponent/Rocky_ground";
import * as THREE from "three";
import InvisibleCube from "../../components/InvisibleCube.js";

function Intro({ onSceneComplete, handleClick  }) {
  const [lerping, setLerping] = useState(false);
  const [refObj, setRefObj] = useState(null);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(20);
  const [refObjRotation, setRefObjRotation] = useState(null);
  const [isSceneComplete, setIsSceneComplete] = useState(false);
  const [objtPath, setObjPath] = useState();
  const [advance, setAdvance] = useState(true);

  var posC = [
    { mode: "followObject", pos: new THREE.Vector3(0, 2, 4), zoom: 2 },
    { mode: "followObject", pos: new THREE.Vector3(0, 2, 0), zoom: 1 },
    { mode: "followObjectAbsolu", pos: [0, 2, -6], zoom: 1 },
    { mode: "fixeCamera", pos: new THREE.Vector3(160, 225, 70), zoom: 2 },
    {
      mode: "fixeCameraFollowObject",
      pos: new THREE.Vector3(160, 225, 70),
      zoom: 2,
    },
  ];

  const [increment, setIncrement] = useState(0);
  const [posCameraRelative, setPosCameraRelative] = useState(
    posC[2].pos
  );
  const [zoom, setZoom] = useState(posC[2].zoom);
  const [mode, setMode] = useState(posC[2].mode);
  const [message, setMessage] = useState("");

  const pathObject = new THREE.CatmullRomCurve3([
    new THREE.Vector3(5, 5, -27),
    new THREE.Vector3(5, 5, -37),
  ]);

  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 1, 12),
    new THREE.Vector3(10, 1, 12),
    new THREE.Vector3(10, 1, 0),
    new THREE.Vector3(10, 1, -30),
  ]);

  const handleCamera = (param) => {
    setPosCameraRelative(param.pos);
    setZoom(param.zoom);
    setMode(param.mode);
  }

  function handleClicked() {
    if (increment < posC.length - 1) {
      setIncrement(increment + 1);
      console.log(increment);
    } else {
      setIncrement(0);
      console.log(increment);
    }

    setPosCameraRelative(posC[increment].pos);
    setZoom(posC[increment].zoom);
    setMode(posC[increment].mode);
  }


  const handleMessage = (messageFromChild) => {
    
    
    if (messageFromChild.current) {
      var p = Math.trunc(messageFromChild.current.position.z * 100) / 100;

      setRefObj(messageFromChild);
      var p = Math.trunc(messageFromChild.current.position.z * 100) / 100;
      if (messageFromChild.current.position.x == 10 && p <= -25.71 && p >= -25.75) {
        setAdvance(false)
        setObjPath(pathObject)
         onSceneComplete(true);
        handleCamera({
          mode: "fixeCameraFollowObject",
          pos: new THREE.Vector3(430,250, -437),
          zoom: 1,
        })
        
      }
    } else {
      console.log(messageFromChild)
      setRefObjRotation(messageFromChild);
     
    }
  };
  
  return (
    <>
      <Camera
        refTargetObject={refObj}
        refObjectRotation={refObjRotation}
        mode={mode}
        posRelative={posCameraRelative}
        zoom={zoom}
      />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} />

      {/* MAP ELEMENTS - START */}
      <group position={[0, -5, 0]}>
        <Apocalyptic />
      </group>
      <group scale={250} position={[100, 125, -100]}>
        <Buildings />
      </group>
      <Wall
        scale={7}
        rotation={[0, (-90 * Math.PI) / 180, 0]}
        position={[135, -20, -850]}
      />
      {/* MAP ELEMENTS - END */}

      {/* SPECIALS OBJECTS - START */}
      <BaseballBat
        scale={200}
        position={[619, 10, -800]}
        rotation={[
          (90 * Math.PI) / 180,
          (340 * Math.PI) / 180,
          (70 * Math.PI) / 180,
        ]}
      />
      {/* SPECIALS OBJECTS - END */}
        <group scale={20}>

        </group>
      {/* MAIN CHARACTER */}
      <group scale={20}>
        <KickAnim
          animationIndex={currentAnimationIndex}
          onSend={handleMessage}
          sendRotate={handleMessage}
          onClick={handleClick}
          path={path}
          advance = {advance}
        />
        {/* <Kick onSend={handleMessage}></Kick> */}
      </group>
      <group scale={20}>
        <InvisibleCube
          onSend={handleMessage}
          sendRotate={handleMessage}
          path={objtPath}
        ></InvisibleCube>
      
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

export default Intro;
