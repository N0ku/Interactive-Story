import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

function Kick(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/kick.glb");

  const modelHeight = -1; // Substract the height of the model from the floor

  return (
    <group position={[0, modelHeight, -2]}>
      <group ref={group} {...props} dispose={null}>
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
