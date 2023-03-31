import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

function Kick(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/kick.glb");

  

  var advance = true

  const [positionObj, setPositionObj] = useState([0, -0.01, -2])
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.01, -2),
    new THREE.Vector3(0, -0.01, 2),


    new THREE.Vector3(4, -0.01, 5),

    new THREE.Vector3(7, -0.01, 11)


  ]);

  

  const modelHeight = -1; // Substract the height of the model from the floor

  console.log(group)

  useFrame((state, delta) => {
   
     if (advance) {
         const time = state.clock.getElapsedTime();
         const position = path.getPointAt(((time) % path.getLength()) / path.getLength());
         console.log('x: ', position.x)
         console.log('y: ', position.y)
         console.log('z: ', Math.trunc(position.z))
         setPositionObj([position.x, position.y, position.z])
         props.onSend(group);
     
 
     }
 
 }); 

  const handleChange = (event) => {
    
  };

  return (
    <group ref={group}  onChange={handleChange} position={positionObj}  >
      <group  {...props} dispose={null}  >
        <group name="Scene">
          <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <primitive object={nodes.mixamorigHips} />
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
