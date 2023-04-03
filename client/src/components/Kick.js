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
  const prevPosition = useRef([0, -0.01, -2]);
  const rotateQuarternion = useRef(new THREE.Quaternion())
  const rotateAngle = new THREE.Vector3(0, 1, 0)
  const [rotation, setRotation] = useState( [Math.PI / 2, 0, 0]);


  

  const [positionObj, setPositionObj] = useState([0, -0.01, -2])
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.01, -2),
    new THREE.Vector3(0, 0, 12),
    new THREE.Vector3(0, 0, 12),

   
  ]);

  const onAxeMove = (position) =>{
      var dir= ''
    const x = Math.round(position.x * 100) / 100 ;
    console.log(position)
    const y = Math.round(position.y * 100) / 100;
    
    const z = Math.round(position.z * 100) / 100;

    // Check if the model is moving along the X-axis or Z-axis
    if (x !== prevPosition.current[0]) {
      
      console.log('Model is moving along the X-axis');
      if (x > prevPosition.current[2]) {
        
        dir = 'droite'
      } else if (x < prevPosition.current[2]) {
        dir = 'gauche'

      } else {
dir = 'none'
      }
    } else if (z !== prevPosition.current[2]) {
      
      if (z > prevPosition.current[2]) {
dir = 'devant'
      } else if (z < prevPosition.current[2]) {
        dir = 'derriere'
      } else {
dir = 'none'      }    }
console.log(dir)

    // Update the previous position of the model
    prevPosition.current = [x, y, z];
    return dir;
  }


  const directionOffset = (dir) => {
    var dirOff = ''

    if (dir = 'devant') {
      setRotation([Math.PI / 2, 0, 0])
      dirOff = Math.PI / 4 // w+a
    } else if (dir = 'derriere') {
      setRotation([-Math.PI / 2, 0, 0])
      dirOff = Math.PI //    
    } else if (dir = 'gauche') {
      setRotation([Math.PI / 2, 0, -Math.PI] )   
    } else if (dir = 'droite') {
      setRotation([Math.PI / 2, 0, Math.PI] ) 
      dirOff = - Math.PI / 2 // d
    }

  
    return dirOff
}
  

  const modelHeight = -1; // Substract the height of the model from the floor

  useFrame((state, delta) => {
    setLastPosition(path.getPointAt(1));
     if (advance) {
     
     
      const time = state.clock.elapsedTime % path.getLength();
      const position = path.getPoint(time/12);
      /* const time = state.clock.getElapsedTime();
      const position = path.getPointAt(((time) % path.getLength()) / path.getLength()); */
  
       
 
         setPositionObj([position.x, position.y, position.z])
        /*  const tangent = path.getTangentAt(((t) % path.getLength()) / path.getLength());
         const nextPosition = path.getPoint((t + 0.01) /4 % path.getLength()); // get the next point along the path
         const angleY = Math.atan2(nextPosition.z - position.z, nextPosition.x - position.x); */
    // Set the Y-axis rotation based on the angle of rotation
       
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
    <group ref={group}  onChange={handleChange}   position={positionObj}  >
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
