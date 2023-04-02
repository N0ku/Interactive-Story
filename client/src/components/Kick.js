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
  const [difX, setDifX] = useState();
  const [difZ, setDifZ] = useState();
  const [rotation, setRotation] = useState( [Math.PI / 2, 0, 0]);

  

  const [positionObj, setPositionObj] = useState([0, -0.01, -2])
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.01, -2),
    new THREE.Vector3(0, 0, 5),
    new THREE.Vector3(4, 0, 5),
    new THREE.Vector3(11, 0, 5)
  ]);


  

  const modelHeight = -1; // Substract the height of the model from the floor

  useFrame((state, delta) => {
    setLastPosition(path.getPointAt(1));
     if (advance) {
     
     
      const t = state.clock.elapsedTime % path.getLength();
      const position = path.getPoint(t/4);
       
        
         setPositionObj([position.x, position.y, position.z])
         const tangent = path.getTangentAt(((t) % path.getLength()) / path.getLength());
         const nextPosition = path.getPoint((t + 0.01) /4 % path.getLength()); // get the next point along the path
         const angleY = Math.atan2(nextPosition.z - position.z, nextPosition.x - position.x);
    // Set the Y-axis rotation based on the angle of rotation
        setRotation([angleY ,  angleY , angleY  ]);
        /*  group.current.rotation.x = tangent.x;
         group.current.rotation.y = tangent.y;
         group.current.rotation.z =tangent.z */
         props.onSend(group);

         if(lastPosition != null){
         
     }
  }
 
 }); 

  const handleChange = (event) => {
  };

  return (
    <group ref={group}  onChange={handleChange} position={positionObj}  >
      <group  {...props} dispose={null}  >
        <group name="Scene">
          <group name="Armature" rotation={rotation} scale={0.01} >
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
