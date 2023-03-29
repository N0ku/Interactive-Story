import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function BaseballBat(props) {
  const { nodes, materials } = useGLTF('/lucille_3d_model.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh geometry={nodes.pCylinder2_BAT_0.geometry} material={materials.material} />
        <mesh geometry={nodes.pCylinder2_phong1_0.geometry} material={materials.phong1} />
        <mesh geometry={nodes.pCylinder2_phong1_0_1.geometry} material={materials.phong1} />
        <mesh geometry={nodes.pCylinder2_phong1_0_2.geometry} material={materials.phong1} />
      </group>
    </group>
  )
}

export default BaseballBat;
