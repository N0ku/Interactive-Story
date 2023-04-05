import React, { useState, useEffect } from "react";
import {useFrame} from "@react-three/fiber"
import BaseballBat from "../../components/BaseballBat.js";
import Camera from "../../components/Camera";
import { Sky } from "@react-three/drei";
import KickAnim from "../../3dcomponent/Kick_anim.js";
import RockyGround from "../../3dcomponent/Rocky_ground";
import * as THREE from "three";
import axios from "axios";

import InvisibleCube from "../../components/InvisibleCube.js";

function Intro({ onSceneComplete, handleClick  }) {
  const [lerping, setLerping] = useState(false);
  const [refObj, setRefObj] = useState(null);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(20);
  const [refObjRotation, setRefObjRotation] = useState(null);
  const [isSceneComplete, setIsSceneComplete] = useState(false);
  const [objtPath, setObjPath] = useState();

  const [cubePath, setCubePath] = useState();
  const [advance, setAdvance] = useState(true);
  const [planNumber, setPlanNumber] = useState(0);
  const [oldPlanNumber, setOldPlanNumber ]= useState(-1)
  const [plan, setPlan ]= useState()
const [speed,setSpeed] = useState(1)


  const[jsonData, setJsonData] = useState({
    "Chapter 1": {
        "Scene 1": {
            "Talks": {
                "talk 1": {
                    "option1": "Dialogue 1.1",
                    "option2": "Dialogue 1.2",
                    "option3": "Dialogue 1.3",
                    "option4": "Dialogue 1.4"
                },
                "talk 2": {
                    "option1": "Dialogue 2.1",
                    "option2": "Dialogue 2.2",
                    "option3": "Dialogue 2.3",
                    "option4": "Dialogue 2.4"
                }
            },
            "Actions": {
                "Baseball Bat": {
                    "observe": true,
                    "interact": false,
                    "fight": true
                },
                "VitrineMagasin": {
                    "observe": true,
                    "interact": true,
                    "fight": false
                },
                "Car": {
                    "observe": true,
                    "interact": true,
                    "fight": false
                }
            },
            "Dialogs": [
                "Hello",
                "ça va",
                "bien merci",
                "blabla.."
            ],
            "Plan": [
                {
                    "followObject" : "Michelle",
                    "timeToStop" : 40,
                    "camera" :  {
                        "mode": "followObject",
                        "pos": [
                            0,
                            2,
                            10
                        ],
                        "zoom": 1
                    },
                    "path":  {"animIndex":20,"pos":[[-10,0,10],[10,0,10],[10,0,15] ],"speed":1}
                },
                {
                  "followObject" : "Cube",
                    "timeToStop" : 120,
                    "camera" :  {
                        "mode": "followObjectAbsolu",
                        "pos": [0, 2, -6],
                        "zoom": 1
                    },
                    "path":  {"animIndex":20,"pos":[[10,0,10],[10,2,-50],[30,2,-50], [30,2,-50]],"speed":1}
                }
            ],

            "Camera": [
                {
                    "mode": "fixeCamera",
                    "pos": [
                        0,
                        0,
                        0
                    ],
                    "zoom": 1
                },
                {
                    "mode": "followCamera",
                    "pos": [
                        0,
                        0,
                        0
                    ],
                    "zoom": 1
                }
            ],
            "Paths": [
               {"animIndex":20,"pos":[0,0,0],"speed":1},
               {"animIndex":19,"pos":[0,0,0],"speed":1}
            ]
        }
    }
})



















  
  
  /* axios.get('chapter1.json').then(response => {
    const data = response.data;
    setJsonData(data)
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  }); */

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
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
          if(jsonData == null){
            return
          }
          var totalPlan = jsonData["Chapter 1"]["Scene 1"].Plan.length
          var plan = jsonData["Chapter 1"]["Scene 1"].Plan[planNumber]
          if(planNumber != oldPlanNumber && plan.path.pos != undefined){
          
            var brutPath = plan.path.pos
            const points = [];
            brutPath.forEach(x =>{
              var a = new THREE.Vector3(x[0], x[1], x[2])
              points.push(a)
            })
            const goodPath = new THREE.CatmullRomCurve3(points);
            
            if(plan.followObject == "Michelle"){
              setObjPath(goodPath)
            }else{
              setCubePath(goodPath)
            }
            var posRelative = new THREE.Vector3(plan.camera.pos[0], plan.camera.pos[1],plan.camera.pos[2])
            setPosCameraRelative(posRelative);
            setZoom(plan.camera.zoom);
            setMode(plan.camera.mode);
            setSpeed(plan.path.speed)
               
          }
          
          if(time >= plan.timeToStop){
            if(planNumber != totalPlan){
              setAdvance(false)
              setOldPlanNumber(planNumber)
              setPlanNumber(planNumber + 1)
              return
            }
          }
          
        
  })

  const handleMessage = (messageFromChild) => {
    
    
    if (messageFromChild.current) {
      var p = Math.trunc(messageFromChild.current.position.z * 100) / 100;
      setRefObj(messageFromChild);
      var p = Math.trunc(messageFromChild.current.position.z * 100) / 100;
      if (messageFromChild.current.position.x == 10 && p <= -25.71 && p >= -25.75) {
        
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
      {/* <group position={[0, -5, 0]}>
        <Apocalyptic />
      </group> */}
      {/* <group scale={250} position={[100, 125, -100]}>
        <Buildings />
      </group> */}
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
        <group scale={20}>

        </group>
      {/* MAIN CHARACTER */}

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
