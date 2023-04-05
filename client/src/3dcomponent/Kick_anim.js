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
  const [advancePath, setAdvancePath] = useState(false);
  const [animChoice, setAnimChoice] = useState();
  const path = props.path;
  const speed = props.speed !== undefined ? props.speed : 1;

  //console.log(actions);


  const handleClick = (e) => {
    e.stopPropagation(); // stops the event from bubbling up
    props.onClick(); // Send to parent element have click event, for example,
  };

  useCursor(hovered);

  const [positionObj, setPositionObj] = useState([0, -0.01, -2]);

useEffect(() => {
  actions[names[props.animationIndex]].reset().fadeIn(0.5).play();
}, [props.advance, props.animationIndex]);

useEffect(() => {
  actions[names[props.animationIndex]].reset().fadeIn(0.5).play();

  if (group.current) {
    const box = new THREE.Box3().setFromObject(nodes.Ch03);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const hitbox = new THREE.Mesh(
      new THREE.BoxBufferGeometry(size.x, size.y, size.z),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitbox.position.copy(center);
    hitbox.position.y -= modelHeight - modelHeight;
    setBoxHelper(new THREE.BoxHelper(hitbox, 0xff0000));
  }
}, [props.animationIndex, actions, names, group, modelHeight, nodes.Ch03]);

useFrame((state, delta) => {
  if (!path) {
    setAdvancePath(false);
    return;
  }

  setAdvancePath(true);

  if (!props.advance) {
    setAdvance(false);
    return;
  }

  setAdvance(true);

  const time = state.clock.getElapsedTime();
  const position = path.getPointAt(
    ((time * speed) % path.getLength()) / path.getLength()
  );
  setPositionObj([position.x, position.y, position.z]);

  const nPosition = path.getPointAt(
    (((time + 0.01) * speed) % path.getLength()) / path.getLength()
  );
  const angleY = Math.atan2(nPosition.x - position.x, nPosition.z - position.z);
  setRotation([0, angleY, 0]);

  props.onSend(group);
  props.sendRotate(rotation);

  if (
    lastPosition &&
    Math.trunc(position.x) === Math.trunc(lastPosition.x) - 1
  ) {
    setAdvance(false);
  }

  setLastPosition(position);
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
