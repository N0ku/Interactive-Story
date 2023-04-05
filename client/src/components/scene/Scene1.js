import React, { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import Camera from "../../components/Camera";
import * as THREE from "three";
import axios from "axios";
import { SceneDTO } from "../../dto/SceneDto.js";
import InvisibleCube from "../../components/InvisibleCube.js";
import Forest from "../Forest"
import Test1 from "../Anime_starry_night"
import MotelObjAdvanced from "../MotelProjetAdvanced"
import InfiniteGround from "../InfiniteGround"
import Andre from "../Andre"

function Scene1({ onSceneComplete, handleClick, chapterNumber }) {
  const [lerping, setLerping] = useState(false);
  const [refObj, setRefObj] = useState(null);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(10);
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
    console.log(plans)
    if (plans === undefined || plans === null) {
      return;
    }
    if (planNumber !== oldPlanNumber && plans.path.pos) {
      const points = plans.path.pos.map(
        (p) => new THREE.Vector3(p[0], p[1], p[2])
      );
      const goodPath = new THREE.CatmullRomCurve3(points);
      if (plans.followObject === "Andre") {
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
    console.log(plan.timeToStop)
    if (time >= plans.timeToStop && planNumber !== totalPlan) {
      if (plans.followObject === "Andre") {
        setAdvance(true);
        setAdvanceCube(true);
      } else if (plans.followObject === "Cube") {
        setAdvanceCube(false);
        setAdvance(false);
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
<MotelObjAdvanced/>
        <Test1/>
      {/* MAIN CHARACTER */}
        <Andre  animationIndex={currentAnimationIndex}
          onSend={handleMessage}
          sendRotate={handleMessage}
          onClick={handleClick}
          path={objtPath}
          advance={advance}
          speed={speed}/>
      <group scale={20}>
       
        <InvisibleCube
          onSend={handleMessage}
          sendRotate={handleMessage}
          path={cubePath}
          advanceCube={advanceCube}
          speed={speed}
        />
      </group>


      {/* <Thomas/> */}
      {/* ENVIRONNMENT - START */}
       <InfiniteGround position={[0,50,0]}/>
       <InfiniteGround position={[0,50,0]}/>
        <Forest position={[-70,-0.1,0]} scale={5.5}/>
        <Forest position={[-70,-0.1,-80]} scale={5.5}/>
        <Forest position={[-70,-0.1,80]} scale={5.5}/>
        <Forest position={[-70,-0.1,-80]} scale={5.5}/>
        <Forest position={[-31,-0.1,-65]} scale={5.5}/>
        <Forest position={[-31,-0.1,67]} scale={5.5}/>
        <Forest position={[-31,-0.1,-80]} scale={5.5}/>
        <Forest position={[-31,-0.1,-160]} scale={5.5}/>
        <Forest position={[-31,-0.1,-210]} scale={5.5}/>
        <Forest position={[-31,-0.1,-260]} scale={5.5}/>
        <Forest position={[65,-0.1,0]} scale={5.5}/>
        <Forest position={[65,-0.1,50]} scale={5.5}/>
        <Forest position={[65,-0.1,-40]} scale={5.5}/>
        <Forest position={[65,-0.1,-80]} scale={5.5}/>
        <Forest position={[65,-0.1,-160]} scale={5.5}/>
        <Forest position={[65,-0.1,-210]} scale={5.5}/>
        <Forest position={[65,-0.1,-210]} scale={5.5}/>
      
        <pointLight position={[10, 10, 0]} intensity={0.05} color={0x0040ff} castShadow  />
        {/* <pointLight position={[1, 3, -3]} intensity={0.03} color={0x80ff80 } /> */}
        <rectAreaLight
           color="#ffffff"
           intensity={2}
           position={[10.5, 1, 3.5]}
           width={2}
           height={10}
           rotation={[Math.PI/6, Math.PI/3, 0]}
           castShadow 
      />
      <mesh position={[13.5, 0.8, 5.3]}>
        <sphereBufferGeometry args={[0.10, 0.10, 0.10]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh position={[14, 0.8, 4.5]}>
        <sphereBufferGeometry args={[0.10, 0.10, 0.10]} />
        <meshBasicMaterial color="red" />
      </mesh>
      
        <hemisphereLight
       skyColor="#02040a"
       groundColor="#000000"
       intensity={0.1}
       position={[0, 50, 0]}
      />
      {/* ENVIRONNMENT - END */}
    </>
  );
}

export default Scene1;
