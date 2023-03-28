import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

function Model(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF(props.path);
  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          geometry={nodes.Cube_Material002_0.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          geometry={nodes.Cube_Material004_0.geometry}
          material={materials["Material.004"]}
        />
      </group>
    </group>
  );
}

function ModelLoader(props) {
  useGLTF.preload(props.path);
  return <Model {...props} />;
}

export default ModelLoader;
