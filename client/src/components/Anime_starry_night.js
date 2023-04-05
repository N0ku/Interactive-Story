import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Test1(props) {
  const { nodes, materials } = useGLTF('/anime_starry_night.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Sphere_Material001_0.geometry} material={materials['Material.001']} scale={500} />
    </group>
  )
}

useGLTF.preload('/anime_starry_night.glb')

export default Test1;

