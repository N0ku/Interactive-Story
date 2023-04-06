import React, { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import BaseballBat from "../../components/BaseballBat.js";
import Camera from "../../components/Camera";
import { Sky } from "@react-three/drei";
import KickAnim from "../../3dcomponent/Kick_anim.js";
import RockyGround from "../../3dcomponent/Rocky_ground";
import * as THREE from "three";
import axios from "axios";
import { SceneDTO } from "../../dto/SceneDto.js";

import InvisibleCube from "../../components/InvisibleCube.js";
import Apocalyptic from "../Apocalyptic.js";
import Buildings from "../../3dcomponent/Game_ready_city_buildings.js";

import PositionedSound from "../audio-component/audio-component"
import OST from "../../assets/audios/OST.ogg"
import ZombieCry from "../../assets/audios/zombie-moans-29924.mp3"

function Intro({ onSceneComplete, handleClick, chapterNumber }) {
  const [lerping, setLerping] = useState(false);
  const [refObj, setRefObj] = useState(null);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(20);
  const [refObjRotation, setRefObjRotation] = useState(null);
  const [isSceneComplete, setIsSceneComplete] = useState(false);
  const [objtPath, setObjPath] = useState(null);

  const [cubePath, setCubePath] = useState(null);
  const [advance, setAdvance] = useState(true);
  const [advanceCube, setAdvanceCube] = useState(false);
  const [planNumber, setPlanNumber] = useState(0);
  const [oldPlanNumber, setOldPlanNumber] = useState(-1);
  const [speed, setSpeed] = useState(1);
  const [scene, setScene] = useState([]);
  const [actions, setActions] = useState([]);
  const [camera, setCamera] = useState([]);
  const [dialogs, setDialogs] = useState([]);
  const [paths, setPaths] = useState([]);
  const [plan, setPlan] = useState([]);
  useEffect(() => {
    async function fetchChapter() {
      try {
        const response = await axios.get(
          `http://localhost:5050/chapter/${chapterNumber}`
        );
        const scenes = response.data.Chapter.Scene.map(
          (sceneData) => new SceneDTO(sceneData)
        );
        setScene(scenes[0]);
        setActions(scenes.map((scene) => scene.action));
        setCamera(scenes.map((scene) => scene.camera));
        setDialogs(scenes.map((scene) => scene.dialogs));
        setPaths(scenes.map((scene) => scene.paths));
        setPlan(scenes[0].plan);
      } catch (error) {
        console.error(error);
      }
    }
    fetchChapter();
  }, [chapterNumber]);

  const [posCameraRelative, setPosCameraRelative] = useState(null);
  const [zoom, setZoom] = useState(null);
  const [mode, setMode] = useState(null);

  const pathObject = new THREE.CatmullRomCurve3([
    new THREE.Vector3(5, 5, -27),
    new THREE.Vector3(5, 5, -37),
  ]);

  const handleCamera = (param) => {
    setPosCameraRelative(param.pos);
    setZoom(param.zoom);
    setMode(param.mode);
  };
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (!scene) return;
    const totalPlan = plan.length;
    const plans = plan[planNumber];
    if (plans === undefined || plans === null) {
      return;
    }
    if (planNumber !== oldPlanNumber && plans.path.pos) {
      const points = plans.path.pos.map(
        (p) => new THREE.Vector3(p[0], p[1], p[2])
      );
      const goodPath = new THREE.CatmullRomCurve3(points);
      if (plans.followObject === "Michelle") {
        setObjPath(goodPath);
        setCurrentAnimationIndex(plans.path.animIndex);
      } else if (plans.followObject === "Cube") {
        setCubePath(goodPath);
        setCurrentAnimationIndex(plans.path.animIndex);
      } else;
      setPosCameraRelative(new THREE.Vector3(...plans.camera.pos));
      setZoom(plans.camera.zoom);
      setMode(plans.camera.mode);
      setSpeed(plans.path.speed);
    }
    console.log(time)
    console.log(plans.timeToStop)
    if (time >= plans.timeToStop && planNumber !== totalPlan) {
      if (plans.followObject === "Michelle") {
        setAdvance(false);
        setAdvanceCube(true);
      } else if (plans.followObject === "Cube") {
        setAdvanceCube(false);
        setAdvance(true);
      }
      setOldPlanNumber(planNumber);
      setPlanNumber(planNumber + 1);
      
      if(totalPlan - 1 === planNumber ){
        console.log('fini')
        onSceneComplete(true);
      }
    }
  });
  const handleMessage = (messageFromChild) => {
    if (messageFromChild.current) {
      var p = Math.trunc(messageFromChild.current.position.z * 100) / 100;
      setRefObj(messageFromChild);
      var p = Math.trunc(messageFromChild.current.position.z * 100) / 100;
      if (
        messageFromChild.current.position.x == 10 &&
        p <= -25.71 &&
        p >= -25.75
      ) {
        setObjPath(pathObject);
        onSceneComplete(true);
        handleCamera({
          mode: "fixeCameraFollowObject",
          pos: new THREE.Vector3(430, 250, -437),
          zoom: 1,
        });
      }
    } else {  
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
      {/* <Wall
        scale={7}
        rotation={[0, (-90 * Math.PI) / 180, 0]}
        position={[135, -20, -850]}
      /> */}
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
      <group scale={20}></group>
      {/* MAIN CHARACTER */}
        <PositionedSound audioUrl={OST} distance={10} position={[0, 0, 0]} />
        <PositionedSound audioUrl={ZombieCry} distance={1} position={[10000, 100, 100000]} />
      <group scale={20}>
        <KickAnim
          animationIndex={currentAnimationIndex}
          onSend={handleMessage}
          sendRotate={handleMessage}
          onClick={handleClick}
          path={objtPath}
          advance={advance}
          speed={speed}
        />
        {/* <Kick onSend={handleMessage}></Kick> */}
      </group>
      <group scale={20}>
        <InvisibleCube
          onSend={handleMessage}
          sendRotate={handleMessage}
          path={cubePath}
          advanceCube={advanceCube}
          speed={speed}
        ></InvisibleCube>
      </group>


      {/* <Thomas/> */}
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
