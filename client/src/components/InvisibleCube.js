import { useFrame } from "react-three-fiber";
import { BoxBufferGeometry, MeshBasicMaterial, Mesh } from "three";
import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations, useCursor } from "@react-three/drei";
import * as THREE from "three";

function InvisibleCube(props) {
  const meshRef = useRef();
  const [positionObj, setPositionObj] = useState([0, 0, 0]);

  const [advance, setAdvance] = useState(true);
  const [advancePath, setAdvancePath] = useState(true);

  const [lastPosition, setLastPosition] = useState();
  const [rotation, setRotation] = useState([0, 0, 0]);

  useFrame((state, delta) => {
    const { path, speed, onSend, sendRotate } = props;

    if (!path) {
      setAdvancePath(false);
      return;
    }

    setAdvancePath(true);

    const time = state.clock.getElapsedTime();
    const position = path.getPointAt(
      ((time * (speed || 1)) % path.getLength()) / path.getLength()
    );
    setPositionObj([position.x, position.y, position.z]);

    const nPosition = path.getPointAt(
      (((time + 0.01) * (speed || 1)) % path.getLength()) / path.getLength()
    );
    const angleY = Math.atan2(
      nPosition.x - position.x,
      nPosition.z - position.z
    );
    setRotation([0, angleY, 0]);

    onSend(meshRef);
    sendRotate(rotation);

    if (
      lastPosition &&
      Math.trunc(position.x) === Math.trunc(lastPosition.x) - 1
    ) {
      setAdvance(false);
    }

    setLastPosition(position);
  });

  return (
    <mesh ref={meshRef} position={positionObj} rotation={rotation}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="white" opacity={0} transparent />
    </mesh>
  );
}
export default InvisibleCube;
