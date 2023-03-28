import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

function Chair(props) {
  const { nodes, materials } = useGLTF("/chairs_low_poly.glb");
  const group = useRef();
  return (
    <group position={[0, -1, 0]}>
      <group ref={group} {...props} dispose={null}>
        <mesh
          geometry={nodes.Obj_Chair005_White_0.geometry}
          material={materials.White}
          position={[-72.28, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={10}
        />
        <mesh
          geometry={nodes.Obj_Chair006_White_0.geometry}
          material={materials.White}
          position={[-141.63, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={10}
        />
        <mesh
          geometry={nodes.Obj_Chair_White_0.geometry}
          material={materials.White}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={3}
        />
        <mesh
          geometry={nodes.Obj_Chair001_White_0.geometry}
          material={materials.White}
          position={[205.17, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={10}
        />
        <mesh
          geometry={nodes.Obj_Chair002_White_0.geometry}
          material={materials.White}
          position={[-207.85, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={10}
        />
        <mesh
          geometry={nodes.Obj_Chair003_White_0.geometry}
          material={materials.White}
          position={[72.16, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={10}
        />
        <mesh
          geometry={nodes.Obj_Chair004_White_0.geometry}
          material={materials.White}
          position={[139.05, 0.63, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={10}
        />
      </group>
    </group>
  );
}
export default Chair;
useGLTF.preload("/chairs_low_poly.glb");
