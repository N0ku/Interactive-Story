import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

function Kick(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/kick_anim3.glb");
  const { actions, names } = useAnimations(animations, group);
  const [boxHelper, setBoxHelper] = useState(null);
  const [hovered, hoverAction] = useState(false);
  const modelHeight = -1; // Substract the height of the model from the floor
  const [advance, setAdvance] = useState(true);
  const [lastPosition, setLastPosition] = useState();
  const [rotation, setRotation] = useState([0, 0, 0]);
  const[advancePath,setAdvancePath] = useState(true);
  const [animChoice, setAnimChoice] = useState()


  useEffect(() => {
    actions[names[props.animationIndex]].reset().fadeIn(0.5).play();
   
    if (group.current) {
      const box = new THREE.Box3().setFromObject(nodes.Ch03); // Calcal the hard box of model based on skeleton.
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const hitbox = new THREE.Mesh( // Create the hitbox
        new THREE.BoxBufferGeometry(size.x, size.y, size.z),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitbox.position.copy(center);
      hitbox.position.y -= modelHeight - modelHeight; // Shit counter Shit... Center the hitbox in the middle of the model..
      setBoxHelper(new THREE.BoxHelper(hitbox, 0xff0000)); // Color red because i like red...
    }
  }, [props.animationIndex, actions, names, group, modelHeight, nodes.Ch03]);

  const handleClick = (e) => {
    
    e.stopPropagation(); // stops the event from bubbling up
    props.onClick(); // Send to parent element have click event, for example,
  
  };

  useCursor(hovered);

  const [positionObj, setPositionObj] = useState([0, -0.01, -2]);


  useFrame((state, delta) => {
    var path = props.path
    console.log(path)
    if(path == undefined || path == null){
      setAdvancePath(false)
  }else{
      setAdvancePath(true)
  }
  if(props.advance == false){
    setAdvance(false)
    
    actions[names[props.animationIndex]].reset().fadeIn(0.5).play();
  }else{
    setAdvance(true)
    actions[names[2]].reset().fadeIn(0.5).play();
    
  }
    if (advance && advancePath) {
      setLastPosition(path.getPointAt(1));
      var speed = props.speed != undefined ? props.speed : 1;
      const time = state.clock.getElapsedTime();
      const position = path.getPointAt((time *speed % path.getLength()) / path.getLength());
      setPositionObj([position.x, position.y, position.z]);
      const nPosition = path.getPointAt(
        ((time + 0.01) * speed % path.getLength()) / path.getLength()
      );
      const angleY = Math.atan2(
        nPosition.x - position.x,
        nPosition.z - position.z
      );
      setRotation([0, angleY, 0]);
      props.onSend(group);
      props.sendRotate(rotation);
      if (lastPosition != null ) {
       
        if(Math.trunc(position.x) == Math.trunc(lastPosition.x) - 1  ){
          console.log('dddddd')
          setAdvance(false)
        }
      }
    }
  });

  return (
    <group ref={group} rotation={rotation} position={positionObj}>
      <group {...props} dispose={null}>
        {boxHelper && (
          <primitive
            object={boxHelper}
            onClick={handleClick}
            onPointerOver={() => hoverAction(true)}
            onPointerOut={() => hoverAction(false)}
          />
        )}
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

useGLTF.preload("/kick_anim3.glb");
