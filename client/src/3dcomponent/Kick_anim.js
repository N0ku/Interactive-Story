import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import { useControls } from "../components/Controls";

function Kick(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/kick_anim3.glb");
  const { actions, names } = useAnimations(animations, group)
  const [boxHelper, setBoxHelper] = useState(null);
  const [hovered, hoverAction] = useState(false);
  const modelHeight = -1; // Substract the height of the model from the floor
  const { forward, backward, left, right, shift } = useControls();

  const currentAnimation = useRef();

  /*   actions[names[props.animationIndex]].reset().fadeIn(0.25).play(); */
  useEffect(() => {
     let action;
    if (forward || backward || left || right) {
      action = "kick_walk"
      if (shift) {
        action = "kick_running"
      }
    }
    else {
      action = "kick_idle"
    }
    // the ? verify if the object is undefined or null
    if (currentAnimation.current !== action) {
      const nextAnimation = actions[action];
      const current = actions[currentAnimation.current];
      current?.fadeOut(0.2);
      nextAnimation?.reset().fadeIn(0.2).play();
      currentAnimation.current = action
    } 

    if (group.current) {
      const box = new THREE.Box3().setFromObject(nodes.Ch03); // Calcal the hard box of model based on skeleton.
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const hitbox = new THREE.Mesh( // Create the hitbox
        new THREE.BoxBufferGeometry(size.x, size.y, size.z),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitbox.position.copy(center);
      hitbox.position.y -= (modelHeight - modelHeight); // Shit counter Shit... Center the hitbox in the middle of the model..
      setBoxHelper(new THREE.BoxHelper(hitbox, 0xff0000)); // Color red because i like red...
    }
  }, [props.animationIndex, actions, names, group, modelHeight, nodes.Ch03, forward, backward, left, right, shift]);

  useCursor(hovered);


  var advance = true

  const [positionObj, setPositionObj] = useState([0, -0.01, -2])
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.01, -2),
    new THREE.Vector3(0, -0.01, 2),

    new THREE.Vector3(4, -0.01, 5),

    new THREE.Vector3(7, -0.01, 11)


  ]);

  useFrame((state, delta) => {

    /* if (advance) {
      const time = state.clock.getElapsedTime();
      const position = path.getPointAt(((time) % path.getLength()) / path.getLength());
       console.log('x: ', position.x)
       console.log('y: ', position.y)
       console.log('z: ', Math.trunc(position.z)) 
      setPositionObj([position.x, position.y, position.z])
      props.onSend(group);
    } */

  });

  return (
    <group ref={group} position={positionObj}  >
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

useGLTF.preload("/kick_anim3.glb");