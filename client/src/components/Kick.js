import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import { NoToneMapping } from "three";

function Kick(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/kick.glb");
  const [advance, setAdvance] = useState(true)
  const [lastPosition, setLastPosition] = useState();

  
  const [rotation, setRotation] = useState( [0, 0, 0]);


  

  const [positionObj, setPositionObj] = useState([0, 1, -2])
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 1, 12),
    new THREE.Vector3(10, 1, 12),
    new THREE.Vector3(10, 1, 0),
    new THREE.Vector3(10, 1, -30),
    new THREE.Vector3(16, 1, -30),
    new THREE.Vector3(16, 1, 12),
    new THREE.Vector3(45, 1, 12),

  ]);
 
  const modelHeight = -1; 

  useFrame((state, delta) => {
    setLastPosition(path.getPointAt(1));
     if (advance) {
     
  
      /* const time = state.clock.elapsedTime % path.getLength();
      const position = path.getPoint(time/12); */
     
      const time = state.clock.getElapsedTime();
      const position = path.getPointAt(((time) % path.getLength()) / path.getLength());
  
       
 
    setPositionObj([position.x, position.y, position.z])
    const nPosition = path.getPointAt(((time +0.01) % path.getLength()) / path.getLength()); 
    const angleY = Math.atan2(nPosition.x - position.x,nPosition.z - position.z);
       
    setRotation([Math.PI/2, angleY*2, Math.PI/2 ] ) 
    props.onSend(group);
      if(lastPosition != null){
         
      }
  }
 
 }); 

  const handleChange = (event) => {
  };

  return (
    <group ref={group}  onChange={handleChange}    position={positionObj}  >
      <group  {...props} dispose={null}  >
        <group name="Scene">
        <group name="Armature"  rotation={rotation} scale={0.01} >
            <primitive object={nodes.mixamorigHips}  /> 
            <skinnedMesh 
              name="Ch03"
              geometry={nodes.Ch03.geometry}
              material={materials.Ch03_Body}
              skeleton={nodes.Ch03.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}
export default Kick;

useGLTF.preload("/kick.glb");
