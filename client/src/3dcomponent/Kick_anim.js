import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations,useCursor} from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

function Kick(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/kick_anim.glb");
  const { actions, names } = useAnimations(animations, group)
  const [boxHelper, setBoxHelper] = useState(null);
  const [hovered, hoverAction] = useState(false);
  const modelHeight = -1; // Substract the height of the model from the floor

  useEffect(() => {
    actions[names[props.animationIndex]].reset().fadeIn(0.25).play();
    if (group.current) {
      console.log("Coucou");
      const box = new THREE.Box3().setFromObject(nodes.Ch03); // Calcal the hard box of model based on skeleton. 
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const hitbox = new THREE.Mesh( // Create the hitbox
        new THREE.BoxBufferGeometry(size.x, size.y, size.z),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitbox.position.copy(center);
      hitbox.position.y -= (modelHeight-modelHeight); // Shit counter Shit... Center the hitbox in the middle of the model..
      setBoxHelper(new THREE.BoxHelper(hitbox, 0xff0000)); // Color red because i like red...
    }
  }, [props.animationIndex, actions, names, group, modelHeight, nodes.Ch03]);

  const handleClick = (e) => {
    console.log('Click'); 
    e.stopPropagation(); // stops the event from bubbling up
    props.onClick(); // Send to parent element have click event, for example, 
    // when the user clicks on the button, the parent element will call this function 
    // (Allows you to modify the interior of the children and the child elements of the parents)
  };

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

    if (advance) {
      const time = state.clock.getElapsedTime();
      const position = path.getPointAt(((time) % path.getLength()) / path.getLength());
      /*  console.log('x: ', position.x)
       console.log('y: ', position.y)
       console.log('z: ', Math.trunc(position.z)) */
      setPositionObj([position.x, position.y, position.z])
      props.onSend(group);
    }

  });

  return (
    <group ref={group} position={positionObj}  >
      <group  {...props} dispose={null}  >
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

useGLTF.preload("/kick_anim.glb");