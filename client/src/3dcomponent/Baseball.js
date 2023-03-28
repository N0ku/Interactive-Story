import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

 function Baseball(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/low_poly_baseball_bat.glb')
  return (
    <group ref={group} position={[0, -1, 1]} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.1}>
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
export default Baseball
useGLTF.preload('/low_poly_baseball_bat.glb')
