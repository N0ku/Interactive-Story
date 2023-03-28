import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

function Led(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/led_tv_low_poly_free.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Cube__0.geometry}
            material={materials["Scene_-_Root"]}
            position={[0, 0, -3]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={10}
          />
        </group>
      </group>
    </group>
  );
}
export default Led;
useGLTF.preload("/led_tv_low_poly_free.glb");
